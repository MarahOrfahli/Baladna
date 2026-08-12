import { create } from "zustand";
import { getData } from "../services/APIHandling";
import { API_ENDPOINTS_PUPLIC } from "../services/api/EndpointsPuplic";

const useStatusStore = create((set) => ({

  status: [],
  details: { number: 0, icon: null, type: "" },
  isLoading: false,
  error: null,

  fetchStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const temp_status = [];
      const response = await getData(API_ENDPOINTS_PUPLIC.Website.STATUS);
      temp_status.push({
        number: response.data.resolved_reports,
        type: "resolved_reports",
        des: 'landing_page.divider_section.resolved_description'
      });
      temp_status.push({
        number: response.data.pending_reports,
        type: "pending_reports",
        des: 'landing_page.divider_section.pending_description'
      });
      temp_status.push({
        number: response.data.active_areas,
        type: "active_areas",
        des: 'landing_page.divider_section.areas_description'
      });
      temp_status.push({
        number: response.data.active_agencies,
        type: "active_agencies",
        des: 'landing_page.divider_section.agencies_description'
      });

      set({ status: temp_status, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useStatusStore;
