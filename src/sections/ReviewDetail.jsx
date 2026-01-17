import React from 'react';

function ReviewDetail({ paper, onBack }) {
  if (!paper) return null;

  return (
    <div className="review-detail-container">
      {/* Back Navigation */}
      <button onClick={onBack} className="back-button">
        &larr; Back to Reading List
      </button>

      <article className="review-content">
        {/* Header Metadata */}
        <header className="review-header">
          <div className="review-meta">
            <span className="paper-tag">{paper.tag}</span>
            <span className="review-date">{paper.date}</span>
          </div>
          <h2 className="review-title">{paper.title}</h2>
          <p className="review-authors">{paper.authors} &middot; {paper.venue}</p>
        </header>

        <hr className="divider" />

        {/* Action Bar */}
        <div className="review-actions">
          <a 
            href={paper.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="action-btn primary"
          >
            View Original Paper (PDF)
          </a>
        </div>

        {/* Review Body Stub */}
        <div className="review-body">
          <h3>Abstract / Summary</h3>
          <p>{paper.summary}</p>

          <h3>Notes & Analysis</h3>
          <div className="placeholder-block">
            <p><em>Review content, mathematical derivation, and simulation notes will go here...</em></p>
          </div>
        </div>
      </article>

      <style>{`
        .review-detail-container {
          animation: fadeIn 0.4s ease;
        }
        .back-button {
          background: transparent;
          border: none;
          color: var(--color-accent-blue);
          font-family: var(--font-body);
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .back-button:hover {
          text-decoration: underline;
        }
        .review-content {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }
        .review-title {
          font-size: 1.75rem;
          margin: 0.5rem 0;
          color: #fff;
        }
        .review-authors {
          color: var(--color-text-muted);
          font-style: italic;
        }
        .divider {
          border: 0;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 1.5rem 0;
        }
        .review-actions {
          margin-bottom: 2rem;
        }
        .action-btn.primary {
          display: inline-block;
          background: rgba(14, 165, 233, 0.1);
          color: var(--color-accent-blue);
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid rgba(14, 165, 233, 0.3);
          transition: all 0.2s;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .action-btn.primary:hover {
          background: rgba(14, 165, 233, 0.2);
          box-shadow: 0 0 10px rgba(14, 165, 233, 0.15);
        }
        .review-body h3 {
          color: #ddd;
          margin-top: 1.5rem;
          font-size: 1.2rem;
        }
        .review-body p {
          line-height: 1.6;
          color: var(--color-text-muted);
        }
        .placeholder-block {
          padding: 2rem;
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 8px;
          text-align: center;
          background: rgba(0,0,0,0.2);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ReviewDetail;