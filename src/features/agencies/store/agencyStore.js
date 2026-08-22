import { create } from "zustand";
import {
  adminGetAgencies,
  adminCreateAgency,
//   adminGetAgency,
  adminUpdateAgency,
  adminDeleteAgency
} from "../../../services";

export const useAgencyStore = create((set) => ({
  agencies: [],
  length: 0,
  loading: false,
  error: null,

  fetchAgencies: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminGetAgencies(params);
      const payload = Array.isArray(response) ? response : response.data;
      const agency = Array.isArray(payload) ? payload : payload?.data || [];
      const total =
        response.total ??
        response.meta?.total ??
        response.pagination?.total ??
        payload?.total ??
        payload?.meta?.total ??
        agency.length;
      set({ agencies: agency, length: total });
    } catch (err) {
      set({ error: err.message, loading: false });
    } finally {
      set({ loading: false })
    }
  },

  addAgency: async (agencyData) => {
    set({ loading: true, error: null });
    try {
      const newAgency = await adminCreateAgency(agencyData);
      set((state) => ({
        agencies: [...state.agencies, newAgency],
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateAgency: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedAgency = await adminUpdateAgency(id, updatedData);
      set((state) => ({
        agencies: state.agencies.map((agency) => (agency.id === id ? updatedAgency : agency)),
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteAgency: async (id) => {
    set({ loading: true, error: null });
    try {
      await adminDeleteAgency(id);
      set((state) => ({
        agencies: state.agencies.filter((agency) => agency.id !== id),
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));
