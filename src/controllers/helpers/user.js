import validator from 'validator'
import { badRequest } from './http.js'

export const invalidPasswordResponse = () =>
   badRequest({
      message: 'Password must be least 6 characters',
   })

export const invalidEmailResponse = () =>
   badRequest({
      message: 'Invalid Email. Please provide a valid one!',
   })

export const invalidIdResponse = () =>
   badRequest({
      message: 'The provided ID is not valid',
   })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)
