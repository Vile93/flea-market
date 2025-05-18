import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        BACKEND_API: process.env.BACKEND_API,
        IMAGE_API: process.env.IMAGE_API,
        IMAGE_AVA_API: process.env.IMAGE_AVA_API,
    },
    reactStrictMode: false,
};

export default nextConfig;
