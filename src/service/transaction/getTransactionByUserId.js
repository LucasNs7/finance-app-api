import { userNotFoundResponse } from '../../controllers/helpers/index.js'

export class getTransactionByUserIdService {
   constructor(getTransactionByUserId, getUserByIdRepository) {
      this.getTransactionByUserId = getTransactionByUserId
      this.getUserByIdRepository = getUserByIdRepository
   }

   async execute(params) {
      const user = await this.getUserByIdRepository.execute(params.userId)

      if (!user) return userNotFoundResponse()

      const transactions = await this.getTransactionByUserId.execute(
         params.userId,
      )

      return transactions
   }
}
