
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TicketDashboard } from "@/components/TicketDashboard";
import { TicketForm } from "@/components/TicketForm";
import { TicketList } from "@/components/TicketList";
import { AdvancedSearch } from "@/components/AdvancedSearch";
import { SLATracker } from "@/components/SLATracker";
import { TicketAnalytics } from "@/components/TicketAnalytics";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TicketsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    console.log('Search filters:', filters);
    // Implement actual filtering logic here
  };

  const handleClearSearch = () => {
    setSearchFilters(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Support Tickets</h2>
          <p className="text-slate-600">Comprehensive ticket management and analytics</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Support Ticket</DialogTitle>
            </DialogHeader>
            <TicketForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-tickets" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="all-tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sla">SLA Tracking</TabsTrigger>
          <TabsTrigger value="search">Advanced Search</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <TicketDashboard />
        </TabsContent>

        <TabsContent value="all-tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Management</CardTitle>
              <CardDescription>
                View, search, and manage all support tickets in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TicketList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <TicketAnalytics />
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <SLATracker />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <AdvancedSearch 
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
          {searchFilters && (
            <Card>
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>
                  Filtered tickets based on your search criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TicketList />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
