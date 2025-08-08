import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**', // allows all paths
      },
    ],
    domains: ['cdn.shopify.com'],
  },
};

export default nextConfig;
