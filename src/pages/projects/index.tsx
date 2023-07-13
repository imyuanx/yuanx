import type { NextPage } from 'next';
import Head from 'next/head';
import { OGInfo } from '@/common/useOGInfo';
import ProjectCard from '@/components/ProjectCard';
import { GITHUB_URL } from '@/constant';
import axios from 'axios';

export type PROJECTS_ITEM_TYPE = {
  link: string;
  OGInfo?: Partial<OGInfo>;
};

const PROJECTS_LIST: Array<PROJECTS_ITEM_TYPE> = [
  {
    link: 'https://m-calendar.yuanx.me',
    OGInfo: {
      ogModel: '/m-calendar.splinecode',
    },
  },
  { link: 'https://worth.yuanx.me' },
  { link: 'https://sharing-gui.yuanx.me' },
  {
    link: 'https://github.com/imyuanx/chatgpt-proxy',
    OGInfo: {
      ogImage: '/chatgpt-proxy-og-image.png',
    },
  },
  { link: 'https://crossroads-site.yuanx.me/' },
  { link: 'https://xiatunan.yuanx.me/' },
  { link: 'https://juejin-id-card.yuanx.me/' },
];

export async function getStaticProps() {
  const projectsList = await Promise.all(
    PROJECTS_LIST.map(async (project) => {
      const { ogTitle, ogDescription, ogImage } = (
        await axios.get(`https://yuanx.me/api/getOGInfo?target=${project.link}`)
      ).data;

      let OGInfo = null;
      if (ogTitle && ogDescription && ogImage) {
        OGInfo = {
          ogTitle: project.OGInfo?.ogTitle || ogTitle,
          ogDescription: project.OGInfo?.ogDescription || ogDescription,
          ogImage: project.OGInfo?.ogImage || ogImage,
          ogModel: project.OGInfo?.ogModel || '',
        };
      }

      return {
        OGInfo,
        link: project.link,
      };
    })
  );

  return {
    props: {
      projectsList: projectsList,
    },
  };
}

export type Props = {
  projectsList: {
    link: string;
    OGInfo?: OGInfo;
  }[];
};

const Projects: NextPage<Props> = ({ projectsList }) => {
  console.log('projectsList', projectsList);

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
          {projectsList.map((project) => (
            <ProjectCard
              key={project.link}
              link={project.link}
              OGInfo={project.OGInfo}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Projects;
