import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Nav from "../../../components/Nav";

const Article: NextPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        if (pid) {
            const postPath = require.context(`../../../posts/`);
            const result = postPath(`./${pid}.md`);
            setMarkdown(result.default);
        }
    }, [pid]);

    return (
        <div className="container-article w-full h-full flex justify-center content-center">
            <Nav active="blog" />
            <div className="box-border article-content max-w-900px w-full h-full pt-60px pr-28px pb-28px pl-28px">
                <div className="article">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (<h1 className="text-2em leading-1.2 font-bold mb-2.7 mt-2.7">{ children }</h1>),
                            p: ({ children }) => {
                                return (
                                    <p
                                        className="text-18px leading-1.5 mt-1em"
                                    >
                                        {children}
                                    </p>
                                );
                            },
                            a: ({ children, href }) => (<a className="inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave" href={href} target="_blank" rel="noreferrer">{ children }</a>)
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
                <div className="article-footer">
                    <a
                        className="inline-block no-underline whitespace-nowrap text-[#121314] leading-normal bg-wave bg-16px bg-0px-bottom bg-repeat-x hover:animate-wave"
                        target="_blank"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        rel="noreferrer"
                    >
                        CC BY-NC-SA 4.0
                    </a>{" "}
                    2022-PRESENT © x Yuan
                </div>
            </div>
        </div>
    );
}

export default Article;
