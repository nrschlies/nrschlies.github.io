import headshot from '../assets/headshot.jpg';

function Overview() {
  return (
    <section>
      <div className="headshot-container">
        <img src={headshot} alt="Noah Schliesman" className="headshot" />
      </div>
      <h2>Overview</h2>
      <p>
        I'm Noah Schliesman, a Master's student in Electrical Engineering at{' '}
        <a
          href="https://electrical.sdsu.edu/research"
          target="_blank"
          rel="noopener noreferrer"
          className="highlight-link"
        >
          San Diego State University
        </a>{' '}
        where I conduct research under the advisement of{' '}
        <strong className="highlight-link">Professor Ashrafi</strong>.{' '}
        My work focuses on graph signal processing for dynamic systems, with a particular interest in Graph Learning.
        I received my BA/BS in Electrical Engineering from the{' '}
        <a
          href="https://www.sandiego.edu/engineering/undergraduate/electrical-engineering/"
          target="_blank"
          rel="noopener noreferrer"
          className="highlight-link"
        >
          University of San Diego
        </a>{' '}
        with minors in Computer Science and Mathematics.
      </p>
    </section>
  );
}

export default Overview;