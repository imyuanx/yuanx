import React, { useEffect, useState } from 'react';
import type { GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import articleEnv from '@/config/posts.json';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';

export type NextPost = {
  id: number;
  title: string;
  date: string;
  postId: string;
};

/**
 * @desc Get the env of article by `postId` or by `id`
 * @param {String} pid article id
 */
function getPostEnv(pid?: string | undefined): NextPost | null;
function getPostEnv(id?: number | undefined): NextPost | null;
function getPostEnv(_id?: unknown): NextPost | null {
  const post = articleEnv.ARTICLES.find(({ postId, id }) =>
    typeof _id === 'string' ? postId === _id : id === _id
  );
  if (!post) return null;
  return post as NextPost;
}

/**
 * @desc Get the next article
 */
function getNextPost(pid: string): NextPost | null {
  const curPost = getPostEnv(pid);
  if (!curPost) return null;
  const nextPost = getPostEnv(curPost.id + 1);
  if (!nextPost) return null;
  return nextPost as NextPost;
}

/**
 * @desc Get the title of the current article
 */
const getPostTitle = (pid: string): string => {
  if (!pid || typeof pid !== 'string') return '';
  const curPost = getPostEnv(pid);
  if (!curPost) return '';
  return curPost.title;
};

const reactMarkdownComponents = {
  h1: ({ children }) => (
    <h1 className="my-[0.67em] text-[2.5em] font-bold leading-[1.2]">
      {children}
    </h1>
  ),
  h2: ({ children }) => <h1 className="text-[2em] font-bold">{children}</h1>,
  h3: ({ children }) => <h1 className="text-[1.8em] font-bold">{children}</h1>,
  h4: ({ children }) => <h1 className="text-[1.6em] font-bold">{children}</h1>,
  p: ({ children }) => {
    return <p className="mt-[1em] text-lg leading-[1.8]">{children}</p>;
  },
  a: ({ children, href }) => (
    <a
      className="inline-block whitespace-nowrap bg-wave bg-16px bg-0px-bottom bg-repeat-x leading-normal text-[#121314] no-underline hover:animate-wave dark:!text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  code({ node, inline, className, children, style, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <>
        <SyntaxHighlighter
          className="block max-w-pre-mobile rounded dark:hidden"
          style={oneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          className="hidden max-w-pre-mobile rounded dark:block"
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </>
    ) : (
      <code className="relative mx-1 whitespace-nowrap rounded-[6px] after:absolute after:inset-x-[-0.1em] after:bottom-[0] after:top-[66%] after:z-[-1] after:bg-[#ebebeb] after:content-[''] after:dark:bg-[#333333]">
        {children}
      </code>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="m-0 border-0 border-l-4 border-solid border-l-[#ebebeb] pl-4 text-[#555555] dark:border-l-[#7a7a7a] dark:text-[#acacac]">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-2.5 text-lg">{children}</ul>
  ),
  li: ({ children }) => <li className="leading-[1.6]">{children}</li>,
} as Components;

function Footer() {
  return (
    <footer className="mt-[30px] text-center">
      <a
        className="inline-block whitespace-nowrap bg-wave bg-16px bg-0px-bottom bg-repeat-x leading-normal text-[#121314] no-underline hover:animate-wave dark:!text-white"
        target="_blank"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        rel="noreferrer"
      >
        CC BY-NC-SA 4.0
      </a>
      <span className="text-[#808080]">{' 2022-PRESENT © yuanx'}</span>
    </footer>
  );
}

const Article: NextPage<{ postMarkdown: string }> = ({ postMarkdown }) => {
  const router = useRouter();
  const { pid } = router.query;
  const [nextPost, setNextPost] = useState<NextPost | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (pid && typeof pid === 'string') {
      const nextPost = getNextPost(pid);
      const title = getPostTitle(pid);
      setNextPost(nextPost);
      setTitle(title);
    }
  }, [pid]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container-article flex h-full w-full content-center justify-center">
        <main className="article-content box-border h-full w-full max-w-[900px] px-7 pb-7 pt-[60px]">
          <article className="article">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={reactMarkdownComponents}
            >
              {postMarkdown}
            </ReactMarkdown>
          </article>
          <div className="mt-[30px] flex">
            <span>下一篇：</span>
            {nextPost?.postId ? (
              <Link href={nextPost?.postId} className='underline'>{nextPost?.title}</Link>
            ) : (
              <div>
                <a>已经是最后一篇了哦</a>
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export async function getStaticProps({ params }: { params: any }) {
  const { pid } = params;
  const postMarkdown = require(`../../../posts/${pid}.md`);
  return {
    props: {
      postMarkdown: postMarkdown.default,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = {
    paths: articleEnv.ARTICLES.map((item) => ({
      params: {
        pid: item.postId,
      },
    })),
    fallback: false,
  };
  return res;
};

export default Article;
