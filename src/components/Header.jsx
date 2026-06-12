function Header() {
  return (
    <header>
      <h1>Noah Schliesman</h1>
      <p>MSEE Research · Signal Processing · Simulation</p>
      
      {/* Updated Tagline with mixed coloring */}
      <p className="sub-tagline">
        Interested in <span className="topic">Graph Signal Processing</span>,{' '}
        <span className="topic">Dynamical Systems</span>,{' '}
        <span className="topic">Graph Learning</span>, and{' '}
        <span className="topic">Machine Learning</span>.
      </p>
    </header>
  );
}

export default Header;