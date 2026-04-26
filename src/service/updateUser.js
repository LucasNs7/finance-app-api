import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
   PostgresUpdateUserRepository,
   PostgresGetUserByEmailRepository,
} from '../repository/postgres/index.js'

export class UpdateUserService {
   async execute(userId, updateParams) {
      if (updateParams.email) {
         const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

         const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(updateParams.email)

         if (userWithProvidedEmail && userWithProvidedEmail.id != userId)
            throw new EmailAlreadyInUseError(updateParams.email)
      }

      const user = { ...updateParams }

      if (updateParams.password) {
         const hashedPassword = await bcrypt.hash(updateParams.password, 10)

         user.password = hashedPassword
      }

      const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

      const updateUser = await postgresUpdateUserRepository.execute(
         userId,
         user,
      )

      return updateUser
   }
}
