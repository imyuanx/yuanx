import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import DuolingoLogo from '@/components/DuolingoLogo';
import OGA from '@/components/OGA';
import type { OGInfo } from '@/components/OGCard';
import { EMAIL, GITHUB_URL, TWITTER_URL } from '@/constant';
import GithubFilledIcon from '@/icons/github-filled.svg';
import MailIcon from '@/icons/mail.svg';
import TwitterFilledIcon from '@/icons/twitter-filled.svg';
import { PROJECTS_ITEM_TYPE } from '@/pages/projects';
import axios from 'axios';
import clsx from 'clsx';

const CLASS_A =
  'inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave dark:!text-white';
const CLASS_P = 'text-[1.6em] font-light max-w-[28em] leading-[1.4] mt-[1em]';

const SOCIAL_MEDIA = [
  {
    name: 'GitHub',
    src: GITHUB_URL,
    Icon: GithubFilledIcon,
  },
  {
    name: 'Twitter',
    src: TWITTER_URL,
    Icon: TwitterFilledIcon,
  },
];

export type HOME_PROJECTS_ITEM_TYPE = PROJECTS_ITEM_TYPE & {
  name: string;
  className?: string;
};

const PROJECTS_LIST: Array<HOME_PROJECTS_ITEM_TYPE> = [
  {
    name: 'Sharee',
    link: 'https://sharee.app',
  },
  {
    name: 'M Calendar',
    link: 'https://m-calendar.yuanx.me',
  },
  {
    name: 'Worth',
    link: 'https://worth.yuanx.me',
  },
  {
    name: 'AI Lawyer',
    link: 'https://ai-lawyer.yuanx.me/',
  },
  {
    name: 'ChatGPT Proxy',
    link: 'https://github.com/imyuanx/chatgpt-proxy',
    OGInfo: {
      ogImage: '/chatgpt-proxy-og-image.png',
    },
  },
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
        name: project.name,
        link: project.link,
        className: project.className || null,
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
    name: string;
    link: string;
    OGInfo?: OGInfo;
    className?: string;
  }[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>yuanx</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <meta property="og:title" content="yuanx" />
        <meta property="og:description" content="yuanx's personal website" />
        <meta property="og:image" content="https://yuanx.me/api/og" />
        <meta property="og:site_name" content="yuanx" />
        <meta property="og:author:username" content="yuanx" />
        <meta property="og:type" content="object" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="yuanx" />
        <meta property="twitter:description" content="yuanx's website" />
        <meta property="twitter:image" content="https://yuanx.me/api/og" />
        <meta property="twitter:image:width" content="800" />
        <meta property="twitter:image:height" content="400" />
        <meta property="twitter:site" content="@yuanx" />
        <meta property="twitter:creator" content="@yuanx" />
      </Head>
      <main className="relative w-full px-[10vw] pb-[3vh] pt-[10vh]">
        <h1 className="absolute z-[-5] my-0 select-none text-[6rem] font-medium text-[#ffffff] dark:text-[#141414]">
          {"I'm yuanx"}
        </h1>
        <article>
          <p className={CLASS_P}>
            {'Hey, my name is '}
            <span className="font-medium">yuanx</span>
            {' / '}
            <span className="font-medium">袁先</span>
            {
              ", I'm a front-end engineer and amateur designer. I like open source and building anything."
            }
          </p>
          <div className={CLASS_P}>
            {'Creator of '}
            {Array.isArray(props.projectsList) &&
              props.projectsList.map((project, index) => {
                return (
                  <Fragment key={project.name}>
                    <OGA
                      key={project.name}
                      className={clsx(CLASS_A, project.className)}
                      target={project.link}
                      name={project.name}
                      OGInfo={project.OGInfo}
                    />
                    {props.projectsList.length - 1 !== index && ', '}
                  </Fragment>
                );
              })}
            {' and '}
            <a
              className={CLASS_A}
              href="/projects"
              target="_blank"
              rel="noreferrer"
            >
              others
            </a>
            {'.'}
          </div>
          <p className={CLASS_P}>
            {
              'Creativity is the fuel for my enthusiasm for coding, I focus on wild ideas and turn them into reality.'
            }
          </p>
          <p className={CLASS_P}>
            {
              'I usually use React in my work and side projects, and I also like Vue. I am very concerned about the development experience, so I embrace all new things that can bring change.'
            }
          </p>
          <div className={CLASS_P}>
            {'Outside of programming, I persistently use '}
            <DuolingoLogo />
            {
              ' to learn English, If you happen to be in Shanghai, maybe we can code together.'
            }
          </div>
          <p className={CLASS_P}>
            {'You can find me on '}
            {SOCIAL_MEDIA.map(({ name, src, Icon }, index) => (
              <Fragment key={name}>
                <a
                  className={clsx(
                    CLASS_A,
                    'inline-flex items-center gap-1 align-bottom'
                  )}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                >
                  {Icon && <Icon />}
                  {name}
                </a>
                {index < SOCIAL_MEDIA.length - 1 ? ', ' : '.'}
              </Fragment>
            ))}
          </p>
          <p className={CLASS_P}>
            {'Mail me at '}
            <a
              className={clsx(
                CLASS_A,
                'inline-flex items-center gap-1 align-bottom'
              )}
              href={`mailto:${EMAIL}`}
            >
              <MailIcon className="scale-[1.2]" />
              {EMAIL}
            </a>
            {'.'}
          </p>
          {/* <p className={CLASS_P}>
            <a
              className={clsx(CLASS_A, 'font-medium')}
              href={`mailto:${EMAIL}`}
            >
              {"I'm waiting for a job offer"}
            </a>
            {", Let's create incredible things together."}
          </p> */}
        </article>
      </main>
    </>
  );
};

export default Home;
