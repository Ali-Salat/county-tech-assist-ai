
import { UserMenu } from "./UserMenu";
import { NotificationCenter } from "./NotificationCenter";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {breadcrumbs && (
            <nav className="flex mb-3" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-slate-400">/</span>}
                    {crumb.href ? (
                      <a 
                        href={crumb.href} 
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-slate-600 font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {title}
            </h1>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              Enhanced
            </Badge>
          </div>
          {description && (
            <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {actions}
          <NotificationCenter />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
