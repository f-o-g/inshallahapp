import { ParseServer } from 'parse-server'
import Parse from 'parse/node'
import ParseDashboard from 'parse-dashboard'
  
export default {
  setup (app, appName, settings, allowInsecureHTTPInParseDashboard = false) {
    Parse.initialize(settings.parseServerApplicationId, 'js-key', settings.parseServerMasterKey)
    Parse.serverURL = settings.parseServerURL

    const api = new ParseServer({
      databaseURI: settings.databaseURI,
      appId: settings.parseServerApplicationId,
      masterKey: settings.parseServerMasterKey,
      serverURL: `http://${settings.serverHost}:${settings.serverPort}/parse`,
    })

    app.use('/parse', api)

    app.use(
      '/dashboard',
      ParseDashboard({
        apps: [{
          serverURL: `http://${settings.serverHost}:${settings.serverPort}/parse`,
          appId: settings.parseServerApplicationId,
          masterKey: settings.parseServerMasterKey,
          appName,
        }],
        // users: settings.parseServerDashboardUsers
      }, allowInsecureHTTPInParseDashboard)
    )
  }
}
