import { create } from "zustand";
import {
	adminGetAreaSuggestions,
	adminApproveAreaSuggestion,
	adminRejectAreaSuggestion
} from "../../../services";

const getSuggestionItems = (response) => {
	const payload = Array.isArray(response) ? response : response?.data;
	return Array.isArray(payload) ? payload : payload?.data || [];
};

export const useAreaSugStore = create((set) => ({
	areaSuggestions: [],
	loading: false,
	error: null,

	fetchAreaSuggestions: async () => {
		set({ loading: true, error: null });
		try {
			const response = await adminGetAreaSuggestions();
			set({ areaSuggestions: getSuggestionItems(response) });
			return response;
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	approveAreaSuggestion: async (areaId) => {
		set({ loading: true, error: null });
		try {
			const response = await adminApproveAreaSuggestion(areaId);
			set((state) => ({
				areaSuggestions: state.areaSuggestions.filter(
					(suggestion) => suggestion.id !== areaId
				)
			}));
			return response;
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	rejectAreaSuggestion: async (areaId) => {
		set({ loading: true, error: null });
		try {
			const response = await adminRejectAreaSuggestion(areaId);
			set((state) => ({
				areaSuggestions: state.areaSuggestions.filter(
					(suggestion) => suggestion.id !== areaId
				)
			}));
			return response;
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	}
}));
