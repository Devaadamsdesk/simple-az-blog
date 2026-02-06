import { Post, Author, PostFormData } from '@/types/blog';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initial sample posts
const samplePosts: Post[] = [
  new Post(
    'post-1',
    'A Critique of a Website\'s Responsiveness: Analyzing Layout Across Three Screen Sizes',
    `A truly responsive website behaves differently on desktop, tablet, and mobile.

A website may look perfect on desktop yet fail completely on mobile. True responsiveness is revealed through testing across multiple screen sizes.

On desktop, layouts often appear polished. On tablets, spacing issues emerge. On mobile, navigation and content hierarchy are frequently exposed as weak.

A responsive website:

Reorders content intelligently

Adjusts spacing and typography

Optimizes touch targets

Preserves hierarchy across breakpoints

Responsive design is not about resizing, it's about redesigning thoughtfully for each context.`,
    new Author('Azeez Adams'),
    new Date('2026-02-06')
  ),
  new Post(
    'post-2',
    'Accessibility in Markup: How Semantic HTML Helps Create Inclusive Websites',
    `Accessibility begins with HTML, not JavaScript or ARIA attributes.

Semantic HTML plays a major role in web accessibility. Assistive technologies rely on meaningful markup to guide users through content.

It communicates meaning to assistive technologies such as screen readers and keyboard navigation tools. Using proper elements ensures content is usable by people with disabilities.

Accessible markup:

Improves SEO

Enhances usability for all users

Reduces legal and compliance risks

Encourages cleaner architecture

Replacing clickable <div> elements with proper <button> or <a> elements is a small change with massive impact.

Accessibility is not a feature, it's a standard.`,
    new Author('Azeez Adams'),
    new Date('2026-02-06')
  ),
  new Post(
    'post-3',
    'Flexbox vs. Grid: Choosing the Right CSS Layout Tool for the Job',
    `Flexbox and CSS Grid are often compared, but they solve different problems.

Flexbox is one-dimensional. It excels at aligning items along a single axis, perfect for navigation bars, buttons, cards, and UI components.

CSS Grid is two-dimensional. It is designed for overall page layouts, complex grids, dashboards, and responsive sections that require row and column control.

Experienced developers don't choose one exclusively. They combine both strategically:

Grid defines the macro layout

Flexbox fine-tunes the micro layout

Flexbox is ideal for one-dimensional layouts like navigation bars, cards, and form controls.

CSS Grid excels at two-dimensional layouts such as page structures, dashboards, and galleries.

Using the right tool results in cleaner markup, simpler CSS, and layouts that adapt naturally.`,
    new Author('Azeez Adams'),
    new Date('2026-02-06')
  ),
];

// In-memory posts storage
let posts: Post[] = [...samplePosts];

// CRUD Operations
export const getAllPosts = (): Post[] => {
  return [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const createPost = (data: PostFormData): Post => {
  const newPost = new Post(
    generateId(),
    data.title.trim(),
    data.content.trim(),
    new Author(data.authorName.trim()),
    new Date()
  );
  posts = [newPost, ...posts];
  return newPost;
};

export const deletePost = (id: string): boolean => {
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== id);
  return posts.length < initialLength;
};

export const updatePost = (id: string, data: Partial<PostFormData>): Post | undefined => {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return undefined;

  const existingPost = posts[index];
  const updatedPost = new Post(
    existingPost.id,
    data.title?.trim() || existingPost.title,
    data.content?.trim() || existingPost.content,
    data.authorName ? new Author(data.authorName.trim()) : existingPost.author,
    existingPost.date
  );

  posts[index] = updatedPost;
  return updatedPost;
};

// Get posts count
export const getPostsCount = (): number => {
  return posts.length;
};
