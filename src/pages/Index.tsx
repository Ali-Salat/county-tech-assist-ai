
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardStats, TicketDashboard } from "@/components/TicketDashboard";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto max-w-7xl">
          <section className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">ICT Help Desk Portal</h1>
            <p className="text-muted-foreground">
              Submit and track your IT support requests in one place
            </p>
            
            <div className="mt-8">
              <DashboardStats />
            </div>
          </section>
          
          <section className="mb-8">
            <TicketDashboard />
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">Common Resources</h2>
              <div className="grid grid-cols-2 gap-4">
                <ResourceCard 
                  title="Employee Email" 
                  description="Access your county email account" 
                  link="#"
                />
                <ResourceCard 
                  title="Password Reset" 
                  description="Self-service password recovery tool" 
                  link="#"
                />
                <ResourceCard 
                  title="Software Catalog" 
                  description="Browse available software" 
                  link="#"
                />
                <ResourceCard 
                  title="Training Portal" 
                  description="IT training materials and videos" 
                  link="#"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">IT Announcements</h2>
              <div className="space-y-4">
                <AnnouncementCard
                  title="System Maintenance"
                  date="May 25, 2025"
                  content="Scheduled maintenance will be performed on all systems this Sunday from 2AM to 6AM."
                />
                <AnnouncementCard
                  title="New Email Security Features"
                  date="May 18, 2025"
                  content="Enhanced security features have been enabled for all county email accounts."
                />
                <AnnouncementCard
                  title="Office Software Update"
                  date="May 10, 2025"
                  content="The latest version of Microsoft Office is now available for installation."
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
}

function ResourceCard({ title, description, link }: ResourceCardProps) {
  return (
    <a 
      href={link} 
      className="block p-4 border rounded-lg hover:bg-accent hover:border-primary/20 transition-colors"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}

interface AnnouncementCardProps {
  title: string;
  date: string;
  content: string;
}

function AnnouncementCard({ title, date, content }: AnnouncementCardProps) {
  return (
    <div className="p-4 border-l-4 border-primary bg-accent/50 rounded-r-lg">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  );
}

export default Index;
