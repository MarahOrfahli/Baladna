// src/store/reportFormStore.js
import { create } from "zustand";

const defaultValues = {
  id: null,
  title: "",
  description: "",
  status: "submitted",
  priority: "normal",
  address: "",
  latitude: "",
  longitude: "",
  public_note: "",
  rejection_reason: "",
  resolution_note: "",
  resolved_at: null,
  cancelled_at: null,
  category_id: null,
  area_id: null,
  agency_id: null,
  reporter_id: null,
};

export const useReportFormStore = create((set) => ({
  defaultValues,
  isSubmitting: false,
  submitError: null,

  setDefaultValues: (newDefaults) => set({ defaultValues: newDefaults }),

  setSubmitting: (status) => set({ isSubmitting: status }),

  setSubmitError: (error) => set({ submitError: error }),

  resetStore: () =>
    set({
      defaultValues,
      isSubmitting: false,
      submitError: null,
    }),
}));