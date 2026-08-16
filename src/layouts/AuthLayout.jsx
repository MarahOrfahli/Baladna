import { Outlet } from "react-router-dom";
import { Link } from "react-router";
import Logo from "../components/ui/Logo";
import ToggleBtn from "../components/common/ToggleBtn";
import GridShape from "../components/common/GridShape";

const AuthLayout = () => {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <Outlet />
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-basic-green dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape/>
            <div className="flex flex-col items-center max-w-md">
              <Link to="/" className="block mb-4">
                <Logo without imgSize="h-20"/>
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 ltr:right-6 rtl:left-6 sm:block">
          <ToggleBtn isTheme/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
