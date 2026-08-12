const Nav = ({ activeSection, handleNavClick, links }) => {
  const getButtonStyle = (sectionId) => ({
    cursor: 'pointer',
    padding: '5px 10px',
    color: activeSection === sectionId ? '#054239' : '#333',
    borderBottom: activeSection === sectionId ? '2px solid #054239' : '2px solid transparent',
    fontWeight: activeSection === sectionId ? 'bold' : 'normal',
  });

  return (
    <>
      <nav className="hidden md:flex md:text-[0.9rem] lg:text-[1rem] items-center gap-8">
        {links.map((link) => (
        <button 
          key={link.id} 
          onClick={() => handleNavClick(link.id)} 
          style={getButtonStyle(link.id)}
        >
          {link.name}
        </button>
      ))}
      </nav>
    </>
  );
};

export default Nav;
