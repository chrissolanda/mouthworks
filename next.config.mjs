import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure Next uses this directory as the tracing root to avoid inferring the wrong workspace root
  outputFileTracingRoot: __dirname,
}

export default nextConfig
