import validator from 'validator'
import { badRequest, notFound } from './http.js'

// ==> Check Section
export const checkIfPasswordIsValid = (password) => { return password.length >= 6 }

export const checkIfEmailIsValid = (email) => { return validator.isEmail(email) }

// ==> Response Section
export const invalidPasswordResponse = () => {
   return badRequest({
      message: 'Password must be least 6 characters',
   })
}

export const invalidEmailResponse = () => {
   return badRequest({
      message: 'Invalid Email. Please provide a valid one!',
   })
}

export const userNotFoundResponse = () => {
   return notFound({
      message: 'User not found',
   })
}
