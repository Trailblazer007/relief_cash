/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SERVER_URL: process.env.SERVER_URL,
    BASE_URL: process.env.BASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/signin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
