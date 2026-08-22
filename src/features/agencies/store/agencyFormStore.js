import { create } from "zustand";

const defaultValues = {
  id: null,
  name: "",
  description: "",
  email: "",
  phone: "",
  is_active: true,
};

export const useAgencyFormStore = create((set) => ({
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