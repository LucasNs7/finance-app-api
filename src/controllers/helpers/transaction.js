import validator from 'validator'
import { badRequest } from './index.js'

// ==> Check Section
export const checkIfTypeIsValid = (type) => {
   return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const checkIfAmountIsValid = (amount) => {
   return validator.isCurrency(amount.toString(), {
      digits_after_decimal: [2],
      allow_negatives: false,
      decimal_separator: '.',
   })
}

// ==> Response Section
export const invalidAmountResponse = () => {
   return badRequest({
      message: 'The amount must be a valid currency.',
   })
}

export const invalidTypeResponse = () => {
   return badRequest({
      message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
   })
}