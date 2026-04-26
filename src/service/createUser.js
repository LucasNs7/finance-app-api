import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
   PostgresCreateUserRepository,
   PostgresGetUserByEmailRepository,
} from '../repository/postgres/index.js'

export class CreateUserService {
   async execute(createUserParams) {
      const postgresGetUserByEmailRepository =
         new PostgresGetUserByEmailRepository()

      const userWithProvidedEmail =
         await postgresGetUserByEmailRepository.execute(createUserParams.email)

      if (userWithProvidedEmail)
         throw new EmailAlreadyInUseError(createUserParams.email)

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
