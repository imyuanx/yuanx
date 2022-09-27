import type { NextPage } from 'next';
import Link from 'next/link';
import Nav from '../../components/Nav';
import articleEnv from '../../posts/posts.json';

const ARTICLES = articleEnv.ARTICLES;

const Blog: NextPage = () => {
  return (
    <>
      <Nav active="blog" />
      <div className="box-content pt-60px pr-7 pb-7 pl-7 max-w-650px min-w-330px w-full mx-auto my-0">
        <h1 className="text-2em font-bold mb-40px mt-2.7">My Blog</h1>
        <ul className="list-none p-0">
          {ARTICLES.map((articleItem) => {
            return (
              <li className="mb-30px" key={articleItem.postId}>
                <Link href={`/blog/posts/${articleItem.postId}`}>
                  <a className="no-underline">
                    <span className="article-title no-underline text-18px text-[#121314] mr-10px hover:text-[#000000] hover:underline dark:!text-white">
                      {articleItem.title}
                    </span>
                    <span className="article-date text-16px text-[#575757] italic">
                      {articleItem.date}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Blog;
