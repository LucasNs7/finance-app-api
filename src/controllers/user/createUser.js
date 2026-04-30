import { EmailAlreadyInUseError } from '../../errors/user.js'
import { ZodError } from 'zod'
import { createUserSchema } from '../../schemas/index.js'
import {
   badRequest,
   created,
   invalidEmailResponse,
   serverError,
} from '../helpers/index.js'

export class CreateUserController {
   constructor(createUserService) {
      this.createUserService = createUserService
   }

   async execute(httpRequest) {
      try {
         const params = httpRequest.body

         await createUserSchema.parseAsync(params)

         const createdUser = await this.createUserService.execute(params)

         return created(createdUser)
      } catch (error) {
         console.error(error)

         if (error instanceof ZodError) {
            return badRequest({
               message: error.issues[0].message,
            })
         }

         if (error instanceof EmailAlreadyInUseError) {
            return badRequest({ message: error.message })
         }
         return serverError()
      }
   }
}
