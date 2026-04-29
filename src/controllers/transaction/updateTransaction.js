import {
   badRequest,
   checkIfAmountIsValid,
   checkIfIdIsValid,
   checkIfTypeIsValid,
   invalidAmountResponse,
   invalidIdResponse,
   invalidTypeResponse,
   ok,
   serverError,
} from '../helpers/index.js'

export class UpdateTransactionController {
   constructor(updateTransactionService) {
      this.updateTransactionService = updateTransactionService
   }

   async execute(httpRequest) {
      try {
         const transactionId = httpRequest.params.transactionId

         const transactionIdIsValid = checkIfIdIsValid(transactionId)

         if (!transactionIdIsValid) {
            return invalidIdResponse()
         }

         const updateParams = httpRequest.body

         const allowedFields = ['name', 'date', 'amount', 'type']

         const someFieldIsNotAllowed = Object.keys(updateParams).some(
            (field) => !allowedFields.includes(field),
         )

         if (someFieldIsNotAllowed) {
            return badRequest({
               message: 'Some provided field is not allowed.',
            })
         }

         if (updateParams.amount) {
            const amountIsValid = checkIfAmountIsValid(updateParams.amount)

            if (!amountIsValid) {
               return invalidAmountResponse()
            }
         }

         if (updateParams.type) {
            const typeIsValid = checkIfTypeIsValid(updateParams.type)

            if (!typeIsValid) {
               return invalidTypeResponse()
            }
         }

         const transaction = await this.updateTransactionService.execute(
            transactionId,
            updateParams,
         )

         return ok(transaction)
      } catch (error) {
         console.log(error)
         return serverError()
      }
   }
}
