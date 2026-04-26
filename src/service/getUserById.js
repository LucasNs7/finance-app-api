import { PostgresGetUserByIdRepository } from '../repository/postgres/getUserById'

export class GetUserByIdService {
   async execute(userId) {
      const getUserByIdRepository = new PostgresGetUserByIdRepository()

      const user = await getUserByIdRepository.execute(userId)

      return user
   }
}
