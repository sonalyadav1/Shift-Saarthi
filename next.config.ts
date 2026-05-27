import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this project only (not your home folder).
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    // Prevents huge dev-time disk cache writes that can freeze macOS.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
