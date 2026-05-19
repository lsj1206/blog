// gatsby config
module.exports = {
  siteMetadata: {
    title: `TECH.log`,
    description: `기술 블로그에 오신 것을 환영합니다.`,
    author: `Lee SeoJun`,
    siteUrl: `https://lsj1206.github.io`,
    defaultImage: `./static/image/homepage.jpg`,
    language: `ko`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./src/pages/`,
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/_posts/`,
        ignore: [`**/.temp/**`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        excerpt_separator: `<!-- end -->`,
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: { js: "javascript", sh: "bash" },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        excludes: [`/404/`, `/dev-404-page/`, `/search/`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://lsj1206.github.io/`,
        sitemap: `https://lsj1206.github.io/sitemap-index.xml`,
        policy: [
          {
            userAgent: `*`,
            allow: [`/`, `/post/`],
            disallow: [`/404/`, `/dev-404-page/`],
          },
        ],
      },
    },
  ],
};
