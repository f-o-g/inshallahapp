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
      resolve: volunteer => volunteer.get("firstName"),
    },
    lastName: {
      type: GraphQLString,
      resolve: volunteer => volunteer.get("lastName"),
    },
    city: {
      type: GraphQLString,
      resolve: volunteer => volunteer.get("city"),
    },
    country: {
      type: GraphQLString,
      resolve: volunteer => volunteer.get("country"),
    },
    phone: {
      type: GraphQLString,
      resolve: volunteer => volunteer.get("phone"),
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
    },
    profileComplete: {
      type: GraphQLString,
      resolve: volunteer => volunteer.get("profileComplete"),
    }
  })
})

Volunteer.SchemaType = InshaVolunteerType

export { Volunteer }
