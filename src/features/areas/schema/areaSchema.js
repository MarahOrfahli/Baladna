import { z } from "zod";

export const areaSchema = z.object({
  name: z
    .string()
    .min(1, "Area name is required"),

  parent_id: z.preprocess(
    (value) => (value === "" ? null : value),
    z.number().nullable().optional()
  ),
});