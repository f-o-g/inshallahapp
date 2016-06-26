import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'
import { Refugee, Volunteer, Need, Skill } from '../models'
import Parse from 'parse/node'

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    args: {
      isComplete: { type: GraphQLBoolean }
    },
    fields: {
      refugees: {
        type: new GraphQLList(Refugee.SchemaType),
        resolve: (_) => {
          const query = new Parse.Query(Refugee)
          return query.find()
        }
      },
      volunteers: {
        type: new GraphQLList(Volunteer.SchemaType),
        resolve: (_) => {
          const query = new Parse.Query(Volunteer)
          return query.find()
        }
      },
      needs: {
        type: new GraphQLList(Need.SchemaType),
        resolve: (_) => {
          const query = new Parse.Query(Need)
          return query.find()
        }
      },
      skills: {
        type: new GraphQLList(Skill.SchemaType),
        resolve: (_) => {
          const query = new Parse.Query(Skill)
          return query.find()
        }
      }
    }
  })
})

export default Schema
