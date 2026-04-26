import { DeleteUserService } from '../service/index.js'
import {
   checkIfIdIsValid,
   invalidIdResponse,
   ok,
   serverError,
} from './helpers/index.js'

export class DeleteUserController {
   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const idIsValid = checkIfIdIsValid(userId)

         if (!idIsValid) return invalidIdResponse()

         const deleteUserService = new DeleteUserService()

         const deletedUser = await deleteUserService.execute(userId)

         return ok(deletedUser)
      } catch (error) {
         console.log(error)
         serverError()
      }
   }
}
