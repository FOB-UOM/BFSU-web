/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/notices',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/notices/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
      {
        source: '/circulars',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/circulars/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/student-life',
        destination: '/explore',
        permanent: true,
      },
      {
        source: '/activities',
        destination: '/events',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
