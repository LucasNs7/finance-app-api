import validator from 'validator'
import { badRequest } from './index.js'

// ==> Check Section
export const checkIfIdIsValid = (id) => {
   return validator.isUUID(id)
}

export const checkIfIsString = (value) => {
   return typeof value == 'string'
}

export const checkIfSomeFieldIsNotAllowed = (params, allowedFields) => {
   return Object.keys(params).some((field) => !allowedFields.includes(field))
}

// ==> Validate Section
export const validateRequiredFields = (params, requiredFields) => {
   for (const field of requiredFields) {
      const fieldIsMissing = !params[field]

      const fieldIsEmpty =
         checkIfIsString(params[field]) &&
         validator.isEmpty(params[field], {
            ignore_whitespace: true,
         })

      if (fieldIsMissing || fieldIsEmpty) {
         return {
            missingField: field,
            ok: false,
         }
      }
   }

   return {
      ok: true,
      missingField: undefined,
   }
}

// ==> Response Section
export const invalidIdResponse = () => {
   return badRequest({
      message: 'The provided ID is not valid',
   })
}

export const requiredFieldIsMissingResponse = (missingField) => {
   return badRequest({
      message: `Missing field: ${missingField}`,
   })
}

export const someFieldIsNotAllowedResponse = () => {
   return badRequest({
      message: 'Some provided field is not allowed.',
   })
}
