import 'dotenv/config.js'
import express, { response } from 'express'
import { CreateUserController } from './src/controllers/createUser.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (req, res) => {
   const createUserController = new CreateUserController()

   const { statusCode, body } = await createUserController.execute(req)

   res.status(statusCode).json(body)
})

app.listen(process.env.PORT, () =>
   console.log(`Listening on port ${process.env.PORT}`),
)
