import React, { useState } from 'react';
import readingList from '../data/readingList.json';
import ReviewDetail from './ReviewDetail'; // Import the new component

function Reading() {
  const [selectedPaper, setSelectedPaper] = useState(null);

  // If a paper is selected, show the Detail View
  if (selectedPaper) {
    return (
      <section className="reading-section">
        <ReviewDetail 
          paper={selectedPaper} 
          onBack={() => setSelectedPaper(null)} 
        />
      </section>
    );
  }

  // Otherwise, show the List View
  return (
    <section className="reading-section">
      <h2>Reading & Reviews</h2>
      <p className="section-intro">
        Discography of research papers I recommend. This site is currently under a major overhaul. Readings will be ported in the coming weeks.
      </p>

      <div className="reading-grid">
        {readingList.map((paper) => (
          <article 
            key={paper.id} 
            className="paper-stub" 
            onClick={() => setSelectedPaper(paper)} // Set state on click
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedPaper(paper);
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