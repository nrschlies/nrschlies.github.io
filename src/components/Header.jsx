import SignalWave from './SignalWave';

function Header() {
  return (
    <header>
      {/* Animation Layer */}
      <SignalWave />
      
      {/* Content Layer */}
      <h1>Noah Schliesman</h1>
      <p>MSEE Research · Signal Processing · Simulation</p>
    </header>
  );
}

export default Header;