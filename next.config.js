/** @type {import('next').NextConfig} */
const articleEnv = require('./posts/posts.json');

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: false, // TODO: https://github.com/ReactTooltip/react-tooltip#nextjs-typeerror-f-is-not-a-function
  trailingSlash: true,
  exportPathMap: () => {
    let pathMap = {
      '/': { page: '/' },
      '/blog': { page: '/blog' },
    };
    articleEnv.ARTICLES.map(
      (item) =>
        (pathMap[`/blog/posts/${item.postId}`] = {
          page: '/blog/posts/[pid]',
        }),
    );
    return pathMap;
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.md$/i,
      use: 'raw-loader',
    });

    // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
    config.module.rules.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
    });

    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: 'source-map-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
