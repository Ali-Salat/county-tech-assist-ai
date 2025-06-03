
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings, Bell, Menu, Shield } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { useAuth } from "./AuthProvider";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-700 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-slate-700">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                <img 
                  src="/lovable-uploads/60407c4d-d926-4d49-85c1-36e4af65d42b.png" 
                  alt="Wajir County Logo" 
                  className="relative h-16 w-16 drop-shadow-lg object-contain"
                />
              </div>
              <div className="ml-4">
                <h1 
                  onClick={() => navigate("/")}
                  className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent cursor-pointer hover:from-blue-300 hover:to-white transition-all duration-300"
                >
                  WAJIR COUNTY GOVERNMENT
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-blue-200 font-semibold">ICT Department - Help Desk System</p>
                  {userProfile?.role === 'superuser' && (
                    <Badge variant="destructive" className="text-xs px-2 py-0 bg-red-600 animate-pulse">
                      <Shield className="h-3 w-3 mr-1" />
                      SUPER ADMIN
                    </Badge>
                  )}
                  {userProfile?.role === 'admin' && (
                    <Badge variant="secondary" className="text-xs px-2 py-0 bg-orange-600 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      ADMIN
                    </Badge>
                  )}
                  {userProfile?.role === 'ict_officer' && (
                    <Badge variant="outline" className="text-xs px-2 py-0 bg-blue-600 text-white border-blue-400">
                      <Settings className="h-3 w-3 mr-1" />
                      ICT OFFICER
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
                  className="text-blue-200 hover:text-white hover:bg-blue-800 relative transition-all duration-300"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Settings"
                  className="text-blue-200 hover:text-white hover:bg-blue-800 transition-all duration-300"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="h-8 w-px bg-blue-600"></div>
                <UserMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
