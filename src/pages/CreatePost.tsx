import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createPost } from '@/data/posts';
import { useToast } from '@/hooks/use-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.authorName.trim()) {
      newErrors.authorName = 'Author name is required';
    } else if (formData.authorName.trim().length < 2) {
      newErrors.authorName = 'Author name must be at least 2 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    createPost(formData);
    
    toast({
      title: 'Post published!',
      description: 'Your new blog post is now live.',
    });
    
    navigate('/');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        <div className="mx-auto max-w-2xl fade-in">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </Button>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Create New Post</CardTitle>
              <CardDescription>
                Share your thoughts with the world. All fields are required.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a compelling title..."
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                {/* Author Name */}
                <div className="space-y-2">
                  <Label htmlFor="authorName" className="text-sm font-medium">
                    Author Name
                  </Label>
                  <Input
                    id="authorName"
                    placeholder="Your name"
                    value={formData.authorName}
                    onChange={(e) => handleChange('authorName', e.target.value)}
                    className={errors.authorName ? 'border-destructive' : ''}
                  />
                  {errors.authorName && (
                    <p className="text-sm text-destructive">{errors.authorName}</p>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog post content here... Use blank lines to separate paragraphs."
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    className={`min-h-[300px] resize-y ${errors.content ? 'border-destructive' : ''}`}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.content.length} characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
