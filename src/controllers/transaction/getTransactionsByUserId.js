import { UserNotFoundError } from '../../errors/user.js'
import { serverError, userNotFoundResponse } from '../index.js'

export class GetTransactionsByUserIdController {
   constructor(getTransactionByUserIdService) {
      this.getTransactionByUserIdService = getTransactionByUserIdService
   }

   async execute(httpRequest) {
      try {
         const params = httpRequest.body
      } catch (error) {
         console.error(error)
         if (error instanceof UserNotFoundError) return userNotFoundResponse()
         return serverError()
      }
   }
}
