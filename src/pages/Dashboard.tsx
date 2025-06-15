
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { EnhancedQuickActions } from "@/components/EnhancedQuickActions";
import { RecentActivity } from "@/components/RecentActivity";
import { SystemStatus } from "@/components/SystemStatus";
import { TicketAnalytics } from "@/components/TicketAnalytics";
import { SLATracker } from "@/components/SLATracker";
import { useAuth } from "@/components/AuthProvider";

export default function Dashboard() {
  const { userProfile } = useAuth();
  
  const isStaff = userProfile?.role && ['ict_officer', 'admin', 'superuser'].includes(userProfile.role);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <WelcomeBanner />
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EnhancedQuickActions />
          
          {isStaff && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TicketAnalytics />
              <SLATracker />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <RecentActivity />
          <SystemStatus />
        </div>
      </div>
    </div>
  );
}
