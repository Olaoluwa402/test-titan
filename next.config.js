/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "_next",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
