import fs from 'fs';
import RSS from 'rss';
import markdownIt from 'markdown-it';
import chalk from 'chalk';
import articleEnv from '../src/config/posts.json' assert { type: 'json' };

console.log(`Script Start - ${chalk.green('generateFeed')}`);
const md = markdownIt();
const feed = new RSS({
  title: 'yuanx / 袁先',
  description: `yuanx' blog`,
  feed_url: 'https://yuanx.me/feed.xml',
  site_url: 'https://yuanx.me/',
  image_url: 'https://yuanx.me/avatar.jpg',
  copyright: 'CC BY-NC-SA 4.0 2022 © yuanx',
});

articleEnv.ARTICLES.map((article) => {
  console.log(`Translating markdown to html - ${article.title}`);
  const postMarkdown = fs
    .readFileSync(`./src/posts/${article.postId}.md`)
    .toString();
  let postLines = postMarkdown.split('\n');
  postLines.shift(); // delete post title
  const postHtml = md.render(postLines.join('\n'));

  feed.item({
    title: article.title,
    description: postHtml,
    url: `https://yuanx.me/blog/posts/${article.postId}`,
    guid: `https://yuanx.me/blog/posts/${article.postId}`,
    author: 'lonelyuanx@gmail.com (yuanx / 袁先)',
    date: new Date(article.date),
  });
});

const outputPath = './public/feed.xml';
if (fs.existsSync(outputPath)) {
  console.log('Removing old font file...');
  fs.rmSync(outputPath);
}
fs.writeFileSync(outputPath, feed.xml({ indent: true }));
console.log(chalk.green('Generate feed.xml success!'));
