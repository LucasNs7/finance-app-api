import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserService {
   constructor(getUserByEmailRepository, createUserRepository) {
      this.getUserByEmailRepository = getUserByEmailRepository
      this.createUserRepository = createUserRepository
   }

   async execute(createUserParams) {
      const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
         createUserParams.email,
      )

      if (userWithProvidedEmail)
         throw new EmailAlreadyInUseError(createUserParams.email)

      const userID = uuidv4()

      const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

      const user = {
         ...createUserParams,
         ID: userID,
         password: hashedPassword,
      }

      const createdUser = await this.createUserRepository.execute(user)

      return createdUser
   }
}
