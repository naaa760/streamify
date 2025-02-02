/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Temporarily disable type checking during build if needed
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily disable eslint during build if needed
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
