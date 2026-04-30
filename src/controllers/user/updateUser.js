import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
   checkIfEmailIsValid,
   checkIfIdIsValid,
   invalidEmailResponse,
   invalidIdResponse,
   invalidPasswordResponse,
   badRequest,
   ok,
   serverError,
   someFieldIsNotAllowedResponse,
   checkIfSomeFieldIsNotAllowed,
} from '../helpers/index.js'

export class UpdateUserController {
   constructor(updateUserService) {
      this.updateUserService = updateUserService
   }

   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const isValidId = checkIfIdIsValid(userId)

         if (!isValidId) {
            return invalidIdResponse()
         }

         const updateParams = httpRequest.body

         const allowedFields = ['first_name', 'last_name', 'email', 'password']

         const someFieldIsNotAllowed = checkIfSomeFieldIsNotAllowed(
            updateParams,
            allowedFields,
         )

         if (someFieldIsNotAllowed) {
            return someFieldIsNotAllowedResponse()
         }

         if (updateParams.password) {
            const passwordIsValid = checkIfPasswordIsValid(
               updateParams.password,
            )

            if (!passwordIsValid) {
               return invalidPasswordResponse()
            }
         }

         if (updateParams.email) {
            const emailIsNotValid = checkIfEmailIsValid(updateParams.email)

            if (!emailIsNotValid) {
               return invalidEmailResponse()
            }
         }

         const updateUser = await this.updateUserService.execute(
            userId,
            updateParams,
         )

         return ok(updateUser)
      } catch (error) {
         if (error instanceof EmailAlreadyInUseError)
            return badRequest({ message: error.message })

         console.log(error)
         return serverError()
      }
   }
}
