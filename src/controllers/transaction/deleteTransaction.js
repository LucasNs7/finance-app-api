import {
   checkIfIdIsValid,
   invalidIdResponse,
   ok,
   serverError,
} from '../helpers/index.js'

export class DeleteTransactionController {
   constructor(deleteTransactionService) {
      this.deleteTransactionService = deleteTransactionService
   }

   async execute(httpRequest) {
      try {
         const transactionId = httpRequest.params.transactionId

         const idIsValid = checkIfIdIsValid(transactionId)

         if (!idIsValid) {
            return invalidIdResponse()
         }

         const transaction =
            await this.deleteTransactionService.execute(transactionId)

         return ok(transaction)
      } catch (error) {
         console.error(error)
         return serverError()
      }
   }
}
