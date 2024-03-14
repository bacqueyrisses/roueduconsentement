/** @type {import('next').NextConfig} */
const env = process.env.VERCEL_ENV;

const nextConfig = {
  experimental: { typedRoutes: true },
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

if (env === "preview") {
  nextConfig.typescript = {
    ignoreBuildErrors: true,
  };
}
export default nextConfig;
