/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default nextConfig;
