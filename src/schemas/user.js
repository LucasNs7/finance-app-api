import { z } from 'zod'

export const createUserSchema = z.object({
   first_name: z
      .string('First name is required.')
      .trim()
      .min(1, 'First name too small'),
   last_name: z
      .string('Last name is required.')
      .trim()
      .min(1, 'Last name too small'),
   email: z
      .string('Email is required')
      .trim()
      .email('Please provide a valid email'),
   password: z
      .string('Password is required')
      .trim()
      .min(6, 'Please provide a valid password.'),
})
