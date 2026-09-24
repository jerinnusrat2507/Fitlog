/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // Pin the workspace root explicitly so Turbopack doesn't get confused
  // by a stray lockfile it may find in a parent folder (e.g. after
  // re-downloading/re-extracting the project zip on Windows).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
