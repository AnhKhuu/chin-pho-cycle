/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'utfs.io',
      'cdn.shopify.com',
      'maap.cc',
      'scontent.fsgn2-4.fna.fbcdn.net',
    ],
  },
  env: {
    BASE_URL: 'http://localhost:3001/api',
  },
};

module.exports = nextConfig;
