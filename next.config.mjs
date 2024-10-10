/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8000',
            pathname: '/media/**/**',
          },
        ],
        domains: ['http://localhost:8000'],
      },

};

export default nextConfig;
