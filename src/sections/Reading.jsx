import React from 'react';

// You can eventually move this data to a separate JSON file or database
const reviews = [
  {
    id: 1,
    title: "The Emerging Field of Signal Processing on Graphs",
    authors: "Shuman, Narang, Frossard, et al.",
    venue: "IEEE Signal Processing Magazine",
    date: "May 2013",
    tag: "GSP",
    summary: "A foundational overview of GSP extending classical discrete signal processing to irregular domains represented by graphs."
  },
  {
    id: 2,
    title: "Koopman Operator Theoretic Framework",
    authors: "Mezić, I.",
    venue: "Nonlinear Dynamics",
    date: "2019",
    tag: "Dynamical Systems",
    summary: "Analyzing nonlinear dynamical systems using the infinite-dimensional linear Koopman operator to predict system evolution."
  },
  {
    id: 3,
    title: "Geometric Deep Learning: Grids, Groups, Graphs",
    authors: "Bronstein, Bruna, LeCun, et al.",
    venue: "ArXiv",
    date: "2021",
    tag: "ML / Geometry",
    summary: "Unifying convolution and recurrence in neural networks through the lens of symmetry and geometric priors."
  }
];

function Reading() {
  return (
    <section className="reading-section">
      <h2>Reading & Reviews</h2>
      <p className="section-intro">
        Selected research papers and texts I am currently analyzing. 
        Click a stub to read my full notes and implementation details.
      </p>

      <div className="reading-grid">
        {reviews.map((paper) => (
          <article key={paper.id} className="paper-stub" onClick={() => console.log(`Open review for ${paper.id}`)}>
            <div className="stub-header">
              <span className="paper-tag">{paper.tag}</span>
              <span className="paper-date">{paper.date}</span>
            </div>
            
            <h3 className="paper-title">{paper.title}</h3>
            <p className="paper-authors">{paper.authors}</p>
            
            {/* The summary is clamped to keep height small */}
            <p className="paper-summary">{paper.summary}</p>
            
            <div className="stub-footer">
              <span className="read-more">Read Review &rarr;</span>
              <span className="paper-venue">{paper.venue}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reading;