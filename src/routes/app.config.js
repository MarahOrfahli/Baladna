import { lazy } from 'react';

// تعريف الأدوار
export const ROLES = {
  ADMIN: 'Admin',
  EMPLOYEE: 'Employee',
  CITIZEN: 'Citizen'
};

// تعريف الصفحات بالتحميل الكسول
const Dashboard = lazy(() => import('../pages/shared/Dashboard'));
const ManageArticles = lazy(() => import('../pages/editor/ManageArticles'));
const AdminSettings = lazy(() => import('../pages/admin/Settings'));

// المصفوفة الموحدة للنظام بالكامل
export const appAppRoutesConfig = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.USER],
    showInSidebar: true,
    title: 'الرئيسية',
    icon: '📊'
  },
  {
    path: '/editor/articles',
    element: <ManageArticles />,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    showInSidebar: true,
    title: 'إدارة المقالات',
    icon: '📝'
  },
  {
    path: '/admin/settings',
    element: <AdminSettings />,
    roles: [ROLES.ADMIN],
    showInSidebar: true,
    title: 'إعدادات النظام',
    icon: '⚙️'
  }
];



// // src/routes/RoleProtectedRoute.jsx
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';

// const RoleProtectedRoute = ({ allowedRoles }) => {
//   const { isAuthenticated, role } = useAuthStore();

//   if (!isAuthenticated) {
//     // إذا لم يسجل دخوله، يتم تحويله لصفحة تسجيل الدخول
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     // إذا كان مسجل دخوله ولكن لا يملك الصلاحية (مثلاً مستخدم عادي يحاول دخول صفحة الأدمن)
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // إذا كان كل شيء تماماً، يتم عرض المكونات الفرعية (المسارات التابعة)
//   return <Outlet />;
// };

// export default RoleProtectedRoute;
