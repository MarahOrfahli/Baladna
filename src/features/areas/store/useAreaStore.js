import { create } from "zustand";
import {
  adminGetAreas,
  adminCreateArea,
  //adminGetArea,
  adminUpdateArea,
  adminDeleteArea
} from "../../../services";

export const useAreaStore = create((set) => ({
  areas: [],
  allAreas: [],
  length: 0,
  loading: false,
  error: null,

  fetchAllAreas: async () => {
    const response = await adminGetAreas();
    const payload = Array.isArray(response) ? response : response.data;
    set({ allAreas: payload });
  },

  fetchAreas: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminGetAreas(params);
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
        parentName: item.parent?.name || "—"
      }));

      set({ areas: flattenedData, length: total });
    } catch (err) {
      set({ error: err.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  addArea: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await adminCreateArea(data)
      set((state) => ({
        areas: [...state.areas, res.data],
        loading: false
      }));
      return res.status;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateArea: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await adminUpdateArea(id, updatedData)
      set((state) => ({
        areas: state.areas.map((area) => (area.id === id ? res.data : area)),
        loading: false
      }));
      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteArea: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await adminDeleteArea(id)
      set((state) => ({
        areas: state.areas.filter((area) => area.id !== id),
        loading: false
      }));
      return res.status;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));
