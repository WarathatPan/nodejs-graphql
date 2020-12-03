import {
  query as teamQuery,
  resolvers as teamResolvers,
  typeDefinitions as teamTypes,
  mutation as teamMutation,
} from './Team/schema'

const { makeExecutableSchema } = require('graphql-tools')
const merge = require('lodash.merge')

const moduleQueries = [
  teamQuery,
]

const moduleTypeDefinitions = [
  teamTypes,
]

const moduleMutations = [
  teamMutation,
]

const schema = `
  # Root Query
  type Query {
    ${moduleQueries.join('\n')}
  }

  ${moduleTypeDefinitions.join('\n')}

  # All Mutation services
  type Mutation {
    ${moduleMutations.join('\n')}
  }

  # GraphQL Document
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = merge(teamResolvers)
const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers,
})

export default executableSchema
