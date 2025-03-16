import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SPV_WALLET_BASE_URL: process.env.NEXT_PUBLIC_SPV_WALLET_BASE_URL,
    NEXT_PUBLIC_SPV_WALLET_ADMIN_KEY: process.env.NEXT_PUBLIC_SPV_WALLET_ADMIN_KEY,
  },
};

export default nextConfig;