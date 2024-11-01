/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'specials-images.forbesimg.com',
                port: '',
                pathname: '/imageserve/**',
            },
        ],
    },
};

export default nextConfig;
