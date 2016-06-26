export default {
  "serverPort": process.env.PORT || 8080,
  "serverHost": process.env.HOST || 'localhost',
  "parseServerApplicationId": process.env.APP_ID || 'inshallahapp',
  "parseServerMasterKey": process.env.MASTER_KEY || 'master',
  "parseServerDatabaseURI": process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  "parseServerDashboardUsers": [
    {
      "user": "admin",
      "pass": "admin"
    }
  ],
  "isDevelopment": process.env.NODE_ENV !== 'production',
  "dashboardAuth": process.env.DASHBOARD_AUTH,
  "graphqlURL": "http://localhost:8080/graphql",
  "databaseURI": "mongodb://localhost:27017/dev"
}

