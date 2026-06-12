import React, { useState, useEffect } from 'react';

export default function ReviewContent7() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch('/review-content/review7.json')
      .then(res => res.json())
      .then(data => setHtml(data.html))
      .catch(() => setHtml('<p>Content loading...</p>'));
  }, []);

  return (
    <div className="review-text-content">
      <div dangerouslySetInnerHTML={ __html: html } />
    </div>
  );
}
