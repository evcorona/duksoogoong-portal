/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { URL_API: process.env.URL_API, NEXT_ENV: process.env.NEXT_ENV },
};

export default nextConfig;
