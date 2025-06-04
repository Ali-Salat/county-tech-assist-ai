
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-6">
          <div className="h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">404</h1>
            <h2 className="text-xl font-semibold text-slate-700">Page Not Found</h2>
            <p className="text-slate-600 max-w-sm">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded font-mono">
            Path: {location.pathname}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
