import { Link, useLocation } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const isCreatePage = location.pathname === '/create';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">AZ</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Blog</span>
        </Link>

        {!isCreatePage && (
          <Button asChild>
            <Link to="/create" className="gap-2">
              <PenLine className="h-4 w-4" />
              Write
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
