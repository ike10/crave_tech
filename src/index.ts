import "reflect-metadata" // this shim is required
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
// import {createConnection} from 'typeorm'
import {  PhaseResolver } from "./modules/phase/Phase"
import {  UserResolver } from "./modules/user/User"
import {  TaskResolver } from "./modules/task/Task"

const main = async () => {
//    const connection = await createConnection('./ormconfig.json')
//    await connection.synchronize(true)

    const schema = await buildSchema({
        resolvers: [PhaseResolver, UserResolver, TaskResolver],
    })
    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql")
    })
}

main()