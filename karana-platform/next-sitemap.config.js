/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://nexus.studio",
  generateRobotsTxt: true,
  exclude: ["/dashboard/*", "/admin/*", "/auth/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/dashboard", "/admin", "/api"] },
    ],
  },
}
