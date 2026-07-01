/** @type {import('next').NextConfig} */
const { LEGACY_REDIRECTS } = require("./src/lib/legacy-redirects-data.js");

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return Object.entries(LEGACY_REDIRECTS).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
