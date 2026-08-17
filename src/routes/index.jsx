/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react"; //lazy,
import { createBrowserRouter } from "react-router-dom";

// Importing Pages & Layouts...
import { SpinnerPage } from "../components/common";

// import LoadingSpinner from '../components/common/LoadingSpinner';
import RootBoundary from "./RootBoundary";
import RoleProtectedRoute from "./app.config";
import SignInForm, {
  loader as loginLoader
} from "../features/auth/components/LoginForm";
import SignUpForm, {
  loader as registerLoader
} from "../features/auth/components/RegisterForm";
import App from "../App";

// Lazy Loading..
const Publiclayout = lazy(() => import("../layouts/PublicLayout"));
const Landingpage = lazy(
  () => import("../pages/public/landingPage/LandingPage")
);
const Authlayout = lazy(() => import("../layouts/AuthLayout"));
const Adminlayout = lazy(() => import("../layouts/AdminLayout"));

export const ROLES = {
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  CITIZEN: "Citizen"
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
        element: withSuspense(Publiclayout),
        children: [{ index: true, element: withSuspense(Landingpage) }]
      },
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
      },
      {
        element: <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            element: withSuspense(Adminlayout),
            children: [
              { path: "/dashboard", element: <>dashboard</> },
              { path: "/profile", element: <div>تعديل الملف الشخصي</div> }
            ]
          }
        ]
      }
    ]
  }
]);
