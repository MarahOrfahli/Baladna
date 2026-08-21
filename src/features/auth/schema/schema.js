import {emailSchema , passwordSchema} from '../../../utils/validation/Validators' 
import { z } from "zod";

export const loginSchema = z.object({
  email: emailSchema(),
  password: passwordSchema(),
  keepLoggedIn: z.boolean().optional().default(false),
});