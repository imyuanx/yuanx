import type { NextPage } from 'next';
import Head from 'next/head';
import { OGInfo } from '@/common/useOGInfo';
import ProjectCard from '@/components/ProjectCard';
import { GITHUB_URL } from '@/constant';

export type PROJECTS_ITEM_TYPE = {
  link: string;
  OGInfo?: Partial<OGInfo>;
};

const PROJECTS_LIST: Array<string | PROJECTS_ITEM_TYPE> = [
  {
    link: 'https://m-calendar.yuanx.me',
    OGInfo: {
      ogModel: '/m-calendar.splinecode',
    },
  },
  'https://worth.yuanx.me',
  'https://sharing-gui.yuanx.me',
  {
    link: 'https://github.com/imyuanx/chatgpt-proxy',
    OGInfo: {
      ogImage: '/chatgpt-proxy-og-image.png',
    },
  },
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
          <div className="text-[#737373] dark:text-[#808080]">
            {'Most of my projects are here, and you can find more on my '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#121314]"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-[40px] grid w-full grid-cols-[repeat(auto-fill,300px)] justify-center gap-8">
          {PROJECTS_LIST.map((project) => (
            <ProjectCard
              key={typeof project === 'string' ? project : project.link}
              project={project}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Projects;
