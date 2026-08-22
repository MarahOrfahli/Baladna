import { create } from "zustand";
import {
	getCategories,
	getCategory,
	adminGetCategories,
	adminCreateCategory,
	adminGetCategory,
	adminUpdateCategory,
	adminDeleteCategory
} from "../../../services";

const getListData = (response) => {
	const payload = Array.isArray(response) ? response : response?.data;
	const tempData = Array.isArray(payload) ? payload : payload?.data || [];
	const length =
		response?.total ??
		response?.meta?.total ??
		response?.pagination?.total ??
		payload?.total ??
		payload?.meta?.total ??
		tempData.length;
const flattenedData = tempData.map((item) => ({
        ...item,
        agencyName: item.agency?.name || "—"
      }));

	return { categories: flattenedData, length };
};

const getEntityData = (response) => response?.data ?? response;

export const useCategoryStore = create((set) => ({
	categories: [],
	category: null,
	length: 0,
	loading: false,
	error: null,

	fetchCategories: async (params = {}) => {
		set({ loading: true, error: null });
		try {
			const response = await adminGetCategories(params);
			set(getListData(response));
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	fetchCategory: async (id) => {
		set({ loading: true, error: null });
		try {
			const response = await adminGetCategory(id);
			set({ category: getEntityData(response) });
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},
    // Public..
	fetchPublicCategories: async (params = {}) => {
		set({ loading: true, error: null });
		try {
			const response = await getCategories(params);
			set(getListData(response));
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	fetchPublicCategory: async (id) => {
		set({ loading: true, error: null });
		try {
			const response = await getCategory(id);
			set({ category: getEntityData(response) });
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	addCategory: async (categoryData) => {
		set({ loading: true, error: null });
		try {
			const response = await adminCreateCategory(categoryData);
			const newCategory = getEntityData(response);
			set((state) => ({
				categories: [...state.categories, newCategory]
			}));
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	updateCategory: async (id, updatedData) => {
		set({ loading: true, error: null });
		try {
			const response = await adminUpdateCategory(id, updatedData);
			const updatedCategory = getEntityData(response);
			set((state) => ({
				categories: state.categories.map((category) =>
					category.id === id ? updatedCategory : category
				),
				category:
					state.category?.id === id ? updatedCategory : state.category
			}));
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	deleteCategory: async (id) => {
		set({ loading: true, error: null });
		try {
			await adminDeleteCategory(id);
			set((state) => ({
				categories: state.categories.filter((category) => category.id !== id),
				category: state.category?.id === id ? null : state.category,
				length: Math.max(0, state.length - 1)
			}));
		} catch (err) {
			set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	}
}));
