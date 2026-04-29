import { UserNotFoundError } from '../../errors/user.js'

export class getTransactionsByUserIdService {
   constructor(getTransactionByUserId, getUserByIdRepository) {
      this.getTransactionByUserId = getTransactionByUserId
      this.getUserByIdRepository = getUserByIdRepository
   }

   async execute(params) {
      const user = await this.getUserByIdRepository.execute(params.userId)

      if (!user) throw new UserNotFoundError(params.userId) 

      const transactions = await this.getTransactionByUserId.execute(
         params.userId,
      )

      return transactions
   }
}
