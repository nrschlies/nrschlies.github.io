import React, { useState } from 'react';
import readingList from '../data/readingList.json';
import ReviewDetail from './ReviewDetail';
import { CATEGORY_ORDER, CATEGORY_META, categoryOf } from '../data/categories';

// Sort chronologically by the year in each paper's `date` (oldest first).
const yearOf = (d) => parseInt(String(d).match(/\d{4}/)?.[0] ?? '0', 10);
const sortedReadingList = [...readingList].sort((a, b) => yearOf(a.date) - yearOf(b.date));

// Group the sorted papers into their category folders, preserving CATEGORY_ORDER.
const folders = CATEGORY_ORDER.map((name) => ({
  name,
  ...CATEGORY_META[name],
  papers: sortedReadingList.filter((p) => categoryOf(p) === name),
})).filter((f) => f.papers.length > 0);

const FolderIcon = () => (
  <svg
    className="folder-icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 7.5a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6l1 1a2 2 0 0 0 1.4.6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

function PaperStub({ paper, onSelect }) {
  return (
    <article
      className="paper-stub"
      onClick={() => onSelect(paper)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(paper);
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
  );
}

function Reading() {
  const [selectedPaper, setSelectedPaper] = useState(null);

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

  return (
    <section className="reading-section">
      <h2>Reading &amp; Reviews</h2>
      <p className="section-intro">
        Curated collection of research papers and comprehensive reviews, organized
        by field. Each paper includes detailed analysis and annotations.
      </p>

      <div className="reading-folders">
        {folders.map((folder) => (
          <div className={`folder ${folder.className}`} key={folder.name}>
            <div className="folder-header">
              <FolderIcon />
              <h3 className="folder-title">{folder.name}</h3>
              <span className="folder-count">{folder.papers.length}</span>
              <span className="folder-blurb">{folder.blurb}</span>
            </div>

            <div className="reading-grid">
              {folder.papers.map((paper) => (
                <PaperStub key={paper.id} paper={paper} onSelect={setSelectedPaper} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reading;
