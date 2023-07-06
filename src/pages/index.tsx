import { Fragment } from 'react';
import type { NextApiRequest, NextPage } from 'next';
import Head from 'next/head';
import DuolingoLogo from '@/components/DuolingoLogo';
import OGA from '@/components/OGA';
import GithubFilledIcon from '@/icons/github-filled.svg';
import JuejinFilledIcon from '@/icons/juejin-filled.svg';
import MailIcon from '@/icons/mail.svg';
import TwitterFilledIcon from '@/icons/twitter-filled.svg';
import WeiboFilledIcon from '@/icons/weibo-filled.svg';
import ZhihuFilledIcon from '@/icons/zhihu-filled.svg';
import { PROJECTS_ITEM_TYPE } from '@/pages/projects';
import clsx from 'clsx';

const CLASS_A: string =
  'inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave dark:!text-white';
const CLASS_P: string =
  'text-[1.6em] font-light max-w-[28em] leading-[1.4] mt-[1em]';

const SOCIAL_MEDIA = [
  {
    name: 'GitHub',
    src: 'https://www.github.com/imyuanx',
    Icon: GithubFilledIcon,
  },
  {
    name: 'Twitter',
    src: 'https://twitter.com/imyuanx',
    Icon: TwitterFilledIcon,
  },
  {
    name: '知乎',
    src: 'https://www.zhihu.com/people/yun-ying-37-92',
    Icon: ZhihuFilledIcon,
  },
  {
    name: '微博',
    src: 'https://weibo.com/u/6018607591',
    Icon: WeiboFilledIcon,
  },
  {
    name: '掘金',
    src: 'https://juejin.cn/user/4292141022723207',
    Icon: JuejinFilledIcon,
  },
];

export type HOME_PROJECTS_ITEM_TYPE = PROJECTS_ITEM_TYPE & {
  name: string;
};

const PROJECTS_LIST: Array<HOME_PROJECTS_ITEM_TYPE> = [
  {
    name: '米历',
    link: 'https://m-calendar.yuanx.me',
  },
  {
    name: 'Sharing GUI',
    link: 'https://sharing-gui.yuanx.me',
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
    OGInfo: { ogImage: 'https://yuanx.me/chatgpt-proxy-og-image.png' },
  },
];

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  return {
    props: {
      host: req.headers.host,
    },
  };
}

const Home: NextPage<{ host: string }> = (props) => {
  return (
    <>
      <Head>
        <title>x Yuan</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <meta property="og:title" content="yuanx" />
        <meta property="og:description" content="yuanx's personal website" />
        <meta property="og:image" content={`https://${props.host}/api/og`} />
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
          {"I'm x Yuan."}
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
          <p className={CLASS_P}>
            {'Creator of '}
            {PROJECTS_LIST.map((project, index) => {
              return (
                <>
                  <OGA key={project.name} target={project.link}>
                    <a
                      className={CLASS_A}
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                  </OGA>
                  {PROJECTS_LIST.length - 1 !== index && ', '}
                </>
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
          </p>
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
          <p className={CLASS_P}>
            {'Outside of programming, I persistently use '}
            <DuolingoLogo />
            {
              ' to learn English, and trying to make friends with animals, I have a cat friend who has known me for about 3 months, we will date once or twice almost every working day.'
            }
          </p>
          <p className={CLASS_P}>
            {'You can find me on '}
            {SOCIAL_MEDIA.map(({ name, src, Icon }, index) => {
              return (
                <Fragment key={name}>
                  <a
                    className={clsx(CLASS_A, 'inline-flex items-center gap-1')}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {Icon && <Icon />}
                    {name}
                  </a>
                  {index === SOCIAL_MEDIA.length - 2
                    ? ' or '
                    : index === SOCIAL_MEDIA.length - 1
                    ? '.'
                    : ', '}
                </Fragment>
              );
            })}
          </p>
          <p className={CLASS_P}>
            {'Mail me at '}
            <a
              className={clsx(CLASS_A, 'inline-flex items-center gap-1')}
              href="mailto:lonelyuanx@gmail.com"
            >
              <MailIcon />
              lonelyuanx@gmail.com
            </a>
            {'.'}
          </p>
          <p className={CLASS_P}>
            <a
              className={clsx(CLASS_A, 'font-medium')}
              href="mailto:lonelyuanx@gmail.com"
            >
              {"I'm waiting for a job offer"}
            </a>
            {", Let's create incredible things together."}
          </p>
        </article>
      </main>
    </>
  );
};

export default Home;
