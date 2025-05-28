
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { useAuth } from "./AuthProvider";

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                alt="Wajir County Logo" 
                className="h-10 w-10 mr-3"
              />
              <div>
                <h1 
                  onClick={() => navigate("/")}
                  className="text-xl font-bold text-primary cursor-pointer"
                >
                  Wajir County ICT Help Desk
                </h1>
                <p className="text-xs text-muted-foreground font-bold">County Government of Wajir</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <UserMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
