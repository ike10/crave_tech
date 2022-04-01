import { Phase, Task, User } from '../entity/index'
import { createConnection } from 'typeorm'
import { config } from 'dotenv'

config()
export const connectDB = async () => {
  try {
    await createConnection({
      type: 'INSERT_YOUR_DB',
      host: 'localhost',
      port: 'INSERT _PORT_NUMBER',
      username: 'PORT_USERNAME',
      password: 'PASSWORD',
      database: 'DATABASE_NAME',
      entities: [User, Phase, Task],
      'synchronize': true,
      'logging': true
    })
    console.log('Connected to postgres')
  } catch (error) {
    console.log(error)
    throw new Error('Could not connect to postgres')
  }
}
