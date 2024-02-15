/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.googleusercontent.com' },
      { hostname: '*.s3.amazonaws.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
