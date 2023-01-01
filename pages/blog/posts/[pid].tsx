import React, { useRef } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import articleEnv from '../../../posts/posts.json';
import Link from 'next/link';

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
   * @desc 获取下一篇文章
   */
  const getNextPost = (): NextPost | null => {
    const curPost = articleEnv.ARTICLES.find((item) => item.postId === pid);
    if (!curPost) return null;
    const nextPost = articleEnv.ARTICLES.find(
      (item) => item.id === curPost.id + 1,
    );
    if (!nextPost) return null;
    return nextPost as NextPost;
  };

  return (
    <div className="container-article w-full h-full flex justify-center content-center">
      <main className="box-border article-content max-w-900px w-full h-full pt-60px pr-28px pb-28px pl-28px">
        <article className="article">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2em leading-1.2 font-bold mb-2.7 mt-2.7">
                  {children}
                </h1>
              ),
              p: ({ children }) => {
                return (
                  <p className="text-18px leading-1.5 mt-1em">{children}</p>
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
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
        <div className="mt-30px flex">
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
        <footer className="text-center mt-30px">
          <a
            className="inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave dark:!text-white"
            target="_blank"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            rel="noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>
          <span className="text-#808080">{' 2022-PRESENT © x Yuan'}</span>
        </footer>
      </main>
    </div>
  );
};

export default Article;
