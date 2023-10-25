/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'maap.cc',
      },
      {
        hostname: 'cdn.shopify.com',
      },
      {
        hostname: 'images.prismic.io',
      },
      {
        hostname: 'file.hstatic.net',
      },
      {
        hostname: 'utfs.io',
      },
    ],
  },
};

module.exports = nextConfig;
