import { useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Overview from './sections/Overview';
import Reading from './sections/Reading';
import Projects from './sections/Projects';
import Simulations from './sections/Simulations';

function App() {
  const [section, setSection] = useState('overview');

  let content;
  if (section === 'overview') content = <Overview />;
  else if (section === 'reading') content = <Reading />;
  else if (section === 'projects') content = <Projects />;
  else if (section === 'simulations') content = <Simulations />;

  return (
    <>
      <Header />
      <Nav onSelect={setSection} />
      <main>{content}</main>
    </>
  );
}

export default App;