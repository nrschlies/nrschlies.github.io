import { useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Overview from './sections/Overview';
import Reading from './sections/Reading';
import Projects from './sections/Projects';
import Simulations from './sections/Simulations';
import './App.css';

function App() {
  const [section, setSection] = useState('overview');

  let content;
  if (section === 'overview') content = <Overview />;
  else if (section === 'reading') content = <Reading />;
  else if (section === 'projects') content = <Projects />;
  else if (section === 'simulations') content = <Simulations />;

  return (
    <>
      {/* Sticky Wrapper */}
      <div className="top-bar-container">
        <div className="top-bar-inner">
          <Header />
          <Nav onSelect={setSection} activeSection={section} />
        </div>
      </div>

      <main>
        {/* The Glass Panel Wrapper */}
        <div className="glass-panel">
          {content}
        </div>
      </main>
    </>
  );
}

export default App;