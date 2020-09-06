require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `MMmusic`,
    description: `Website for Mark Marshall`,
    author: `Jacob Silver`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_DELIVERY_API,
      },
    },
    {
      resolve: "gatsby-theme-auth0",
      options: {
        domain: process.env.GATSBY_AUTH0_DOMAIN,
        clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
        redirectUri: process.env.GATSBY_AUTH0_CALLBACK_URL,
        // audience: process.env.AUTH0_AUDIENCE, // Optional
        // responseType: process.env.AUTH0_RESPONSE_TYPE, // Optional
        // scope: process.env.AUTH0_SCOPE, // Optional
        // callbackPath: "/auth/callback", // Optional
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jake-Default-Starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
