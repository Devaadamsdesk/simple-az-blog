import { Post, Author, PostFormData } from '@/types/blog';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initial sample posts
const samplePosts: Post[] = [
  new Post(
    'post-1',
    'The Art of Minimalist Design',
    `Minimalism in design is not about removing everything until nothing remains. It's about removing everything that doesn't serve a purpose until only the essential remains.

The philosophy behind minimalist design goes beyond aesthetics. It's about creating clarity, reducing cognitive load, and allowing users to focus on what truly matters. When we strip away the unnecessary, we're left with designs that breathe, that guide users naturally through their journey.

Consider the white space in a well-designed page. It's not empty—it's purposeful. It creates rhythm, establishes hierarchy, and gives elements room to exist. Every margin, every gap, every pause in the visual flow is intentional.

The challenge lies in knowing what to keep. Every element must earn its place. A button, a headline, an image—each must serve a clear purpose. If it doesn't add value, it subtracts from the experience.

This approach requires discipline. It's easier to add than to subtract. But the restraint pays off in interfaces that feel effortless, pages that load faster, and experiences that users actually enjoy.`,
    new Author('Sarah Chen'),
    new Date('2025-01-15')
  ),
  new Post(
    'post-2',
    'Building Resilient Frontend Architecture',
    `Modern web applications demand architecture that can evolve. The patterns we choose today determine how easily we can adapt tomorrow.

Component-based architecture has transformed how we think about frontend development. By breaking interfaces into reusable, self-contained pieces, we create systems that are easier to test, maintain, and scale.

But good architecture goes beyond components. It's about establishing clear boundaries, defining data flows, and creating conventions that entire teams can follow. It's about making the right thing easy and the wrong thing hard.

State management remains one of the most debated topics. The key insight is that not all state is created equal. Server state, UI state, and form state each have different characteristics and deserve different solutions.

Testing strategy is another crucial consideration. Unit tests for pure functions, integration tests for feature workflows, and end-to-end tests for critical paths. The testing pyramid still holds, but the layers have evolved.

Documentation ties it all together. Architecture decisions without documentation become tribal knowledge. Write ADRs (Architecture Decision Records), maintain component libraries, and keep README files current.`,
    new Author('Marcus Williams'),
    new Date('2025-01-22')
  ),
  new Post(
    'post-3',
    'The Psychology of User Experience',
    `Every interface tells a story. The best ones tell stories that feel inevitable—where each step flows naturally to the next.

Understanding user psychology isn't about manipulation. It's about meeting people where they are, respecting their time, and making their goals achievable with minimum friction.

Cognitive load theory teaches us that working memory is limited. When we ask users to remember too much, they struggle. Progressive disclosure—revealing information as it becomes relevant—keeps cognitive load manageable.

Habit formation plays a crucial role in product success. Products that integrate into existing routines stick. The hook model (trigger, action, variable reward, investment) explains why some products become daily habits while others are forgotten.

Emotional design matters more than we often acknowledge. Users form impressions in milliseconds. These emotional responses color everything that follows. A delightful moment of microinteraction can transform a mundane task into something memorable.

Accessibility is not optional. When we design for the margins, we often improve experiences for everyone. Captions help the deaf and those in noisy environments. High contrast helps the visually impaired and those in bright sunlight.`,
    new Author('Elena Rodriguez'),
    new Date('2025-02-01')
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
