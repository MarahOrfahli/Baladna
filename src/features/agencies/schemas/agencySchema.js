import { z } from "zod";

export const agencySchema = z.object({
  name: z
    .string()
    .min(1, "Agency name is required"),

  description: z
    .string()
    .optional(),

  email: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Invalid email address format" }
    ),

  phone: z
    .string()
    .optional(),
});