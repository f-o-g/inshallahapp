import Parse from 'parse/node'
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import { Skill, Need } from './skills'
import { Volunteer } from './volunteers'

const Refugee = Parse.Object.extend("Refugee")

const InshaRefugeeType = new GraphQLObjectType({
  name: 'Refugee',
  description: 'A refugee who needs help',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    firstName: {
      type: GraphQLString,
      resolve: refugee => refugee.get("firstName"),
    },
    lastName: {
      type: GraphQLString,
      resolve: refugee => refugee.get("lastName"),
    },
    city: {
      type: GraphQLString,
      resolve: refugee => refugee.get("city"),
    },
    country: {
      type: GraphQLString,
      resolve: refugee => refugee.get("country"),
    },
    phone: {
      type: GraphQLString,
      resolve: refugee => refugee.get("phone"),
    },
    skills: {
      type: new GraphQLList(Skill.SchemaType),
      description: 'Skills',
      resolve: () => new Parse.Query(Skill).find(),
    },
    needs: {
      type: new GraphQLList(Need.SchemaType),
      description: 'Needs',
      resolve: () => new Parse.Query(Need).find(),
    },
    volunteers: {
      type: new GraphQLList(Volunteer.SchemaType),
      description: 'Volunteers',
      resolve: () => new Parse.Query(Volunteer).find()
    }
  })
})

Refugee.SchemaType = InshaRefugeeType

export {
  Refugee
}
