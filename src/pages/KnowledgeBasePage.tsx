
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Monitor, Wifi, Printer, Mail, Lock, HelpCircle } from "lucide-react";

const knowledgeBaseArticles = [
  {
    id: 1,
    title: "How to Connect to WiFi Network",
    category: "Network",
    description: "Step-by-step guide to connect your device to the office WiFi",
    content: "Follow these steps to connect to the Wajir County WiFi network...",
    icon: Wifi,
    difficulty: "Easy",
    readTime: "2 min"
  },
  {
    id: 2,
    title: "Printer Setup and Troubleshooting",
    category: "Hardware",
    description: "How to set up printers and resolve common printing issues",
    content: "This guide covers printer installation, configuration, and common problems...",
    icon: Printer,
    difficulty: "Medium",
    readTime: "5 min"
  },
  {
    id: 3,
    title: "Email Configuration Guide",
    category: "Email",
    description: "Configure your email client for Wajir County email",
    content: "Learn how to set up your official email account on various devices...",
    icon: Mail,
    difficulty: "Medium",
    readTime: "7 min"
  },
  {
    id: 4,
    title: "Password Security Best Practices",
    category: "Security",
    description: "How to create and manage secure passwords",
    content: "Essential tips for maintaining strong password security...",
    icon: Lock,
    difficulty: "Easy",
    readTime: "3 min"
  },
  {
    id: 5,
    title: "Computer Performance Optimization",
    category: "Software",
    description: "Tips to improve your computer's speed and performance",
    content: "Learn how to optimize your computer for better performance...",
    icon: Monitor,
    difficulty: "Medium",
    readTime: "10 min"
  },
  {
    id: 6,
    title: "Common Software Issues and Solutions",
    category: "Software",
    description: "Troubleshoot frequent software problems",
    content: "Solutions for the most common software issues encountered...",
    icon: HelpCircle,
    difficulty: "Easy",
    readTime: "4 min"
  }
];

const categories = ["All", "Network", "Hardware", "Software", "Email", "Security"];

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const filteredArticles = knowledgeBaseArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    const article = knowledgeBaseArticles.find(a => a.id === selectedArticle);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedArticle(null)}>
            ← Back to Articles
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{article?.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="secondary">{article?.category}</Badge>
              <span className="text-sm text-slate-600">{article?.readTime} read</span>
              <span className="text-sm text-slate-600">Difficulty: {article?.difficulty}</span>
            </div>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-slate-700 mb-6">{article?.description}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Detailed Instructions</h3>
                <p className="text-slate-700">{article?.content}</p>
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">💡 Still need help?</p>
                  <p className="text-green-700 text-sm mt-1">
                    If this article didn't solve your issue, please submit a support ticket and our ICT team will assist you personally.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base</h1>
        <p className="text-lg text-slate-600">
          Find answers to common ICT questions and learn how to resolve issues yourself
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const Icon = article.icon;
          return (
            <Card 
              key={article.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedArticle(article.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline">{article.category}</Badge>
                </div>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{article.readTime} read</span>
                  <span>Difficulty: {article.difficulty}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No articles found</h3>
            <p className="text-slate-600">
              Try adjusting your search terms or category filter.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Can't find what you're looking for?</CardTitle>
          <CardDescription>
            Our knowledge base is constantly growing. If you can't find the answer to your question, don't hesitate to contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Submit Support Ticket
            </Button>
            <Button variant="outline">
              📧 Email: helpdesk@wajir.go.ke
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
