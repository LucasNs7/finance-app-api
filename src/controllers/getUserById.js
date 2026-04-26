import { notFound, ok } from './helpers.js'
import { GetUserByIdService } from '../service/getUserById.js'

export class GetUserByIdController {
   async execute(httpRequest) {
      try {
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
