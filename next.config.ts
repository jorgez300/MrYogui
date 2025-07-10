import type { NextConfig } from "next";
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://compartidosstorage1.blob.core.windows.net/mryogui/**"),
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  output: 'standalone'
};

export default nextConfig;
