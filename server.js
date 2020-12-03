import schema from './modules/rootSchema'
import {
  NODE_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} from './config.js'


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express')

const server = express()

server.get('/', (req, res) => {
  res.send(`Server is now running on http://localhost:${NODE_PORT}`)
})

server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema })))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

server.listen(NODE_PORT, () => console.log(`Server is now running on http://localhost:${NODE_PORT}`))

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

// Connection MongoDB URL
const db = mongoose.connection
db.on('error', console.error.bind(console, `connection error:`))
db.once('open', () => {
  console.log(`DB Connected on ${DB_HOST}:${DB_PORT}/${DB_NAME}`)
})
