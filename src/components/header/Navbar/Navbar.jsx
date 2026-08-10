import { useEffect } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";

const Nav = ({ links }) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <>
      <nav className="hidden md:flex md:text-[0.9rem] lg:text-[1rem] items-center gap-8">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            className={({ isActive }) => (isActive ? link.className : "")}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <Routes>
        {links.map((link) => (
          <Route key={link.id} path={link.to} element={link.element} />
        ))}
      </Routes>
    </>
  );
};

export default Nav;
