/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.openfoodfacts.org",
      "static.openfoodfacts.org",
      "world.openfoodfacts.org",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.openfoodfacts.org",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
