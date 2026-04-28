import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const invalidPasswordResponse = () =>
   badRequest({
      message: 'Password must be least 6 characters',
   })

export const invalidEmailResponse = () =>
   badRequest({
      message: 'Invalid Email. Please provide a valid one!',
   })

export const userNotFoundResponse = () =>
   notFound({
      message: 'User not found',
   })
