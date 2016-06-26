import Parse from 'parse/node'
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

const Need = Parse.Object.extend("Need")
const Skill = Parse.Object.extend("Skill")

const InshaSkillType = new GraphQLObjectType({
  name: 'Skill',
  description: 'A skill a person has to offer',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  })
})

const InshaNeedType = new GraphQLObjectType({
  name: 'Need',
  description: 'A need a person has',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  })
})

Need.SchemaType = InshaNeedType
Skill.SchemaType = InshaSkillType

export {
  Need,
  Skill
}
