import 'dotenv/config.js'
import express from 'express'
import {
   PostgresGetUserByIdRepository,
   PostgresCreateUserRepository,
   PostgresUpdateUserRepository,
   PostgresDeleteUserRepository,
   PostgresGetUserByEmailRepository,
} from './src/repository/postgres/index.js'
import {
   GetUserByIdService,
   CreateUserService,
   DeleteUserService,
   UpdateUserService,
} from './src/service/index.js'
import {
   CreateUserController,
   DeleteUserController,
   GetUserByIdController,
   UpdateUserController,
} from './src/controllers/index.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (req, res) => {
   const postgresCreateUserRepository = new PostgresCreateUserRepository()
   const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()

   const createUserService = new CreateUserService(
      postgresGetUserByEmailRepository,
      postgresCreateUserRepository,
   )

   const createUserController = new CreateUserController(createUserService)

   const { statusCode, body } = await createUserController.execute(req)

   res.status(statusCode).json(body)
})

app.get('/api/users/:userId', async (req, res) => {
   const getUserByIdRepository = new PostgresGetUserByIdRepository()

   const getUserByIdService = new GetUserByIdService(getUserByIdRepository)

   const getUserByIdController = new GetUserByIdController(getUserByIdService)

   const { statusCode, body } = await getUserByIdController.execute(req)

   res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
   const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()
   const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

   const updateUserService = new UpdateUserService(
      postgresGetUserByEmailRepository,
      postgresUpdateUserRepository,
   )

   const updateUserController = new UpdateUserController(updateUserService)

   const { statusCode, body } = await updateUserController.execute(req)

   res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
   const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

   const deleteUserService = new DeleteUserService(postgresDeleteUserRepository)

   const deleteUserController = new DeleteUserController(deleteUserService)

   const { statusCode, body } = await deleteUserController.execute(req)

   res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
   console.log(`Listening on port ${process.env.PORT}`),
)
