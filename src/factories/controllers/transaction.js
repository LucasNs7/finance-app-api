import {
   CreateTransactionController,
   DeleteTransactionController,
   GetTransactionsByUserIdController,
   UpdateTransactionController,
} from '../../controllers/index.js'
import {
   CreateTransactionService,
   DeleteTransactionService,
   GetTransactionsByUserIdService,
   UpdateTransactionService,
} from '../../service/index.js'
import {
   PostgresCreateTransactionRepository,
   PostgresDeleteTransactionRepository,
   PostgresGetTransactionsByUserIdRepository,
   PostgresGetUserByIdRepository,
   PostgresUpdateTransactionRepository,
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

export const makeUpdateTransactionController = () => {
   const updateTransactionRepository = new PostgresUpdateTransactionRepository()

   const updateTransactionService = new UpdateTransactionService(
      updateTransactionRepository,
   )

   const updateTransactionController = new UpdateTransactionController(
      updateTransactionService,
   )

   return updateTransactionController
}

export const makeDeleteTransactionController = () => {
   const deleteTransactionRepository = new PostgresDeleteTransactionRepository()

   const deleteTransactionService = new DeleteTransactionService(
      deleteTransactionRepository,
   )

   const deleteTransactionController = new DeleteTransactionController(
      deleteTransactionService,
   )

   return deleteTransactionController
}
