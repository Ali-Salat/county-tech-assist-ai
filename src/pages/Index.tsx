
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardStats, TicketDashboard } from "@/components/TicketDashboard";
import { useAuth } from "@/components/AuthProvider";
import { Shield, Users, Clock, Mail, Phone, MapPin, Globe, Award, CheckCircle } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto max-w-7xl">
          <section className="mb-8">
            <div className="hero-gradient rounded-xl p-12 text-white mb-8 relative overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <Shield className="h-16 w-16 mr-4 text-white/90" />
                  <div className="text-left">
                    <h1 className="text-5xl font-bold tracking-tight mb-2">
                      Wajir County ICT Help Desk
                    </h1>
                    <p className="text-lg opacity-90 font-bold">
                      Professional ICT support services for <span className="font-extrabold text-white">County Government of Wajir</span> employees
                    </p>
                  </div>
                </div>
                
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Submit and track your IT support requests efficiently with our state-of-the-art help desk system
                </p>
                
                {/* Professional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <div className="flex items-center justify-center mb-3">
                      <Clock className="h-8 w-8 text-white/90" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">24/7</h3>
                    <p className="text-sm opacity-90">Emergency Support</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <div className="flex items-center justify-center mb-3">
                      <Users className="h-8 w-8 text-white/90" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">500+</h3>
                    <p className="text-sm opacity-90">County Employees Served</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <div className="flex items-center justify-center mb-3">
                      <Award className="h-8 w-8 text-white/90" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">99.9%</h3>
                    <p className="text-sm opacity-90">System Uptime</p>
                  </div>
                </div>
              </div>
            </div>
            
            {user && (
              <div className="mt-8">
                <DashboardStats />
              </div>
            )}
          </section>
          
          {user && (
            <section className="mb-8">
              <TicketDashboard />
            </section>
          )}
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Globe className="h-6 w-6 mr-3 text-primary" />
                ICT Resources
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <ResourceCard 
                  title="County Email" 
                  description="Access your @wajir.go.ke email account" 
                  link="#"
                  icon={<Mail className="h-5 w-5 text-primary" />}
                />
                <ResourceCard 
                  title="Password Reset" 
                  description="Self-service password recovery portal" 
                  link="#"
                  icon={<Shield className="h-5 w-5 text-primary" />}
                />
                <ResourceCard 
                  title="Software Catalog" 
                  description="Browse approved county software" 
                  link="#"
                  icon={<Globe className="h-5 w-5 text-primary" />}
                />
                <ResourceCard 
                  title="ICT Training" 
                  description="Training materials and guides" 
                  link="#"
                  icon={<Award className="h-5 w-5 text-primary" />}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-primary" />
                ICT Announcements
              </h2>
              <div className="space-y-4">
                <AnnouncementCard
                  title="System Maintenance Scheduled"
                  date="May 25, 2025"
                  content="Planned maintenance on all county systems this Sunday from 8AM to 2PM. Critical systems will remain operational."
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
          
          <section className="bg-gradient-to-r from-muted/50 to-accent/30 rounded-xl p-8 border border-border/50 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <Phone className="h-6 w-6 mr-3 text-primary" />
              Contact ICT Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-background/80 rounded-lg p-6 border border-border/50">
                <div className="flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Director ICT</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">Mohamed Shahid</p>
                <p className="text-sm font-medium">mohamed.shahid@wajir.go.ke</p>
              </div>
              <div className="text-center bg-background/80 rounded-lg p-6 border border-border/50">
                <div className="flex justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Senior ICT Officer</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">Ali Salat</p>
                <p className="text-sm font-medium">ali.salat@wajir.go.ke</p>
              </div>
              <div className="text-center bg-background/80 rounded-lg p-6 border border-border/50">
                <div className="flex justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Emergency Support</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">24/7 Critical Issues</p>
                <p className="text-sm font-medium">helpdesk@wajir.go.ke</p>
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
  icon: React.ReactNode;
}

function ResourceCard({ title, description, link, icon }: ResourceCardProps) {
  return (
    <a 
      href={link} 
      className="block p-6 border rounded-xl hover:bg-accent hover:border-primary/20 transition-all duration-300 hover:shadow-md group bg-background/50"
    >
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="font-bold ml-2 group-hover:text-primary transition-colors">{title}</h3>
      </div>
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
    <div className="p-6 border-l-4 border-primary bg-accent/30 rounded-r-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full font-medium">{date}</span>
      </div>
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  );
}

export default Index;
