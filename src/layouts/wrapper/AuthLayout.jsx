import { Outlet } from "react-router-dom";
import { ToggleBtn } from "../../components/common";
import SplashScreen from "../../pages/public/auth/SplashScreen";
import AuthCard from "../../pages/public/auth/AuthCard";

const AuthLayout = () => {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <AuthCard>
          <Outlet />
        </AuthCard>
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-basic-green dark:bg-white/5 lg:grid">
          <SplashScreen />
        </div>
        <div className="fixed z-50 hidden bottom-6 ltr:right-6 rtl:left-6 sm:block">
          <ToggleBtn isTheme />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
