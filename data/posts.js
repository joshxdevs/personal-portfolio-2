/* ============================================================
   DATA — Blog Posts Index
   ============================================================
   To publish a new post:
     1. Create the markdown file:  writing/posts/{slug}.md
     2. Add an entry here with the same slug.
   Posts are displayed in the order listed (newest first).
   ============================================================ */

window.POSTS = [
  {
    slug:     'invisible-ui-details',
    title:    'The invisible details that make great UIs feel alive',
    date:     'Apr 2025',
    readTime: '5 min read',
    excerpt:  "The difference between a UI that feels alive and one that feels mechanical isn't the feature set — it's the 40ms transitions nobody notices until they're gone.",
  },
  {
    slug:     'why-i-stopped-using-ui-libraries',
    title:    'Why I stopped using UI libraries and what I learned',
    date:     'Feb 2025',
    readTime: '8 min read',
    excerpt:  'Two years of reaching for component libraries by default, then building from scratch once — and realising what I had been quietly trading away.',
  },
];
