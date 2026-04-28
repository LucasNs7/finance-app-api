import { badRequest } from './index.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const checkIfRequiredFieldsAreIncludes = (requiredFields, params) => {
   // TODO: Fazer essa refatoração nos dois createUser/Transaction
}

export const invalidIdResponse = () =>
   badRequest({
      message: 'The provided ID is not valid',
   })
