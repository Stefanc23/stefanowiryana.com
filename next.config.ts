import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // TypeScript 5.9 supports Next's compiler API. Avoid the CLI output race in
    // Next 16.3's default checker until the upstream CLI path is fixed.
    useTypeScriptCli: false,
  },
  reactStrictMode: true,
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.100.7', '127.0.0.1'],
};

export default nextConfig;
