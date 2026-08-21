import { z } from "zod";
import { MESSAGES } from "./messages";

// Email Validation..
export const emailSchema = (required = true) =>
  z
    .string()
    .nonempty(MESSAGES.email.required)
    .email({ message: MESSAGES.email.invalid })
    .optional(!required);

// Password Validation..
export const passwordSchema = (options = {}) => {
  const {
    min = 8,
    requireUppercase = false, // true
    requireLowercase = false, // true
    requireNumber = false // true  
    } = options;
  let schema = z
    .string()
    .nonempty(MESSAGES.password.required)
    .min(min, { message: MESSAGES.password.minLength(min) });
  if (requireUppercase)
    schema = schema.regex(/[A-Z]/, { message: MESSAGES.password.uppercase });
  if (requireLowercase)
    schema = schema.regex(/[a-z]/, { message: MESSAGES.password.lowercase });
  if (requireNumber)
    schema = schema.regex(/[0-9]/, { message: MESSAGES.password.number });
  return schema;
};

// Password confirm Validation..
export const confirmPasswordSchema = z
  .string()
  .min(1, { message: MESSAGES.confirmPassword.required });

// Phone Validation..
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+9639[0-9]{8}$/, MESSAGES.phone.invalid)
  .refine(
    (val) => {
      const prefix = val.slice(4, 6);
      return ["93", "94", "95", "96", "98", "99"].includes(prefix);
    },
    { message: MESSAGES.phone.unsupported }
  );

// Terms Validation..
export const termsSchema = z
  .boolean()
  .refine((val) => val === true, { message: MESSAGES.terms.required });

// check if passwords match...
export const passwordsMatch = (data) => data.password === data.confirmPassword;

// export const postSchema = z.object({
//   title: z
//     .string()
//     .min(5, { message: MESSAGES })
//     .max(100, { message: MESSAGES }),
//   content: z
//     .string()
//     .min(20, { message: MESSAGES }),
//   category: z.enum(['tech', 'health', 'business'], {
//     errorMap: () => ({ message: MESSAGES }),
//   }),
//   likesThreshold: z.coerce
//     .number()
//     .min(0, { message: MESSAGES })
//     .default(0),
// });
