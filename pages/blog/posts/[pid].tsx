import React, { useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
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

  useEffect(() => {
    if (pid) {
      const postPath = require.context(`../../../posts/`);
      const result = postPath(`./${pid}.md`);
      setMarkdown(result.default);
      let nextPostInfo = getNextPost();
      nextPost.current = nextPostInfo;
    }
  }, [pid]);

  /**
   * @desc Get the env of article by `postId`
   * @param {String} pid article id
   */
  const getPostEnv = (pid: String): NextPost | null => {
    const post = articleEnv.ARTICLES.find((item) => item.postId === pid);
    if (!post) return null;
    return post as NextPost;
  };

  /**
   * @desc Get the next article
   */
  const getNextPost = (): NextPost | null => {
    if (!pid || typeof pid !== 'string') return null;
    const curPost = getPostEnv(pid);
    if (!curPost) return null;
    const nextPost = getPostEnv(`${curPost.id + 1}`);
    if (!nextPost) return null;
    return nextPost as NextPost;
  };

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
                  <h1 className="text-[2em] leading-[1.2] font-bold mb-[0.67em] mt-[0.67em]">
                    {children}
                  </h1>
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
                code: ({ children }) => (
                  <code className="relative mx-[4px] rounded-[6px] after:content-[''] after:absolute after:z-[-1] after:top-[66%] after:left-[-0.1em] after:right-[-0.1em] after:bottom-[0] after:bg-[#ebebeb]">
                    {children}
                  </code>
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
                <a>{nextPost.current?.title}</a>
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
