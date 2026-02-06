import { Link } from 'react-router-dom';
import { Trash2, Calendar, Clock, User } from 'lucide-react';
import { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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

interface BlogCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

const BlogCard = ({ post, onDelete }: BlogCardProps) => {
  const formattedDate = post.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="group card-hover flex flex-col overflow-hidden border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <Link 
            to={`/post/${post.id}`}
            className="flex-1"
          >
            <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent">
              {post.title}
            </h2>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete post</span>
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
                  onClick={() => onDelete(post.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <Link to={`/post/${post.id}`}>
          <p className="line-clamp-3 text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="border-t border-border/50 pt-4">
        <div className="flex w-full flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
