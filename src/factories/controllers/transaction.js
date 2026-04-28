import { CreateTransactionController } from '../../controllers/index.js'
import { CreateTransactionService } from '../../service/index.js'
import {
   PostgresCreateTransactionRepository,
   PostgresGetUserByIdRepository,
} from '../../repository/postgres/index.js'

export const makeCreateTransactionController = () => {
   const createTransactionRepository =
      new PostgresCreateTransactionRepository()

   const getUserByIdRepository = new PostgresGetUserByIdRepository()

   const createTransactionService = new CreateTransactionService(
      createTransactionRepository,
      getUserByIdRepository,
   )

   const createTransactionController = new CreateTransactionController(
      createTransactionService,
   )

   return createTransactionController
}
