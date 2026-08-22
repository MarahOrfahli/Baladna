// import { create } from "zustand";
// import {
//     // Admin
//     assignReportToEmployee,
//     // Employee
//     getEmployeeReports,
//     getEmployeeReport,
//     updateReportStatus,
//     addPublicNote,
//     // Citizen
//     createReport,
//     getReport,
//     updateReport,
//     cancelReport,
//     getMyReports,
//     uploadReportImages,
//     deleteReportImage,
//     confirmReport,
//     unconfirmReport,
//     getReportHistory,
//     submitReview,
//     // Anonymous
//     createAnonymousReport,
//     // public
//     getReports,
// } from "../../../services";


// export const useReportStore = create((set, get) => ({
//   reports: [],
//   meta: {},
//   selectedReportId: null,
//   isLoading: false,
  
//   setSelectedReportId: (id) => set({ selectedReportId: id }),
  
//   fetchReports: async (params = {}) => {
//     set({ isLoading: true });
    
//     // محاكاة تأخير الشبكة
//     await new Promise(resolve => setTimeout(resolve, 800));
//     const response = await getReports(params)
    
//     // في تطبيق حقيقي هنا سنقوم بطلب API، لكن هنا سنقوم فقط بتحديث رقم الصفحة
//     // ونعكس ترتيب البيانات فقط لإظهار تغيير في الواجهة
//     const currentReports = get().reports;
//     const shuffled = [...currentReports].sort(() => Math.random() - 0.5);

//     set((state) => ({
//       reports: shuffled,
//       meta: { ...state.meta, current_page: params.page },
//       isLoading: false,
//       selectedReportId: null // إلغاء التحديد عند تغيير الصفحة
//     }));
//   }
// }));





























// import {
//     // Admin
//     assignReportToEmployee,
//     // Employee
//     getEmployeeReports,
//     getEmployeeReport,
//     updateReportStatus,
//     addPublicNote,
//     // Citizen
//     createReport,
//     getReport,
//     updateReport,
//     cancelReport,
//     getMyReports,
//     uploadReportImages,
//     deleteReportImage,
//     confirmReport,
//     unconfirmReport,
//     getReportHistory,
//     submitReview,
//     // Anonymous
//     createAnonymousReport,
//     // public
//     getReports,


// } from "../../../services";

// export const useUserStore = create((set) => ({
//   users: [],
//   length: 0,
//   loading: false,
//   error: null,

//   fetchUsers: async (params = {}) => {
//     set({ loading: true, error: null });
//     try {
//       const response = await adminGetUsers(params);
//       const payload = Array.isArray(response) ? response : response.data;
//       const users = Array.isArray(payload) ? payload : payload?.data || [];
//       const total =
//         response.total ??
//         response.meta?.total ??
//         response.pagination?.total ??
//         payload?.total ??
//         payload?.meta?.total ??
//         users.length;
//       set({ users, length: total });
//     } catch (err) {
//       set({ error: err.message, loading: false });
//     } finally {
//       set({ loading: false })
//     }
//   },

//   addUser: async (userData) => {
//     set({ loading: true, error: null });
//     try {
//       const newUser = await adminCreateUser(userData);
//       set((state) => ({
//         users: [...state.users, newUser],
//         loading: false
//       }));
//     } catch (err) {
//       set({ error: err.message, loading: false });
//     }
//   },

//   updateUser: async (id, updatedData) => {
//     set({ loading: true, error: null });
//     try {
//       const updatedUser = await adminUpdateUser(id, updatedData);
//       set((state) => ({
//         users: state.users.map((user) => (user.id === id ? updatedUser : user)),
//         loading: false
//       }));
//     } catch (err) {
//       set({ error: err.message, loading: false });
//     }
//   },

//   deleteUser: async (id) => {
//     set({ loading: true, error: null });
//     try {
//       await adminDeleteUser(id);
//       set((state) => ({
//         users: state.users.filter((user) => user.id !== id),
//         loading: false
//       }));
//     } catch (err) {
//       set({ error: err.message, loading: false });
//     }
//   }
// }));
