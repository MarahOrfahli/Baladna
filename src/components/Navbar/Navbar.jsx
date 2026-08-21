import { Button } from "../ui";

const Nav = ({ activeSection, handleNavClick, sectionsLinks }) => {
  const getButtonClasses = (sectionId) => {
    return activeSection === sectionId
      ? `text-basic-green border-b-2 border-basic-green dark:text-basic-green-gray dark:border-basic-green-gray font-bold`
      : ` `;
  };

  return (
    <nav className="hidden md:flex md:text-[0.9rem] lg:text-[1rem] items-center gap-8 dark:text-white ">
      {sectionsLinks.map((link) => (
        <Button
          key={link.id}
          fn={() => handleNavClick(link.id)}
          content={link.name}
          className={`py-1.5 px-2.5` + ` ` + getButtonClasses(link.id)}
        />
      ))}
    </nav>
  );
};

export default Nav;
