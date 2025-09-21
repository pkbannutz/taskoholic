/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@taskoholic/shared', '@taskoholic/ui'],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
