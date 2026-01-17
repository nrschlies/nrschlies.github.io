import headshot from '../assets/headshot.jpg';

function Overview() {
  return (
    <section>
      <div className="headshot-container">
        <img src={headshot} alt="Noah Schliesman" className="headshot" />
      </div>
      <h2>Overview</h2>
      <p>
        I'm Noah Schliesman, a MSEE student at SDSU aiming to specialize in Signal Processing. 
        I recently graduated from the University of San Diego in EE with minors in Computer Science and Math.
      </p>
      <p>
        I currently work as a Data Annotator for Data Annotation, where I perform audits of major LLM 
        responses for complex topics in mathematics, computer science, and other STEM fields.
      </p>
    </section>
  );
}

export default Overview;