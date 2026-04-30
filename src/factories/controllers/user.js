import {
   PostgresGetUserByIdRepository,
   PostgresCreateUserRepository,
   PostgresUpdateUserRepository,
   PostgresDeleteUserRepository,
   PostgresGetUserByEmailRepository,
   PostgresGetUserBalanceRepository,
} from '../../repository/postgres/index.js'
import {
   GetUserByIdService,
   CreateUserService,
   DeleteUserService,
   UpdateUserService,
   GetUserBalanceService,
} from '../../service/index.js'
import {
   CreateUserController,
   DeleteUserController,
   GetUserBalanceController,
   GetUserByIdController,
   UpdateUserController,
} from '../../controllers/index.js'

export const makeGetUserByIdController = () => {
   const getUserByIdRepository = new PostgresGetUserByIdRepository()

   const getUserByIdService = new GetUserByIdService(getUserByIdRepository)

   const getUserByIdController = new GetUserByIdController(getUserByIdService)

   return getUserByIdController
}

export const makeCreateUserController = () => {
   const createUserRepository = new PostgresCreateUserRepository()

   const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

   const createUserService = new CreateUserService(
      getUserByEmailRepository,
      createUserRepository,
   )

   const createUserController = new CreateUserController(createUserService)

   return createUserController
}

export const makeUpdateUserController = () => {
   const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

   const updateUserRepository = new PostgresUpdateUserRepository()

   const updateUserService = new UpdateUserService(
      getUserByEmailRepository,
      updateUserRepository,
   )

   const updateUserController = new UpdateUserController(updateUserService)

   return updateUserController
}

export const makeDeleteUserController = () => {
   const deleteUserRepository = new PostgresDeleteUserRepository()

   const deleteUserService = new DeleteUserService(deleteUserRepository)

   const deleteUserController = new DeleteUserController(deleteUserService)

   return deleteUserController
}

export const makeGetUserBalanceController = () => {
   const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
   const getUserByIdRepository = new PostgresGetUserByIdRepository()

   const getUserBalanceService = new GetUserBalanceService(
      getUserBalanceRepository,
      getUserByIdRepository,
   )

   const getUserBalanceController = new GetUserBalanceController(
      getUserBalanceService,
   )

   return getUserBalanceController
}
