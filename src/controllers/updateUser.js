import validator from 'validator'
import { badRequest, ok, serverError } from './helpers.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserService } from '../service/updateUser.js'

export class UpdateUserController {
   async execute(httpRequest) {
      try {
         const userId = httpRequest.params.userId

         const isValidId = validator.isUUID(httpRequest.params.userId)
         if (!isValidId) {
            return badRequest({
               message: 'The provided ID is not valid',
            })
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
            if (updateParams.password.length < 6) {
               return badRequest({
                  message: 'Password must be at least 6 characters',
               })
            }
         }

         if (updateParams.email) {
            const emailIsNotValid = validator.isEmail(updateParams.email)

            if (!emailIsNotValid) {
               return badRequest({
                  message: 'Invalid Email. Please provide a valid one!',
               })
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
