import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  
  // API Route rewrites for proxy functionality
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: '/api/proxy/:path*',
      },
      // Example: Proxy external API
      {
        source: '/api/external/:path*',
        destination: 'https://jsonplaceholder.typicode.com/:path*',
      },
    ];
  },

  // Headers for CORS and proxy configuration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
