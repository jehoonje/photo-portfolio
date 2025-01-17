/** @type {import('next').NextConfig} */
const customBasePath = process.env.CUSTOM_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  basePath: customBasePath,
  assetPrefix: customBasePath || undefined, // customBasePath가 없으면 undefined
  images: { unoptimized: true },
};

export default nextConfig;
