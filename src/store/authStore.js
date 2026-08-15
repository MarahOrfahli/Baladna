import { create } from "zustand";
import { postData } from "../services/APIHandling";
import { API_ENDPOINTS_PUPLIC } from "../services/api/EndpointsPuplic";


export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  // دالة تسجيل الدخول
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await postData(API_ENDPOINTS_PUPLIC.Login, credentials);
      const { token, user } = response.data;
      const role = user.role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('email', credentials.email);
      localStorage.setItem('password', credentials.password)

      set({
        token,
        user,
        role,
        isAuthenticated: true,
        loading: false,
      });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول',
        loading: false,
      });
      return false;
    }
  },

  // دالة تسجيل الخروج
  logout: async () => {
    try {
      await postData(API_ENDPOINTS_PUPLIC.Logout)
    } catch (err) {
      console.error('Logout error on server:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      set({
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },
}));
