
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TicketsPage from "./pages/TicketsPage";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import SubmitTicketPage from "./pages/SubmitTicketPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="wajir-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="Dashboard" 
                    description="Overview of your ICT support activities"
                    breadcrumbs={[{ label: "Home" }]}
                  >
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/tickets" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="Support Tickets" 
                    description="Manage and track support requests"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tickets" }]}
                  >
                    <TicketsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/submit-ticket" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="Submit Ticket" 
                    description="Create a new support request"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Submit Ticket" }]}
                  >
                    <SubmitTicketPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/my-tickets" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="My Tickets" 
                    description="View your submitted tickets"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "My Tickets" }]}
                  >
                    <MyTicketsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/knowledge-base" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="Knowledge Base" 
                    description="Self-help articles and solutions"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Base" }]}
                  >
                    <KnowledgeBasePage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="User Management" 
                    description="Manage system users and permissions"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Users" }]}
                  >
                    <UsersPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="Reports & Analytics" 
                    description="View system reports and analytics"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reports" }]}
                  >
                    <ReportsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <DashboardLayout 
                    title="System Settings" 
                    description="Configure system preferences"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Settings" }]}
                  >
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
