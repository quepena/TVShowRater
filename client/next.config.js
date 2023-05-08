/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.episodate.com',
        port: '',
        pathname: '/images/tv-show/thumbnail/**',
      },
    ],
  },
}

module.exports = nextConfig
