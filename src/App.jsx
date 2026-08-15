import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="rtl:font-arabic ltr:font-english width">
      <Outlet />
    </div>
  );
};

export default App;
