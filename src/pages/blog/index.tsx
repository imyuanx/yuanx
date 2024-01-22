import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import articleEnv from '@/config/posts.json';
import type { NextPost } from '@/pages/blog/posts/[pid]';
import dayjs from 'dayjs';

const ARTICLES = articleEnv.ARTICLES;

const ARTICLES_GROUP = ARTICLES.reduce(
  (acc: { [key: string]: NextPost[] }, cur) => {
    acc[dayjs(cur.date).format('YYYY')] = [
      ...(acc[dayjs(cur.date).format('YYYY')] || []),
      cur,
    ];
    return acc;
  },
  {}
);

const Blog: NextPage = () => {
  return (
    <>
      <Head>
        <title>yuanx | Blog</title>
      </Head>
      <main className="mx-auto my-0 box-content flex w-full flex-col items-center px-7 pb-7 pt-[60px]">
        <div className="mt-[0.67em] w-full min-w-[330px] max-w-[650px]">
          <h1 className="text-[2em] font-bold">My Blog</h1>
        </div>
        <article className="w-full min-w-[330px] max-w-[650px]">
          <ul className="list-none p-0">
            {Object.keys(ARTICLES_GROUP)
              .sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
              .map((year) => {
                const ARTICLES_YEAR = ARTICLES_GROUP[year].sort(
                  (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
                );
                return (
                  <div key={year}>
                    <div className="mb-4 text-4xl font-light">{year}</div>
                    {ARTICLES_YEAR.map((articleItem) => {
                      return (
                        <li className="mb-[30px]" key={articleItem.postId}>
                          <Link
                            href={`/blog/posts/${articleItem.postId}`}
                            className="no-underline"
                          >
                            <span className="article-title mr-2.5 text-lg text-[#121314] no-underline hover:text-[#000000] hover:underline dark:!text-white">
                              {articleItem.title}
                            </span>
                            <span className="article-date text-base italic text-[#808080]">
                              {articleItem.date}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </div>
                );
              })}
          </ul>
        </article>
      </main>
    </>
  );
};

export default Blog;
