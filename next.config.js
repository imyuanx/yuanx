/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  exportPathMap: () => ({
    '/': { page: '/' },
    '/blog': { page: '/blog' },
    // '/blog/posts/[pid]': { page: '/blog/posts/[pid]' },
    '/blog/posts/create-blog-with-arc': { page: '/blog/posts/[pid]' },
  }),
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
