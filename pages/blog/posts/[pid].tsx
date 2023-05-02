import React, { useCallback, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import articleEnv from '../../../posts/posts.json';

interface NextPost {
  id: 0;
  title: '';
  date: '';
  postId: '';
}

const Article: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [markdown, setMarkdown] = useState('');
  const nextPost = useRef<NextPost | null>(null);

  /**
   * @desc Get the env of article by `postId` or by `id`
   * @param {String} pid article id
   */
  function getPostEnv(pid?: String | undefined): NextPost | null;
  function getPostEnv(id?: Number | undefined): NextPost | null;
  function getPostEnv(_id?: unknown): NextPost | null {
    const post = articleEnv.ARTICLES.find(({ postId, id }) =>
      typeof _id === 'string' ? postId === _id : id === _id,
    );
    if (!post) return null;
    return post as NextPost;
  }

  /**
   * @desc Get the next article
   */
  const getNextPost = useCallback(
    (pid: String): NextPost | null => {
      const curPost = getPostEnv(pid);
      if (!curPost) return null;
      const nextPost = getPostEnv(curPost.id + 1);
      if (!nextPost) return null;
      return nextPost as NextPost;
    },
    [getPostEnv],
  );

  useEffect(() => {
    if (pid && typeof pid === 'string') {
      const postPath = require.context(`../../../posts/`);
      const result = postPath(`./${pid}.md`);
      setMarkdown(result.default);
      let nextPostInfo = getNextPost(pid);
      nextPost.current = nextPostInfo;
    }
  }, [pid, getNextPost]);

  /**
   * @desc Get the title of the current article
   */
  const getCurPostTitle = (): string => {
    if (!pid || typeof pid !== 'string') return '';
    const curPost = getPostEnv(pid);
    if (!curPost) return '';
    return curPost.title;
  };

  return (
    <>
      <Head>
        <title>{getCurPostTitle()}</title>
      </Head>
      <div className="container-article w-full h-full flex justify-center content-center">
        <main className="box-border article-content max-w-[900px] w-full h-full pt-[60px] pr-[28px] pb-[28px] pl-[28px]">
          <article className="article">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-[2.5em] leading-[1.2] font-bold mb-[0.67em] mt-[0.67em]">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h1 className="text-[2em] font-bold">{children}</h1>
                ),
                h3: ({ children }) => (
                  <h1 className="text-[1.8em] font-bold">{children}</h1>
                ),
                h4: ({ children }) => (
                  <h1 className="text-[1.6em] font-bold">{children}</h1>
                ),
                p: ({ children }) => {
                  return (
                    <p className="text-[18px] leading-[1.8] mt-[1em]">
                      {children}
                    </p>
                  );
                },
                a: ({ children, href }) => (
                  <a
                    className="inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave dark:!text-white"
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
                        className={'rounded max-w-pre-mobile block dark:hidden'}
                        style={oneLight}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                      <SyntaxHighlighter
                        className={'rounded max-w-pre-mobile hidden dark:block'}
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </>
                  ) : (
                    <code className="relative mx-[4px] rounded-[6px] whitespace-nowrap after:content-[''] after:absolute after:z-[-1] after:top-[66%] after:left-[-0.1em] after:right-[-0.1em] after:bottom-[0] after:bg-[#ebebeb] after:dark:bg-[#333333]">
                      {children}
                    </code>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className="border-0 border-l-4 border-solid border-l-[#ebebeb] m-0 pl-[16px] text-[#555555] dark:text-[#acacac] dark:border-l-[#7a7a7a]">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="flex flex-col gap-[10px] text-[18px]">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="leading-[1.6]">{children}</li>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </article>
          <div className="mt-[30px] flex">
            <span>下一篇：</span>
            {nextPost.current?.postId ? (
              <Link href={nextPost.current?.postId}>
                {nextPost.current?.title}
              </Link>
            ) : (
              <div>
                <a>已经是最后一篇了哦</a>
              </div>
            )}
          </div>
          <footer className="text-center mt-[30px]">
            <a
              className="inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave dark:!text-white"
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              rel="noreferrer"
            >
              CC BY-NC-SA 4.0
            </a>
            <span className="text-[#808080]">{' 2022-PRESENT © x Yuan'}</span>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Article;
