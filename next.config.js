/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vercel.com'],
    unoptimized: true,
  },
  // Enable static exports
  output: 'standalone',
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Trailing slashes configuration
  trailingSlash: true,
  // Configure powered by header
  poweredByHeader: false,
  // Configure compression
  compress: true,
  // Configure base path if needed
  basePath: '',
  // Configure asset prefix if needed
  assetPrefix: '',
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
}

module.exports = nextConfig 