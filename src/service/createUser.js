import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repository/postgres/createUser.js'
import { PostgresGetUserByEmailRepository } from '../repository/postgres/getUserByEmail.js'

export class CreateUserService {
   async execute(createUserParams) {
      const postgresGetUserByEmailRepository =
         new PostgresGetUserByEmailRepository()

      const userWithProvidedEmail = await postgresCreateUserRepository.execute(
         createUserParams.email,
      )

      if (userWithProvidedEmail)
         throw new Error('The provided email is already in use.')

      const userID = uuidv4()
      const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

      const user = {
         ...createUserParams,
         ID: userID,
         password: hashedPassword,
      }

      const postgresCreateUserRepository = new PostgresCreateUserRepository()

      const createdUser = await postgresCreateUserRepository.execute(user)

      return createdUser
   }
}
