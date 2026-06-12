import React, { useEffect, useRef, useState } from 'react';

/**
 * Loads a ported article review from /public/review-content/review{id}.json
 * and renders it, then asks MathJax to typeset the LaTeX once it's ready.
 *
 * Content is fetched (not embedded) so author LaTeX with backslashes never has
 * to survive JS string escaping — the JSON file is the single source of truth.
 */
export default function ReviewArticle({ id }) {
  const ref = useRef(null);
  const [html, setHtml] = useState(null);

  // Fetch the review HTML whenever the selected article changes.
  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    fetch(`${import.meta.env.BASE_URL}review-content/review${id}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (!cancelled) setHtml(d.html); })
      .catch(() => {
        if (!cancelled) setHtml('<p><em>Review content is being ported. Check back soon.</em></p>');
      });
    return () => { cancelled = true; };
  }, [id]);

  // Typeset math after the HTML is in the DOM. MathJax loads async, so wait on
  // its startup promise (polling until the script defines it) before typesetting.
  useEffect(() => {
    if (html == null || !ref.current) return;
    const el = ref.current;
    const typeset = () => {
      if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([el]).catch(() => {});
      }
    };
    if (window.MathJax?.startup?.promise) {
      window.MathJax.startup.promise.then(typeset);
      return;
    }
    const timer = setInterval(() => {
      if (window.MathJax?.startup?.promise) {
        clearInterval(timer);
        window.MathJax.startup.promise.then(typeset);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [html]);

  if (html == null) {
    return <p className="review-loading"><em>Loading review…</em></p>;
  }
  return (
    <div
      className="review-text-content"
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
