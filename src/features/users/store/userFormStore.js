import { create } from "zustand";

const defaultValues = {
  id: null,
  name: "",
  email: "",
  role: "",
  phone: "",
  agency: "",
  is_active: false,
  area: "",
};

export const useFormStore = create((set) => ({
  defaultValues: defaultValues,
  isSubmitting: false,
  submitError: null,

  // (Actions)
  setDefaultValues: (newDefaults) => set({ defaultValues: newDefaults }),

  setSubmitting: (status) => set({ isSubmitting: status }),

  setSubmitError: (error) => set({ submitError: error }),

  resetStore: () =>
    set({
      defaultValues: defaultValues,
      isSubmitting: false,
      submitError: null,
    }),
}));