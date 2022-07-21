const nextConfig = {
  env: {
    SSL: process.env.SSL,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
