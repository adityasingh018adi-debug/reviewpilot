/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint warnings should not block production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors are still surfaced; only lint is skipped above
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "api.qrserver.com" },
    ],
  },
};

export default nextConfig;
