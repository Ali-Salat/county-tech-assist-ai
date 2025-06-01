
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { useAuth } from "./AuthProvider";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-slate-700">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <img 
                  src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                  alt="Wajir County Logo" 
                  className="relative h-12 w-12 drop-shadow-lg"
                />
              </div>
              <div className="ml-4">
                <h1 
                  onClick={() => navigate("/")}
                  className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent cursor-pointer hover:from-primary hover:to-orange-400 transition-all duration-300"
                >
                  Wajir County ICT
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-slate-400 font-semibold">Professional Help Desk System</p>
                  {userProfile?.role === 'superuser' && (
                    <Badge variant="destructive" className="text-xs px-2 py-0 bg-red-600">
                      ADMIN
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {user && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                  className="text-slate-300 hover:text-white hover:bg-slate-700 relative"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></div>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Settings"
                  className="text-slate-300 hover:text-white hover:bg-slate-700"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="h-6 w-px bg-slate-600"></div>
                <UserMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
