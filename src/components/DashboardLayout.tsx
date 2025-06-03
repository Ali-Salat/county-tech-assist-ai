
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { PageHeader } from "./PageHeader";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function DashboardLayout({ 
  children, 
  title = "Dashboard", 
  description, 
  breadcrumbs, 
  actions 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <PageHeader 
          title={title} 
          description={description}
          breadcrumbs={breadcrumbs}
          actions={actions}
        />
        <main className="flex-1 p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
