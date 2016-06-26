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
import { Refugee } from './refugees'

const Volunteer = Parse.Object.extend("Volunteer")

const InshaVolunteerType = new GraphQLObjectType({
  name: 'Volunteer',
  description: 'A person who is willing to help refugees',
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
    refugees: {
      type: new GraphQLList(Refugee.SchemaType),
      description: 'Refugees',
      resolve: () => new Parse.Query(Refugee).find()
    }
  })
})

Volunteer.SchemaType = InshaVolunteerType

export { Volunteer }
