import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
   checkIfEmailIsValid,
   checkIfPasswordIsValid,
   invalidEmailResponse,
   invalidPasswordResponse,
   badRequest,
   created,
   serverError,
   checkIfRequiredFieldsAreIncludes,
} from '../helpers/index.js'

export class CreateUserController {
   constructor(createUserService) {
      this.createUserService = createUserService
   }

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

         const createdUser = await this.createUserService.execute(params)

         return created(createdUser)
      } catch (error) {
         if (error instanceof EmailAlreadyInUseError)
            return badRequest({ message: error.message })

         console.log(error)
         return serverError()
      }
   }
}
