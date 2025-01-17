/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  basePath: '/photo-portfolio',
  assetPrefix: '/photo-portfolio',
  images: { unoptimized: true },
};

export default nextConfig;