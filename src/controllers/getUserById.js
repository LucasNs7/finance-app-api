import { GetUserByIdService } from '../service/index.js'
import {
   checkIfIdIsValid,
   invalidIdResponse,
   badRequest,
   notFound,
   ok,
} from './helpers/index.js'

export class GetUserByIdController {
   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const isValidId = checkIfIdIsValid(userId)
         if (!isValidId) {
            return invalidIdResponse()
         }

         const getUserByIdService = new GetUserByIdService()

         const user = await getUserByIdService.execute(
            httpRequest.params.userId,
         )

         if (!user) return notFound({ message: 'User not found' })

         return ok(user)
      } catch (error) {
         console.log(error)
         return notFound({
            message: `The user ${httpRequest.params.userId} was not found.`,
         })
      }
   }
}
