import {
   CreateTransactionController,
   GetTransactionsByUserIdController,
} from '../../controllers/index.js'
import {
   CreateTransactionService,
   GetTransactionsByUserIdService,
} from '../../service/index.js'
import {
   PostgresCreateTransactionRepository,
   PostgresGetTransactionsByUserIdRepository,
   PostgresGetUserByIdRepository,
} from '../../repository/postgres/index.js'

export const makeCreateTransactionController = () => {
   const createTransactionRepository = new PostgresCreateTransactionRepository()

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

export const makeGetTransactionsByUserIdController = () => {
   const getTransactionsByUserIdRepository =
      new PostgresGetTransactionsByUserIdRepository()

   const getUserByIdRepository = new PostgresGetUserByIdRepository()

   const getTransactionsByUserIdService = new GetTransactionsByUserIdService(
      getTransactionsByUserIdRepository,
      getUserByIdRepository,
   )

   const getTransactionsByUserIdController =
      new GetTransactionsByUserIdController(getTransactionsByUserIdService)

   return getTransactionsByUserIdController
}
