/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  exportPathMap: () => ({
    "/": { page: "/" },
    "/blog": { page: "/blog" },
    "/blog/article": { page: "/blog/article" },
  }),
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.module.rules.push({
        test: /\.md$/i,
        use: 'raw-loader',
      });
    return config
  },
}

module.exports = nextConfig
