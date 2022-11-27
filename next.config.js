/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "build",
   eslint: {
    ignoreDuringBuilds: true,
},
    images: {
    domains: ['res.cloudinary.com'],
  }
}

module.exports = nextConfig
