/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { URL_API: process.env.URL_API, NEXT_ENV: process.env.NEXT_ENV },
  crossOrigin: "anonymous",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept- Version, Content - Length, Content - MD5, Content - Type, Date, X - Api - Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
