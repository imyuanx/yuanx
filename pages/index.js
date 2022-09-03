import Head from "next/head";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <>
        <Nav active="home" />
        <div className='container-home'>
            <Head>
                <title>x Yuan</title>
            </Head>
            <h1>Hi, I am x Yuan.</h1>
            <p>{"I'm a front-end engineer and I'm learning English , Usually use React in my work, but I also like Vue."}</p>
            <p>I like open source and building anything. I focus on my ideas and turn them into reality.</p>
            <p>My ideal is to become an independent developer, I have a side project: <a href='https://m-calendar.yuanx.me' target='_blank' rel="noreferrer">米历</a>, It is a calendar app support Chinese holiday, You can download it in AppStore.</p>
            <p>My other projects: <a href='https://www.github.com/yunying1/worth' target='_blank' rel="noreferrer">Worth</a>.</p>
            <p>You can following me on <a href='https://www.github.com/yunying1' target='_blank' rel="noreferrer">GitHub</a>, <a href='https://twitter.com/yyuan_x' target='_blank' rel="noreferrer">Twitter</a>, <a href='https://www.zhihu.com/people/yun-ying-37-92' target='_blank' rel="noreferrer">知乎</a> or <a href='https://juejin.cn/user/4292141022723207' target='_blank' rel="noreferrer">掘金</a>.</p>
            <p>Mail me at <a href="mailto:lonelyuanx@gmail.com">lonelyuanx@gmail.com</a>.</p>
            <p className="important"><a href="mailto:lonelyuanx@gmail.com">I{"'"}m waiting for a job offer.</a></p>
        </div>
    </>
  )
}
