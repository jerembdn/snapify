/** @type {import('next').NextConfig} */

const { hostname } = require('node:os');
const path = require("node:path");

import("./env.mjs");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Powered-By",
    value: "Qotum",
  },
];

const i18n = {
  locales: ["fr", "en"],
  defaultLocale: "fr",
};

const images = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "i.ytimg.com",
    },
    {
      protocol: "https",
      hostname: "yt3.ggpht.com",
    }
  ],
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  devIndicators: {
    buildActivity: false,
  },
  images,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
