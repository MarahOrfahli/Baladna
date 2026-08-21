import { Link } from "react-router";
import { Logo } from "../common";

export const SidebarLogo = ({ isVisible }) => {

  return (
    <div
      className={`flex ${
        !isVisible ? "lg:justify-center" : "justify-start"
      }`}
    >
      <Link to={ "/dashboard"}>
        {isVisible && (
          <Logo without/>
        )}
      </Link>
    </div>
  );
};