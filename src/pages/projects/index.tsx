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
      <main className="flex flex-col items-center box-content pt-[60px] pr-7 pb-7 pl-7 w-full mx-auto my-0">
        <div className="mt-[0.67em] max-w-[650px] min-w-[330px] w-full">
          <h1 className="text-[2em] font-bold">My Projects</h1>
        </div>
        <div className="mt-[40px] grid grid-cols-[repeat(auto-fill,300px)] justify-center gap-8 w-full">
          {PROJECTS_LINK_LIST.map((projectLink, index) => (
            <OGCard
              key={projectLink}
              className="hover:scale-105 hover:shadow-[0px_0px_22px_rgba(0,0,0,0.16)] transition-all duration-200 hover:duration-300"
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
