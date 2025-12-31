import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "u9a6wmr3as.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
