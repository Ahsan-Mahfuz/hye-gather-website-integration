import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', '10.0.60.23', '10.0.60.189', 'dummyimage.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
