import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserService } from '../service/index.js'
import {
   checkIfEmailIsValid,
   checkIfIdIsValid,
   invalidEmailResponse,
   invalidIdResponse,
   invalidPasswordResponse,
   badRequest,
   ok,
   serverError,
} from './helpers/index.js'

export class UpdateUserController {
   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const isValidId = checkIfIdIsValid(userId)
         if (!isValidId) {
            return invalidIdResponse()
         }

         const updateParams = httpRequest.body

         const allowedFields = ['first_name', 'last_name', 'email', 'password']

         const someFieldIsNotAllowed = Object.keys(updateParams).some(
            (field) => !allowedFields.includes(field),
         )

         if (someFieldIsNotAllowed) {
            return badRequest({
               message: 'Some provided field is not allowed.',
            })
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

         const updateUserService = new UpdateUserService()

         const updateUser = await updateUserService.execute(
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
