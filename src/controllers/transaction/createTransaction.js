import {
   badRequest,
   checkIfAmountIsValid,
   checkIfIdIsValid,
   checkIfRequiredFieldsAreIncludes,
   checkIfTypeIsValid,
   created,
   invalidAmountResponse,
   invalidIdResponse,
   invalidTypeResponse,
   negativeAmountResponse,
   serverError,
} from '../helpers/index.js'

export class CreateTransactionController {
   constructor(createTransactionService) {
      this.createTransactionService = createTransactionService
   }

   async execute(httpRequest) {
      try {
         const params = httpRequest.body

         const requiredFields = [
            'ID',
            'user_id',
            'name',
            'date',
            'amount',
            'type',
         ]

         for (const field of requiredFields) {
            if (!params[field] || params[field].trim().length == 0) {
               return badRequest({
                  message: `Missing param: ${field}`,
               })
            }
         }

         const userIdIsValid = checkIfIdIsValid(params.user_id)

         if (!userIdIsValid) return invalidIdResponse()

         if (params.amount <= 0) return negativeAmountResponse()

         const amountIsValid = checkIfAmountIsValid(params.amount)

         if (!amountIsValid) return invalidAmountResponse()

         const type = params.type.trim().toUpperCase()

         const typeIsValid = checkIfTypeIsValid(type)

         if (!typeIsValid) return invalidTypeResponse()

         const trasaction = await this.createTransactionService.execute({
            ...params,
            type,
         })

         return created(trasaction)
      } catch (error) {
         console.log(error)
         return serverError()
      }
   }
}
