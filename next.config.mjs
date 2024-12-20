/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.DISABLE_ESLINT === "true",
  },
  experimental: {
    scrollRestoration: false
  }
};

export default nextConfig;
