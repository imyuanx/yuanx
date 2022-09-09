import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Nav from "../../../components/Nav";

function Article() {
    const router = useRouter();
    const { postId } = router.query;
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        if (postId) {
            const postPath = require.context(`../../../public/articles/`);
            const result = postPath(`./${postId}.md`);
            setMarkdown(result.default);
        }
    }, [postId]);

    return (
        <div className="container-article">
            <div className="article-content">
                <Nav active="blog" />
                <div className="article">
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => {
                                return (
                                    <p
                                        style={{
                                            fontSize: 18,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {children}
                                    </p>
                                );
                            },
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
                <div className="article-footer">
                    <a
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
