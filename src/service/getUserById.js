import { PostgresGetUserByIdRepository } from '../repository/postgres/index.js'

export class GetUserByIdService {
   async execute(userId) {
      const getUserByIdRepository = new PostgresGetUserByIdRepository()

      const user = await getUserByIdRepository.execute(userId)

      return user
   }
}
