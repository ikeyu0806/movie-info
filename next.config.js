const withSass = require('@zeit/next-sass')
module.exports = {
  env: {
    tmdbApi: process.env.tmdbApi,
    target: 'serverless',
    ...withSass()
  },
};
