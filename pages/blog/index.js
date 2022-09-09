import Link from 'next/link';
import Nav from "../../components/Nav";
import articleEnv from '../../posts/posts.json';

const ARTICLES = articleEnv.ARTICLES;

function Blog() {
    return (
        <>
            <Nav active="blog" />
            <div className='container-blog'>
                <h1 className='container-blog-title'>My Blog</h1>
                <ul>
                    {
                        ARTICLES.map((articleItem) => {
                            return (<li key={articleItem.postId}><Link href={`/blog/posts/${articleItem.postId}`}><a><span className='article-title'>{articleItem.title}</span><span className='article-date'>{articleItem.date}</span></a></Link></li>);
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default Blog;
