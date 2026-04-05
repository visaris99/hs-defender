/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
  },
  exclude: ["/api/*"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    // 페이지별 priority 차등화
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/about" || path === "/cases") {
      priority = 0.8;
    } else if (path === "/blog" || path === "/faq") {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.startsWith("/blog/")) {
      priority = 0.7;
    } else if (path.startsWith("/cases/")) {
      priority = 0.6;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
