import 'reflect-metadata' // this shim is required
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import { PhaseResolver } from './modules/phase/Phase'
import { UserResolver } from './modules/user/User'
import { TaskResolver } from './modules/task/Task'
import { connectDB } from './config/db'

class App {
  constructor () {
    connectDB()
  }

  async start () {
    const schema = await buildSchema({
      resolvers: [PhaseResolver, UserResolver, TaskResolver]
    })
    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
      console.log('Server started on http://localhost:4000/graphql')
    })
  }
}

export default App
