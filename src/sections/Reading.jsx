import React from 'react';
import readingList from '../data/readingList.json';

function Reading() {
  const handlePaperClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="reading-section">
      <h2>Reading & Reviews</h2>
      <p className="section-intro">
        Selected research papers and texts I am currently analyzing. 
      </p>

      <div className="reading-grid">
        {readingList.map((paper) => (
          <article 
            key={paper.id} 
            className="paper-stub" 
            onClick={() => handlePaperClick(paper.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePaperClick(paper.link);
            }}
          >
            <div className="stub-header">
              <span className="paper-tag">{paper.tag}</span>
              <span className="paper-date">{paper.date}</span>
            </div>
            
            <h3 className="paper-title">{paper.title}</h3>
            <p className="paper-authors">{paper.authors}</p>
            
            <p className="paper-summary">{paper.summary}</p>
            
            <div className="stub-footer">
              {/* Changed text to indicate this opens the source material */}
              <span className="read-more">Access Paper &rarr;</span>
              <span className="paper-venue">{paper.venue}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reading;