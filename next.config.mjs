import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root explicitly: without this, Next.js walks up from
  // this project (which lives under a user profile folder containing a
  // stray package-lock.json) and warns about an ambiguous root.
  output: 'export',
  images: {
    unoptimized: true,
  },
  dynamicParams: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
