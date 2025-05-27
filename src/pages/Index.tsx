
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
            <div className="hero-gradient rounded-lg p-8 text-white mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Wajir County ICT Help Desk</h1>
              <p className="text-lg opacity-90">
                Professional ICT support services for Wajir County Government employees
              </p>
              <p className="text-sm opacity-75 mt-2">
                Submit and track your IT support requests efficiently
              </p>
            </div>
            
            <div className="mt-8">
              <DashboardStats />
            </div>
          </section>
          
          <section className="mb-8">
            <TicketDashboard />
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">ICT Resources</h2>
              <div className="grid grid-cols-2 gap-4">
                <ResourceCard 
                  title="County Email" 
                  description="Access your @wajir.go.ke email account" 
                  link="#"
                />
                <ResourceCard 
                  title="Password Reset" 
                  description="Self-service password recovery portal" 
                  link="#"
                />
                <ResourceCard 
                  title="Software Catalog" 
                  description="Browse approved county software" 
                  link="#"
                />
                <ResourceCard 
                  title="ICT Training" 
                  description="Training materials and guides" 
                  link="#"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">ICT Announcements</h2>
              <div className="space-y-4">
                <AnnouncementCard
                  title="System Maintenance Scheduled"
                  date="May 25, 2025"
                  content="Planned maintenance on all county systems this Sunday from 2AM to 6AM. Critical systems will remain operational."
                />
                <AnnouncementCard
                  title="New Security Protocols Active"
                  date="May 18, 2025"
                  content="Enhanced cybersecurity measures have been implemented across all Wajir County digital platforms."
                />
                <AnnouncementCard
                  title="Office 365 Upgrade Complete"
                  date="May 10, 2025"
                  content="The latest version of Microsoft Office 365 is now available for all county employees."
                />
              </div>
            </div>
          </section>
          
          <section className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact ICT Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-medium">Director ICT</h3>
                <p className="text-sm text-muted-foreground">Mohamed Shahid</p>
                <p className="text-sm">mohamed.shahid@wajir.go.ke</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Senior ICT Officer</h3>
                <p className="text-sm text-muted-foreground">Ali Salat</p>
                <p className="text-sm">ali.salat@wajir.go.ke</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium">Emergency Support</h3>
                <p className="text-sm text-muted-foreground">24/7 Critical Issues</p>
                <p className="text-sm">Tel: +254 (0) XX XXX XXXX</p>
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
