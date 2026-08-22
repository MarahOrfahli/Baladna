import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { useMatches } from "react-router";

const AuthCard = ({ children }) => {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
    const routeData = currentRoute?.data || {};
  const { pageTitle , description , isLogin } = routeData;

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-5 pb-2 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Back to homepage
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-3 sm:mb-5">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            {pageTitle}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div>
          {children}
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                    Sign In
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
