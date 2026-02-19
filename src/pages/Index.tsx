import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold">Career Navigator AI</h1>
        <p className="text-xl text-muted-foreground">
          AI-powered career simulation and skill gap analysis platform
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
