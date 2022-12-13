/** @type {import('next').NextConfig} */

const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
  distDir: "build",
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};

const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-wallets",
  "@solana/wallet-adapter-react-ui",
]);

module.exports = withTM({ ...config });
