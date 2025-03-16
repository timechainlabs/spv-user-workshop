import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SPV_WALLET_BASE_URL: process.env.SPV_WALLET_BASE_URL,
    SPV_WALLET_ADMIN_KEY: process.env.SPV_WALLET_ADMIN_KEY,
    SPV_WALLET_NETWORK: process.env.SPV_WALLET_NETWORK,
  },
};

export default nextConfig;
