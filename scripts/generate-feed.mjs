import chalk from 'chalk';
import fs from 'fs';
import markdownIt from 'markdown-it';
import { dirname, join } from 'path';
import RSS from 'rss';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const articleEnvPath = join(__dirname, '..', 'src', 'config', 'posts.json');
const articleEnv = JSON.parse(fs.readFileSync(articleEnvPath, 'utf8'));

console.log(`Script Start - ${chalk.green('generate-feed')}`);
const md = markdownIt({ html: true });
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
    author: 'yuanx.me@gmail.com (yuanx)',
    date: new Date(article.date),
  });
});

const outputPath = './public/feed.xml';
if (fs.existsSync(outputPath)) {
  console.log('Removing old feed.xml...');
  fs.rmSync(outputPath);
}
fs.writeFileSync(outputPath, feed.xml({ indent: true }));
console.log(chalk.green('Generate feed.xml success!'));
