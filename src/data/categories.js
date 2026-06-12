// Folder categories for the Reading section. The CSS classes (defined in
// App.css) carry the actual accent colors via CSS custom properties, so the
// palette lives in one place and both the list folders and the detail page
// stay in sync.

export const CATEGORY_ORDER = ['Machine Learning', 'Signal Processing'];

export const CATEGORY_META = {
  'Machine Learning': {
    className: 'cat-ml',
    accent: '#a78bfa', // violet
    blurb: 'Neural networks and the deep-learning lineage.',
  },
  'Signal Processing': {
    className: 'cat-sp',
    accent: '#22d3ee', // cyan
    blurb: 'Filtering, estimation, and speech/sequence modeling.',
  },
};

export const DEFAULT_CATEGORY = 'Machine Learning';

export const categoryOf = (paper) =>
  paper && CATEGORY_META[paper.category] ? paper.category : DEFAULT_CATEGORY;

export const categoryClass = (paper) => CATEGORY_META[categoryOf(paper)].className;
