module.exports = {
  images: {
    domains: ["cdn.discordapp.com"],
  },
  "presets": ["next/babel"],
  
  async redirects() {
    return [
      {
        source: "/register",
        destination: "/auth?tab=register",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth?tab=login",
        permanent: true,
      },
      {
        source: "/create-school",
        destination: "/school/admin/create-school",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/profile/settings",
        permanent: true,
      }
    ];
  },
};
