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
        aiming to specialize in Signal Processing. 
        I recently graduated from the{' '}
        <a 
          href="https://www.sandiego.edu/engineering/undergraduate/electrical-engineering/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="highlight-link"
        >
          University of San Diego
        </a>{' '}
        in Electrical Engineering (BA/BS) with minors in Computer Science and Math.
      </p>
      <p>
        I currently work as a Data Annotator for{' '}
        <a 
          href="https://dataannotation.tech/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="highlight-link"
        >
          Data Annotation
        </a>, where I perform audits of major LLM 
        responses for complex topics in mathematics, computer science, and other STEM fields.
      </p>
    </section>
  );
}

export default Overview;