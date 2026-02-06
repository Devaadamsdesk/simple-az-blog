import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { getAllPosts, deletePost } from '@/data/posts';
import { Post } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  const handleDelete = (id: string) => {
    const success = deletePost(id);
    if (success) {
      setPosts(getAllPosts());
      toast({
        title: 'Post deleted',
        description: 'The post has been permanently removed.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Welcome to <span className="text-accent">AZ Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover thoughtful articles on design, development, and the craft of building beautiful digital experiences.
          </p>
        </section>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <section className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onDelete={handleDelete}
              />
            ))}
          </section>
        ) : (
          <section className="flex flex-col items-center justify-center py-16 text-center fade-in">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">No posts yet</h2>
            <p className="mb-6 text-muted-foreground">
              Be the first to share your thoughts with the world.
            </p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AZ Blog. Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
