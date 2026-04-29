import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionService {
   constructor(updateTransactionRepository, getUserByIdRepository) {
      this.updateTransactionRepository = updateTransactionRepository
      this.getUserByIdRepository = getUserByIdRepository
   }

   async execute(params) {
      const user = await this.getUserByIdRepository(params.userId)

      if (!user) throw new UserNotFoundError(params.userId)

      const transaction = await this.updateTransactionRepository.execute(params)

      return transaction
   }
}
