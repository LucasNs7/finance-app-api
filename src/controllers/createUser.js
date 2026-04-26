import { CreateUserService } from '../service/createUser.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
   checkIfEmailIsValid,
   checkIfPasswordIsValid,
   invalidEmailResponse,
   invalidPasswordResponse,
} from './helpers/user.js'

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

         const passwordIsValid = checkIfPasswordIsValid(params.password)

         if (!passwordIsValid) {
            return invalidPasswordResponse()
         }

         const emailIsNotValid = checkIfEmailIsValid(params.email)

         if (!emailIsNotValid) {
            return invalidEmailResponse()
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
