import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { getPostById, deletePost } from '@/data/posts';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const post = id ? getPostById(id) : undefined;

  const handleDelete = () => {
    if (id) {
      deletePost(id);
      toast({
        title: 'Post deleted',
        description: 'The post has been permanently removed.',
      });
      navigate('/');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center fade-in">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Post not found</h1>
          <p className="mb-8 text-muted-foreground">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </main>
      </div>
    );
  }

  const formattedDate = post.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Split content into paragraphs
  const paragraphs = post.content.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        <article className="mx-auto max-w-3xl fade-in">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <User className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="ml-auto gap-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete "{post.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className="mb-6 text-lg leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer */}
          <footer className="mt-12 border-t border-border pt-8">
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild className="gap-2">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to all posts
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;
