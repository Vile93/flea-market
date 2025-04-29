import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        BACKEND_API: process.env.BACKEND_API,
    },
};

export default nextConfig;
