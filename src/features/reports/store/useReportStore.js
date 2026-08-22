import { create } from "zustand";
import {
  // Admin
  assignReportToEmployee,
  // Employee
  getEmployeeReports,
  getEmployeeReport,
  updateReportStatus,
  addPublicNote,
  // Citizen
  createReport,
  getReport,
  updateReport,
  cancelReport,
  getMyReports,
  uploadReportImages,
  deleteReportImage,
  confirmReport,
  unconfirmReport,
  getReportHistory,
  submitReview,
  // Anonymous
  createAnonymousReport,
  // public
  getReports
} from "../../../services";

export const UseReportStore = create((set) => ({
  reports: [],
  report: {},
  meta: {},
  selectedReportId: null,
  isLoading: false,

    fetchReports: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await getReports(params);
      const payload = Array.isArray(response) ? response : response.data;
      const tempData = Array.isArray(payload) ? payload : payload?.data || [];
      const total =
        response.total ??
        response.meta?.total ??
        response.pagination?.total ??
        payload?.total ??
        payload?.meta?.total ??
        tempData.length;

        const flattenedData = tempData.map((item) => ({
        ...item,
        category: item.category?.name || "—",
        is_assigned: item.assigned_employee?.id ? true : false 
      }));

      set({ reports: flattenedData, length: total });
    } catch (err) {
      set({ error: err.message, loading: false });
    } finally {
      set({ loading: false })
    }
  },


}));
