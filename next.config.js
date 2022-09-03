/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: () => ({
    "/": { page: "/" },
    "/blog": { page: "/blog" },
    "/blog/article": { page: "/blog/article" },
  }),
}

module.exports = nextConfig
