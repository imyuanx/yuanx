import type { NextPage } from 'next';
import Head from 'next/head';
import OGCard from '@/components/OGCard';

const PROJECTS_LINK_LIST = [
  'https://m-calendar.yuanx.me',
  'https://worth.yuanx.me',
  'https://sharing-gui.yuanx.me',
  'https://github.com/imyuanx/chatgpt-proxy',
  'https://crossroads-site.yuanx.me/',
  'https://xiatunan.yuanx.me/',
  'https://juejin-id-card.yuanx.me/',
];

const Projects: NextPage = () => {
  return (
    <>
      <Head>
        <title>x Yuan | Projects</title>
      </Head>
      <main className="mx-auto my-0 box-content flex w-full flex-col items-center px-7 pb-7 pt-[60px]">
        <div className="mt-[0.67em] w-full min-w-[330px] max-w-[650px]">
          <h1 className="text-[2em] font-bold">My Projects</h1>
        </div>
        <div className="mt-[40px] grid w-full grid-cols-[repeat(auto-fill,300px)] justify-center gap-8">
          {PROJECTS_LINK_LIST.map((projectLink, index) => (
            <OGCard
              key={projectLink}
              className="transition-all duration-200 hover:scale-105 hover:shadow-[0px_0px_22px_rgba(0,0,0,0.16)] hover:duration-300 hover:dark:shadow-[0px_0px_22px_rgba(255,255,255,0.16)]"
              target={projectLink}
              linkTarget
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Projects;
