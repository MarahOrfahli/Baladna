// src/schemas/userSchema.js
import { z } from "zod";

export const userSchema = z.object({
  id: z.number().nullable().optional(),

  name: z
    .string()
    .min(1, "Full name is required"),

  email: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address format"),

  role: z
    .string()
    .min(1, "Job role is required"),

  phone: z
    .string()
    .optional(),

  agency: z
    .string()
    .optional(),

  is_active: z
    .boolean(),

  area: z
    .string()
    .optional(),
});
