module.exports = {
  images: {
    domains: ["cdn.discordapp.com", "i.imgur.com"],
  },

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
        source: "/faq",
        destination: "/help/faq",
        permanent: true,
      },
      {
        source: "/status",
        destination: "https://schoolutilities.statuspage.io/",
        permanent: true,
      },
    ];
  },
};