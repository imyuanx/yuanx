import type { NextPage } from 'next';
import Head from 'next/head';
import Nav from '../components/Nav';

const CLASS_A: string =
  'inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave dark:!text-white';
const CLASS_P: string = 'text-1.6em font-light max-w-28em leading-1.4 mt-1em';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>x Yuan</title>
      </Head>
      <Nav active="home" />
      <main className="relative container-home pt-10vh pr-10vw pb-3vh pl-10vw">
        <h1 className="absolute text-6rem font-medium mb-0 mt-0 text-#00000014 dark:text-#ffffff14 z-[-1]">
          {"I'm x Yuan."}
        </h1>
        <article>
          <p className={CLASS_P}>
            {
              "I'm a front-end engineer and amateur designer. I'm learning English, Usually use React in my work, but I also like Vue."
            }
          </p>
          <p className={CLASS_P}>
            {
              'I like open source and building anything. I focus on my ideas and turn them into reality.'
            }
          </p>
          <p className={CLASS_P}>
            {
              'My ideal is to become an independent developer, I have a side project: '
            }
            <a
              className={CLASS_A}
              href="https://m-calendar.yuanx.me"
              target="_blank"
              rel="noreferrer"
            >
              米历
            </a>
            {
              ', It is a calendar app support Chinese holiday, You can download it in AppStore.'
            }
          </p>
          <p className={CLASS_P}>
            {'My other projects: '}
            <a
              className={CLASS_A}
              href="https://github.com/yunying1/sharing-GUI"
              target="_blank"
              rel="noreferrer"
            >
              Sharing GUI
            </a>
            {', '}
            <a
              className={CLASS_A}
              href="https://worth.yuanx.me"
              target="_blank"
              rel="noreferrer"
            >
              Worth
            </a>
            {'.'}
          </p>
          <p className={CLASS_P}>
            {'You can following me on '}
            <a
              className={CLASS_A}
              href="https://www.github.com/yunying1"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            {', '}
            <a
              className={CLASS_A}
              href="https://twitter.com/yyuan_x"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            {', '}
            <a
              className={CLASS_A}
              href="https://www.zhihu.com/people/yun-ying-37-92"
              target="_blank"
              rel="noreferrer"
            >
              知乎
            </a>
            {' or '}
            <a
              className={CLASS_A}
              href="https://juejin.cn/user/4292141022723207"
              target="_blank"
              rel="noreferrer"
            >
              掘金
            </a>
            {'.'}
          </p>
          <p className={CLASS_P}>
            {'Mail me at '}
            <a className={CLASS_A} href="mailto:lonelyuanx@gmail.com">
              lonelyuanx@gmail.com
            </a>
            {'.'}
          </p>
          <p className="text-1.6em font-medium max-w-28em leading-1.4 mt-1em">
            <a className={CLASS_A} href="mailto:lonelyuanx@gmail.com">
              {"I'm waiting for a job offer."}
            </a>
          </p>
        </article>
      </main>
    </>
  );
};

export default Home;
