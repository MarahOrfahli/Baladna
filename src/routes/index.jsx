/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'; //lazy,
import { createBrowserRouter } from 'react-router-dom';
// Importing Pages & Layouts...
import LoadingSpinner from '../components/ui/LoadingSpinner';
import RootBoundary from '../components/RootBoundary';
import RoleProtectedRoute from './app.config';
import App from '../App';
import Dashboard from '../pages/dashboard/Dashboard';

// Lazy Loading..
const Publiclayout = lazy(() => import('../layouts/PublicLayout') );
const Landingpage = lazy(() => import('../pages/public/landingPage/LandingPage'));
const Authlayout = lazy(() => import('../layouts/AuthLayout'));
const Adminlayout = lazy(() => import('../layouts/AdminLayout'));
const Loginpage = lazy(() => import('../pages/public/auth/Login'));
const Registerpage = lazy(() => import('../pages/public/auth/register'));

export const ROLES = {
  ADMIN: 'Admin',
  EMPLOYEE: 'Employee',
  CITIZEN: 'Citizen'
};

const spinnerElement = <LoadingSpinner center size="60px" color="#ef4444" />
const withSuspense = (Component) => (
  <Suspense fallback={spinnerElement}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/> ,
    errorElement: <RootBoundary />,
    children: [
      {
        element: withSuspense(Publiclayout),
        children: [
          { index: true, element: withSuspense(Landingpage)},
          { path: '/about', element: <Suspense fallback={spinnerElement}><div>صفحة عن الموقع العامة</div></Suspense> },    // 
        ],
      },

      {
        element: withSuspense(Authlayout),
        children: [
          { path: '/login', element: withSuspense(Loginpage)  },
          { path: '/register', element: withSuspense(Registerpage)  },
          { path: '/unauthorized', element: <div style={{ textAlign: 'center', marginTop: '5rem' }}><h2>403 - ليس لديك صلاحية لدخول هذه الصفحة!</h2></div> },
        ],
      },
      {
        element: <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            element: withSuspense(Adminlayout),
            children: [
              { path: '/dashboard', element: <Dashboard/> },
              { path: '/profile', element: <div>تعديل الملف الشخصي</div> },
            ],
          },
        ],
      },

    //   // 4. مسارات الأدمن المحمية (Admin Protected Routes)
    //   {
    //     element: <RoleProtectedRoute allowedRoles={['admin']} />,
    //     children: [
    //       {
    //         element: withSuspense(AdminLayout),
    //         children: [
    //           { path: 'admin/dashboard', element: withSuspense(AdminDashboard) },
    //           { path: 'admin/users', element: <div>شاشة التحكم بحسابات المستخدمين</div> },
    //         ],
    //       },
    //     ],
    //   },
    ],
  },
]);
