/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'abdo008.pythonanywhere',
            pathname: '/media/**/**',
          },
        ],
        domains: ['abdo008.pythonanywhere.com'],
      },

};

export default nextConfig;
