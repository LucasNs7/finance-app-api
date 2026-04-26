import { badRequest, notFound, ok } from './helpers.js'
import { GetUserByIdService } from '../service/getUserById.js'
import validator from 'validator'

export class GetUserByIdController {
   async execute(httpRequest) {
      try {
         const isValidId = validator.isUUID(httpRequest.params.userId)

         if (!isValidId) {
            return badRequest({
               message: 'The provided ID is not valid',
            })
         }

         const getUserByIdService = new GetUserByIdService()

         const user = await getUserByIdService.execute(
            httpRequest.params.userId,
         )

         return ok(user)
      } catch (error) {
         console.log(error)
         return notFound({
            message: `The user ${httpRequest.params.userId} was not found.`,
         })
      }
   }
}
