const express = require('express')
const graphql = require('./graphql')


async function start (config) {
  const app = express()

  
  await graphql(app, config)
 
  return app.listen(
    { port: config.api.port },
    () => console.log(`🚀 Server UP and 🌪️ Spinning on port ${config.api.port}`))
}

module.exports = start
module.exports.start = start
