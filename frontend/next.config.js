/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  env: {
    BACKEND_URL: "http://4556-2403-6200-8820-492a-d06-5b9e-77a1-275c.ngrok.io",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: false,
      },
      {
        source: "/admin/menu",
        destination: "/admin/menu/category",
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
};
