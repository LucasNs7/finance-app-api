import { UserNotFoundError } from '../../errors/user.js'
import {
   checkIfIdIsValid,
   invalidIdResponse,
   requiredFieldIsMissingResponse,
} from '../helpers/generic.js'
import { ok } from '../helpers/http.js'
import { serverError, userNotFoundResponse } from '../index.js'

export class GetTransactionsByUserIdController {
   constructor(getTransactionByUserIdService) {
      this.getTransactionByUserIdService = getTransactionByUserIdService
   }

   async execute(httpRequest) {
      try {
         const userId = httpRequest.query.userId

         if (!userId) return requiredFieldIsMissingResponse('userId')

         const userIdIsValid = checkIfIdIsValid(userId)

         if (!userIdIsValid) return invalidIdResponse()

         const transactions = this.getTransactionByUserIdService.execute({
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
