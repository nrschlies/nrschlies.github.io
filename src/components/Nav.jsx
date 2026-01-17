function Nav({ onSelect }) {
  return (
    <nav>
      <button onClick={() => onSelect('overview')}>Overview</button>
      <button onClick={() => onSelect('reading')}>Reading</button>
      <button onClick={() => onSelect('projects')}>Projects</button>
      <button onClick={() => onSelect('simulations')}>Simulations</button>
    </nav>
  );
}

export default Nav;