import React, { useState } from 'react';
import readingList from '../data/readingList.json';
import ReviewDetail from './ReviewDetail'; // Import the new component

// Sort chronologically by the year in each paper's `date` (oldest first),
// so the list order is driven by the data, not the JSON ordering.
const yearOf = (d) => parseInt(String(d).match(/\d{4}/)?.[0] ?? '0', 10);
const sortedReadingList = [...readingList].sort((a, b) => yearOf(a.date) - yearOf(b.date));

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
        Curated collection of research papers and comprehensive reviews. Each paper includes detailed analysis and annotations.
      </p>

      <div className="reading-grid">
        {sortedReadingList.map((paper) => (
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