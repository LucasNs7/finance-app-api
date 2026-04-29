import { UserNotFoundError } from '../../errors/user.js'
import {
   serverError,
   userNotFoundResponse,
   ok,
   checkIfIdIsValid,
   invalidIdResponse,
   requiredFieldIsMissingResponse,
} from '../helpers/index.js'

export class GetTransactionsByUserIdController {
   constructor(getTransactionsByUserIdService) {
      this.getTransactionsByUserIdService = getTransactionsByUserIdService
   }

   async execute(httpRequest) {
      try {
         const userId = httpRequest.query.userId

         if (!userId) return requiredFieldIsMissingResponse('userId')

         const userIdIsValid = checkIfIdIsValid(userId)

         if (!userIdIsValid) return invalidIdResponse()

         const transactions = await this.getTransactionsByUserIdService.execute({
               userId,
         })

         return ok(transactions)
      } catch (error) {
         console.error(error)

         if (error instanceof UserNotFoundError) return userNotFoundResponse()

         return serverError()
      }
   }
}
