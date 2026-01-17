function Nav({ onSelect, activeSection }) {
  const links = ['overview', 'reading', 'projects', 'simulations'];

  return (
    <nav>
      {links.map((link) => (
        <button 
          key={link}
          onClick={() => onSelect(link)}
          className={activeSection === link ? 'active' : ''}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </button>
      ))}
    </nav>
  );
}

export default Nav;