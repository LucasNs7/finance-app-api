import {
   checkIfIdIsValid,
   invalidIdResponse,
   ok,
   serverError,
   transactionNotFoundResponse,
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

         const deletedTransaction =
            await this.deleteTransactionService.execute(transactionId)

         if (!deletedTransaction) {
            return transactionNotFoundResponse()
         }

         return ok(deletedTransaction)
      } catch (error) {
         console.error(error)
         return serverError()
      }
   }
}
