import { useRouter } from 'next/router';
import Nav from "../../components/Nav";

function Article() {
    const router = useRouter();
    const { h } = router.query;

    return (
        <>
            <Nav active="blog" />
            <div className="container-article">
                <iframe
                    src={h}
                    className="iframe-notes"
                />
            </div>
        </>
    );
}

export default Article;
