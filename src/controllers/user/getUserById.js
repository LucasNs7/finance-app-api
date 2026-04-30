import {
   checkIfIdIsValid,
   invalidIdResponse,
   notFound,
   ok,
   serverError,
   userNotFoundResponse,
} from '../helpers/index.js'

export class GetUserByIdController {
   constructor(getUserByIdService) {
      this.getUserByIdService = getUserByIdService
   }

   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const isValidId = checkIfIdIsValid(userId)
         if (!isValidId) {
            return invalidIdResponse()
         }

         const user = await this.getUserByIdService.execute(userId)

         if (!user) return userNotFoundResponse()

         return ok(user)
      } catch (error) {
         console.log(error)
         return serverError()
      }
   }
}
