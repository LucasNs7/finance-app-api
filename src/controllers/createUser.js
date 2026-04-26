import { CreateUserService } from '../service/createUser.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserController {
   async execute(httpRequest) {
      try {
         const params = httpRequest.body

         const requiredFields = ['first_name', 'last_name', 'email', 'password']

         for (const field of requiredFields) {
            if (!params[field] || params[field].trim().length == 0) {
               return badRequest({
                  message: `Missing param: ${field}`,
               })
            }
         }

         if (params.password.length < 6) {
            return badRequest({
               message: 'Password must be at least 6 characters',
            })
         }

         const emailIsNotValid = validator.isEmail(params.email)

         if (!emailIsNotValid) {
            return badRequest({
               message: 'Invalid Email. Please provide a valid one!',
            })
         }

         const createUserService = new CreateUserService()
         const createdUser = await createUserService.execute(params)

         return created(createdUser)
      } catch (error) {
         if (error instanceof EmailAlreadyInUseError)
            return badRequest({ message: error.message })

         console.log(error)
         return serverError()
      }
   }
}
