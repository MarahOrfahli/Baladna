/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react"; //lazy,
import { createBrowserRouter } from "react-router-dom";

// Importing Pages & Layouts...
import App from "../App";
import { SpinnerPage } from "../components/common";
import SignInForm, {
  loader as loginLoader
} from "../features/auth/components/LoginForm";
import SignUpForm, {
  loader as registerLoader
} from "../features/auth/components/RegisterForm";

// routers...
import RootBoundary from "./RootBoundary";
import { RoleProtectedRoute, AuthGuard, AuthRoleGuard, AuthAdminGuard } from "./app.config";
import Dashboard from "../pages/admin/Dashboard";
import { Users, Areas } from "../pages/admin";
import { Agencies } from "../pages/admin/agencies/Agencies";
import { Categories } from "../pages/admin/categories/Categories";
import { AreasSuggestions } from "../pages/admin/areas/AreaSuggestions";
import Reports from "../pages/citizen/reports/Reports";
import Community from "../pages/citizen/communities/Community";
// import { AdminReports } from "../pages/admin/reports/Reports";

// Lazy Loading..
const Publiclayout = lazy(() => import("../layouts/wrapper/PublicLayout"));
const Citizenlayout = lazy(() => import("../layouts/wrapper/CitizenLayout"));
const Landingpage = lazy(
  () => import("../pages/public/landingPage/LandingPage")
);
const startUpPage = lazy(
  () => import("../pages/citizen/myAccount/StartUpSection")
);
const Authlayout = lazy(() => import("../layouts/wrapper/AuthLayout"));
const Adminlayout = lazy(() => import("../layouts/wrapper/AdminLayout"));

export const ROLES = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  CITIZEN: "citizen"
};

const spinnerElement = <SpinnerPage center size="60px" color="#ef4444" />;
const withSuspense = (Component) => (
  <Suspense fallback={spinnerElement}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RootBoundary />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            element: withSuspense(Publiclayout),
            children: [{ index: true, element: withSuspense(Landingpage) }]
          }
        ]
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: withSuspense(Authlayout),
            children: [
              {
                path: "/login",
                element: (
                  <Suspense fallback={spinnerElement}>
                    <SignInForm />
                  </Suspense>
                ),
                loader: loginLoader
              },
              {
                path: "/register",
                element: <SignUpForm />,
                loader: registerLoader
              }
            ]
          }
        ]
      },
      {
        children: [
          {
            element: withSuspense(Adminlayout),
            children: [
              {
                element: <AuthRoleGuard />,
                children: [
                  {
                    path: "/profile",
                    element: <div>تعديل الملف الشخصي</div>
                  }
                ]
              },
              {
                element: <AuthAdminGuard />,
                children: [
                  {
                    path: "/dashboard",
                    element: <Dashboard />
                  }
                ]
              },

              {
                element: <RoleProtectedRoute allowedRoles={[ROLES.EMPLOYEE]} />,
                children: [
                  {
                    path: "/users",
                    element: <Users />
                  },
                  {
                    path: "/agencies",
                    element: <Agencies />
                  },
                  {
                    path: "/areas",
                    element: <Areas />
                  },
                  {
                    path: "/area-suggestions",
                    element: <AreasSuggestions />
                  },
                  {
                    path: "/categories",
                    element: <Categories />
                  }
                ]
              }
            ]
          }
        ]
      },
      // Employee
      {
        element: <RoleProtectedRoute allowedRoles={[ROLES.EMPLOYEE]} />,
        children: [
          { path: "/citizen-reports", element: <Reports /> },
          {
            path: "/my-area-suggestions",
            element: <>ProposeArea</> // <ProposeArea />
          },
          {
            path: "/citizen-posts",
            element: <>CommunityPosts</> // <CommunityPosts />
          },
          {
            path: "/my-tasks",
            element: <>TasksManager</> // <TasksManager />
          }
        ]
      },
      {
        element: <RoleProtectedRoute allowedRoles={[ROLES.CITIZEN]} />,
        children: [
          {
            element: withSuspense(Citizenlayout),
            children: [
              { path: "/my-account", element: withSuspense(startUpPage) },
              { path: "/reports", element: <Reports /> },
              { path: "/my-reports", element: <></> },
              { path: "/communities", element: <Community /> },
              { path: "/profile", element: <div>تعديل الملف الشخصي</div> }
            ]
          }
        ]
      }
    ]
  }
]);
