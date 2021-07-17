const withSass = require('@zeit/next-sass')
module.exports = {
  env: {
    tmdbApi: process.env.tmdbApi,
    BACKEND_URL: process.env.BACKEND_URL,
    target: 'serverless',
    ...withSass()
  },
};
