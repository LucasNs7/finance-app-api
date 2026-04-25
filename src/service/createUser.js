import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repository/postgres/createUser.js'

export class CreateUserService {
   async execute(createUserParams) {
      // TODO: verificar se o email já existe

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
