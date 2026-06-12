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

/* Layered folder artwork: back panel, documents peeking out, front panel.
   All colors come from the category CSS variables so each folder tints itself. */
function FolderArt() {
  return (
    <svg
      className="folder-art"
      viewBox="0 0 64 56"
      width="92"
      height="80"
      fill="none"
      aria-hidden="true"
    >
      {/* documents peeking out of the folder */}
      <rect x="17" y="4" width="22" height="18" rx="2.5"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
      <rect x="25" y="1" width="22" height="18" rx="2.5" transform="rotate(4 36 10)"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" />
      {/* folder back panel with tab */}
      <path
        d="M5 16a4 4 0 0 1 4-4h12.2a4 4 0 0 1 2.8 1.2l3.1 3.1a4 4 0 0 0 2.8 1.2H55a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"
        fill="rgba(255,255,255,0.03)"
        stroke="var(--cat)"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      {/* folder front panel */}
      <path
        d="M3.6 25h56.8a3 3 0 0 1 2.9 3.7l-4.1 19.2a4 4 0 0 1-3.9 3.1H8.7a4 4 0 0 1-3.9-3.1L.7 28.7A3 3 0 0 1 3.6 25z"
        fill="var(--cat-dim)"
        stroke="var(--cat)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FolderGlyph() {
  return (
    <svg className="folder-icon" viewBox="0 0 24 24" width="20" height="20"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7.5a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6l1 1a2 2 0 0 0 1.4.6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

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
  const [openFolderName, setOpenFolderName] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const openFolder = folders.find((f) => f.name === openFolderName) || null;

  // Level 3: a paper is open — show its review (back returns to the folder).
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

  // Level 2: a folder is open — show its papers.
  if (openFolder) {
    return (
      <section className="reading-section">
        <div className={`folder-contents ${openFolder.className}`}>
          <button className="back-button" onClick={() => setOpenFolderName(null)}>
            &larr; All Folders
          </button>

          <div className="folder-header">
            <FolderGlyph />
            <h3 className="folder-title">{openFolder.name}</h3>
            <span className="folder-count">{openFolder.papers.length}</span>
            <span className="folder-blurb">{openFolder.blurb}</span>
          </div>

          <div className="reading-grid">
            {openFolder.papers.map((paper) => (
              <PaperStub key={paper.id} paper={paper} onSelect={setSelectedPaper} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Level 1: folder picker.
  return (
    <section className="reading-section">
      <h2>Reading &amp; Reviews</h2>
      <p className="section-intro">
        Curated collection of research papers and comprehensive reviews. Open a
        folder to browse the annotated papers in that field.
      </p>

      <div className="folder-picker">
        {folders.map((folder) => (
          <button
            type="button"
            className={`folder-card ${folder.className}`}
            key={folder.name}
            onClick={() => setOpenFolderName(folder.name)}
          >
            <FolderArt />
            <h3 className="folder-name">{folder.name}</h3>
            <span className="folder-count">
              {folder.papers.length} paper{folder.papers.length === 1 ? '' : 's'}
            </span>
            <p className="folder-card-blurb">{folder.blurb}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Reading;
