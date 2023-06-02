import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dayjs from 'dayjs';
import articleEnv from '@/config/posts.json';
import type { NextPost } from '@/pages/blog/posts/[pid]';

const ARTICLES = articleEnv.ARTICLES;

const ARTICLES_GROUP = ARTICLES.reduce(
  (acc: { [key: string]: NextPost[] }, cur) => {
    acc[dayjs(cur.date).format('YYYY')] = [
      ...(acc[dayjs(cur.date).format('YYYY')] || []),
      cur,
    ];
    return acc;
  },
  {},
);

const Blog: NextPage = () => {
  return (
    <>
      <Head>
        <title>x Yuan | Blog</title>
      </Head>
      <main className="box-content pt-[60px] pr-7 pb-7 pl-7 max-w-[650px] min-w-[330px] w-full mx-auto my-0">
        <h1 className="text-[2em] font-bold mb-[40px] mt-[0.67em]">My Blog</h1>
        <article>
          <ul className="list-none p-0">
            {Object.keys(ARTICLES_GROUP)
              .sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
              .map((year) => {
                const ARTICLES_YEAR = ARTICLES_GROUP[year].sort(
                  (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
                );
                return (
                  <div key={year}>
                    <div className="text-[36px] mb-4 font-light">{year}</div>
                    {ARTICLES_YEAR.map((articleItem) => {
                      return (
                        <li className="mb-[30px]" key={articleItem.postId}>
                          <Link
                            href={`/blog/posts/${articleItem.postId}`}
                            className="no-underline"
                          >
                            <span className="article-title no-underline text-[18px] text-[#121314] mr-[10px] hover:text-[#000000] hover:underline dark:!text-white">
                              {articleItem.title}
                            </span>
                            <span className="article-date text-[16px] text-[#808080] italic">
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
