/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.poewiki.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'web.poecdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
