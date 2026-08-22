import { create } from "zustand";

const defaultValues = {
  id: null,
  name: "",
  parent_id: null
};

export const useAreaFormStore = create((set) => ({
  defaultValues: defaultValues,
  isSubmitting: false,
  submitError: null,

  setDefaultValues: (newDefaults) => set({ defaultValues: newDefaults }),

  setSubmitting: (status) => set({ isSubmitting: status }),

  setSubmitError: (error) => set({ submitError: error }),

  resetStore: () =>
    set({
      defaultValues: defaultValues,
      isSubmitting: false,
      submitError: null
    })
}));
