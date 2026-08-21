import { create } from 'zustand';

export const useModalStore = create((set) => ({
  // Add / Edit modal
  addEditOpen: false,
  editingData: null, // null means "add", object means "edit"

  // Delete confirmation modal
  deleteOpen: false,
  deleteTargetIds: [],
  deleteIsBulk: false,

  // Actions
  openAddEdit: (data = null) => set({ addEditOpen: true, editingData: data }),
  closeAddEdit: () => set({ addEditOpen: false, editingData: null }),

  openDelete: (ids, isBulk = false) =>
    set({ deleteOpen: true, deleteTargetIds: ids, deleteIsBulk: isBulk }),
  closeDelete: () =>
    set({ deleteOpen: false, deleteTargetIds: [], deleteIsBulk: false }),
}));