import {
   PostgresGetUserByIdRepository,
   PostgresCreateUserRepository,
   PostgresUpdateUserRepository,
   PostgresDeleteUserRepository,
   PostgresGetUserByEmailRepository,
} from '../../repository/postgres/index.js'
import {
   GetUserByIdService,
   CreateUserService,
   DeleteUserService,
   UpdateUserService,
} from '../../service/index.js'
import {
   CreateUserController,
   DeleteUserController,
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
   const postgresCreateUserRepository = new PostgresCreateUserRepository()
   
   const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()

   const createUserService = new CreateUserService(
      postgresGetUserByEmailRepository,
      postgresCreateUserRepository,
   )

   const createUserController = new CreateUserController(createUserService)

   return createUserController
}

export const makeUpdateUserController = () => {
   const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()

   const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

   const updateUserService = new UpdateUserService(
      postgresGetUserByEmailRepository,
      postgresUpdateUserRepository,
   )

   const updateUserController = new UpdateUserController(updateUserService)

   return updateUserController
}

export const makeDeleteUserController = () => {
   const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

   const deleteUserService = new DeleteUserService(postgresDeleteUserRepository)

   const deleteUserController = new DeleteUserController(deleteUserService)

   return deleteUserController
}
