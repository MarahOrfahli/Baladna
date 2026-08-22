import { create } from "zustand";
import {
  adminGetUsers,
  adminCreateUser,
//   adminGetUser,
  adminUpdateUser,
  adminDeleteUser
} from "../../../services";

export const useUserStore = create((set) => ({
  users: [],
  length: 0,
  loading: false,
  error: null,

  fetchUsers: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await adminGetUsers(params);
      const payload = Array.isArray(response) ? response : response.data;
      const users = Array.isArray(payload) ? payload : payload?.data || [];
      const total =
        response.total ??
        response.meta?.total ??
        response.pagination?.total ??
        payload?.total ??
        payload?.meta?.total ??
        users.length;
      set({ users, length: total });
    } catch (err) {
      set({ error: err.message, loading: false });
    } finally {
      set({ loading: false })
    }
  },

  addUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await adminCreateUser(userData);
      set((state) => ({
        users: [...state.users, newUser],
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateUser: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await adminUpdateUser(id, updatedData);
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await adminDeleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));
