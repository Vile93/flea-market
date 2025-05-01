import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        BACKEND_API: process.env.BACKEND_API,
    },
    reactStrictMode: false,
};

export default nextConfig;
