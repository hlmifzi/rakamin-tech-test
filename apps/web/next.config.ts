import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@rakamin/ui"],

  async redirects() {
    return [
      {
        source: "/",
        destination: "/candidate/job-list",
        permanent: true, // gunakan false kalau hanya sementara
      },
    ];
  },
};

export default nextConfig;
