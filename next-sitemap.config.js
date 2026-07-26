/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://stefanowiryana.com',
  generateRobotsTxt: true,
  exclude: ['/studio'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio'],
      },
    ],
  },
};
