module.exports = {
  images: {
    domains: ["cdn.discordapp.com"],
  },

  async redirects() {
    return [
      {
        source: "/register",
        destination: "/auth/register",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/create-school",
        destination: "/school/admin/create-school",
        permanent: true,
      }
    ];
  },
};
