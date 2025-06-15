
import { UserMenu } from "./UserMenu";
import { NotificationCenter } from "./NotificationCenter";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {breadcrumbs && (
            <nav className="flex mb-2" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-slate-400">/</span>}
                    {crumb.href ? (
                      <a href={crumb.href} className="text-blue-600 hover:text-blue-800">
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-slate-600">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="text-slate-600 mt-1">{description}</p>
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
