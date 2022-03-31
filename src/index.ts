import 'reflect-metadata' // this shim is required
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { PhaseResolver } from './modules/phase/Phase'
import { UserResolver } from './modules/user/User'
import { TaskResolver } from './modules/task/Task'
import { User, Phase, Task } from '../src/entity/index'
const main = async () => {
//    const connection = await createConnection('./ormconfig.json')
//    await connection.synchronize(true)
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'manu4life',
      database: 'phases',
      entities: [User, Phase, Task],
      'synchronize': true,
      'logging': true
    })
    console.log('Connected to postgres')
  } catch (error) {
    console.log(error)
    throw new Error('Could not connect to postgres')
  }


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

main()
