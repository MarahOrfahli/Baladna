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
  cities: [],
  allAreas: [],
  length: 0,
  loading: false,
  loadingCities: false,
  error: null,

  // Custom
  fetchAllAreas: async () => {
    const response = await adminGetAreas();
    const payload = Array.isArray(response) ? response : response.data;
    set({ allAreas: payload });
  },

  fetchCities: async () => {
    set({ loadingCities: true, error: null });
    try {
      const response = await adminGetAreas({ parent_id: '' });
      set({ cities: response.data });
    } catch (error) {
      set({ error: error.message, loadingCities: false });
    } finally {
      set({ loadingCities: false });
    }
  },

  fetchAreas: async (params = {}) => {
    console.log(params)
    set({ loading: true, error: null, areas: [] });
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
      const res = await adminCreateArea(data);
      set((state) => ({
        areas: [...state.areas, res.data.data],
        loading: false
      }));
      return res.data.success;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateArea: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await adminUpdateArea(id, updatedData);
      set((state) => ({
        areas: state.areas.map((area) =>
          area.id === id ? res.data.data : area
        ),
        loading: false
      }));
      return res.data.success;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteArea: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await adminDeleteArea(id);
      set((state) => ({
        areas: state.areas.filter((area) => area.id !== id),
        loading: false
      }));
      return res.data.status;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));
