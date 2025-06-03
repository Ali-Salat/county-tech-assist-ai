
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Bell, Settings, User } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  const { userProfile } = useAuth();

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                        <span className="text-slate-600">{crumb.label}</span>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              {description && (
                <p className="text-slate-600 mt-1">{description}</p>
              )}
            </div>
            {userProfile?.role && (
              <Badge 
                variant={userProfile.role === 'superuser' ? 'destructive' : 'secondary'}
                className="ml-2"
              >
                {userProfile.role.replace('_', ' ').toUpperCase()}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {actions}
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
