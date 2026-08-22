import {emailSchema , passwordSchema,
  confirmPasswordSchema,
  phoneSchema,
  termsSchema,
  usernameSchema,
  passwordsMatch,
  MESSAGES,
} from '../../../utils/' 
import { z } from "zod";

export const loginSchema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
  keepLoggedIn: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    name: usernameSchema({ min: 3 }),
    email: emailSchema(),
    password: passwordSchema({ min: 8 }),
    confirmPassword: confirmPasswordSchema,
    phone: phoneSchema,
    terms: termsSchema,
  })
  .refine((data) => passwordsMatch(data), {
    message: MESSAGES.confirmPassword.mismatch,
    path: ['confirmPassword'],
  });