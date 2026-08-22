// src/schemas/reportSchema.js
import { z } from "zod";

export const reportSchema = z.object({
  // الحقول القابلة للتحرير
  id: z.number().nullable().optional(),

  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  status: z.enum(["submitted", "in_progress", "resolved", "cancelled"]).optional(),

  priority: z.enum(["low", "normal", "high", "urgent"]).optional(),

  address: z.string().min(1, "Address is required"),

  latitude: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        (!isNaN(parseFloat(val)) && parseFloat(val) >= -90 && parseFloat(val) <= 90),
      { message: "Latitude must be a number between -90 and 90" }
    ),

  longitude: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        (!isNaN(parseFloat(val)) && parseFloat(val) >= -180 && parseFloat(val) <= 180),
      { message: "Longitude must be a number between -180 and 180" }
    ),

  public_note: z.string().optional(),

  rejection_reason: z.string().optional(),

  resolution_note: z.string().optional(),

  resolved_at: z.string().datetime().optional().nullable(),

  cancelled_at: z.string().datetime().optional().nullable(),

  // معرفات الكائنات المرتبطة (يتم اختيارها من قوائم)
  category_id: z.number().nullable().optional(),

  area_id: z.number().nullable().optional(),

  agency_id: z.number().nullable().optional(),

  reporter_id: z.number().nullable().optional(),

  // الحقول التالية للقراءة فقط ولا تظهر في النموذج:
  // reference_number, images, confirmations_count, confirmed_by_me, created_at, updated_at
});