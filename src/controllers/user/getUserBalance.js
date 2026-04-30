import { UserNotFoundError } from '../../errors/user.js'
import {
   checkIfIdIsValid,
   invalidIdResponse,
   ok,
   serverError,
   userNotFoundResponse,
} from '../helpers/index.js'

export class GetUserBalanceController {
   constructor(getUserBalanceService) {
      this.getUserBalanceService = getUserBalanceService
   }

   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const userIdIsValid = checkIfIdIsValid(userId)

         if (!userIdIsValid) {
            return invalidIdResponse()
         }

         const balance = await this.getUserBalanceService.execute({ userId })

         return ok(balance)
      } catch (error) {
         console.error(error)

         if (error instanceof UserNotFoundError) {
            return userNotFoundResponse()
         }

         return serverError()
      }
   }
}
