import { create } from "zustand";
import { login, logout, register } from "../../../services";
// import { postData, ENDPOINTS } from "../../../services";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (credentials, isRemembered) => {
    set({ loading: true, error: null });
    try {
      const response = await login(credentials);
      const { success } = response;
      const { token, user } = response.data;
      if (success) {
        const role = user.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        if (isRemembered) {
          localStorage.setItem("email", credentials.email);
          localStorage.setItem("password", credentials.password);
        }

        set({
          token,
          user,
          role,
          isAuthenticated: true,
          loading: false
        });
      }

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Error While Login...",
        loading: false
      });
      return false;
    }
  },

  registering: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await register(credentials);
      const { success } = response;
      const { token, user } = response.data;
      if (success) {
        const role = user.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("password", credentials.password);

        set({
          token,
          user,
          role,
          isAuthenticated: true,
          loading: false
        });
      }

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Error While Registring..",
        loading: false
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error on server:", err);
    } finally {
      console.log("Out");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      set({
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        error: null
      });
    }
  }
}));
