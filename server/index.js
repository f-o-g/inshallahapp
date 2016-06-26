import settings from '../settings/index'
import packageJSON from '../package'
import path from 'path'
import express from 'express'
import graphql from './graphql'
import parseServer from './parse-server'

const server = express()

const {
  isDevelopment,
  serverHost,
  serverPort
} = settings

parseServer.setup(server, packageJSON.name, settings, isDevelopment)
graphql.setup(server, isDevelopment);

server.get('/', (req, res) => res.redirect('/graphql'))

// Serve static assets from the /public folder
server.use('/public', express.static(path.join(__dirname, '../public')))

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
server.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/parse-test/test.html'))
})

server.listen(serverPort, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://${serverHost}:${serverPort}`
))


