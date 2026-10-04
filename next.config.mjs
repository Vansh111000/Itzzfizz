import { fileURLToPath } from "url";
import path from "path";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? (() => {
  try {
    const remote = execFileSync("git", ["config", "--get", "remote.origin.url"], {
      cwd: __dirname,
      encoding: "utf8",
    }).trim();
    return remote.match(/(?:[:/])([^/:]+?)(?:\.git)?$/)?.[1] ?? "";
  } catch {
    return "";
  }
})();

const owner = process.env.GITHUB_REPOSITORY?.split("/")[0] ?? (() => {
  try {
    const remote = execFileSync("git", ["config", "--get", "remote.origin.url"], {
      cwd: __dirname,
      encoding: "utf8",
    }).trim();
    return remote.match(/(?:github\.com[:/])([^/]+)\//)?.[1] ?? "";
  } catch {
    return "";
  }
})();

const isUserOrOrganizationSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = repository && !isUserOrOrganizationSite ? `/${repository}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root explicitly: without this, Next.js walks up from
  // this project (which lives under a user profile folder containing a
  // stray package-lock.json) and warns about an ambiguous root.
  output: 'export',
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
