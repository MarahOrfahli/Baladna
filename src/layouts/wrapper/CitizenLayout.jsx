import { Outlet } from "react-router-dom";
import { PublicHeader } from "../../components/header/wrapper/headers/PublicHeader";

const CitizenLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
};

export default CitizenLayout;
