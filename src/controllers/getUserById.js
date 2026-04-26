import { badRequest, notFound, ok } from './helpers/http.js'
import { GetUserByIdService } from '../service/getUserById.js'
import validator from 'validator'
import { invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
   async execute(httpRequest) {
      try {
         const isValidId = validator.isUUID(httpRequest.params.userId)
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
