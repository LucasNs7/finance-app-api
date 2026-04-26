import { PostgresDeleteUserRepository } from '../repository/postgres/index.js'

export class deletedUserService {
   async execute(userId) {
      const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

      const deletedUser = await postgresDeleteUserRepository.execute(userId)

      return deletedUser
   }
}
