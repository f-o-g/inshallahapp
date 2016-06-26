import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import Parse from 'parse/node'
import Schema from './schema'

const jsonParser = bodyParser.json()
function getSchema(isDevelopment) {
  if (!isDevelopment) {
    return Schema
  }

  delete require.cache[require.resolve('./schema.js')]
  return require('./schema.js').Schema
}

export default {
  setup (app, isDevelopment = false) {
    app.use('/graphql', jsonParser, graphqlHTTP(request => {
      const sessionToken = request.body && request.body.sessionToken
      console.log(sessionToken)
      const baseOps = {
        schema: getSchema(isDevelopment),
        graphiql: isDevelopment,
        pretty: isDevelopment,
        context: {}
      }

      if (!sessionToken) {
        return baseOps
      } else {
        return new Parse.Query(Parse.Session).equalTo('sessionToken', sessionToken)
          .first({useMasterKey: true}).then(session => {
            return session && session.get('user').fetch()
          }, error => {
            console.error('error authenticating graphql request', error)
            return baseOps
          }).then(user => {
            if (user) {
              return Object.assign(baseOps, {
                context: {user, sessionToken}
              })
            } else {
              return baseOps
            }
          })
      }
    }))
  }
}
