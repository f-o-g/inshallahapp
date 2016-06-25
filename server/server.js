import path from 'path'
import express from 'express'
import Parse from '../node_modules/parse/node'
import {ParseServer} from 'parse-server'
import ParseDashboard from 'parse-dashboard'

const SERVER_PORT = process.env.PORT || 8080
const SERVER_HOST = process.env.HOST || 'localhost'
const APP_ID = process.env.APP_ID || 'inshallahapp'
const MASTER_KEY = process.env.MASTER_KEY || 'master'
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev'
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH

Parse.initialize(APP_ID)
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`
Parse.masterKey = MASTER_KEY
Parse.Cloud.useMasterKey()

const server = express()

// Serve static assets from the /public folder
server.use('/public', express.static(path.join(__dirname, '../public')))

server.get('/', function(req, res) {
  res.status(200).send('Welcome to Inshallahapp')
})

server.use(
  '/parse',
  new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, 'cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
  })
)

if (IS_DEVELOPMENT) {
  let users
  if (DASHBOARD_AUTH) {
    var [user, pass] = DASHBOARD_AUTH.split(':')
    users = [{user, pass}]
    console.log(users)
  }
  server.use(
    '/dashboard',
    ParseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: 'inshallahapp',
      }],
      users,
    }, IS_DEVELOPMENT)
  )
}

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
server.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/parse-test/test.html'))
})

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
))


