/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix YJS module resolution for Tiptap in the browser
      config.resolve.alias["yjs"] = path.resolve(
        process.cwd(),
        "node_modules/yjs"
      );
    }
    return config;
  },
};

export default nextConfig;
