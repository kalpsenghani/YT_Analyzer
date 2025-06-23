import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Printer,
  Share,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash2,
  Copy,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Play,
  Heart,
  MessageCircle,
  Target,
  Zap,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { formatNumber } from "@/lib/mockData";

interface Report {
  id: string;
  name: string;
  type: "performance" | "comparison" | "insights" | "custom";
  status: "completed" | "generating" | "scheduled" | "failed";
  createdAt: string;
  fileSize: string;
  downloadUrl?: string;
  description: string;
  metrics: string[];
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  metrics: string[];
  frequency: string;
}

const Reports = () => {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const mockReports: Report[] = [
    {
      id: "1",
      name: "Monthly Performance Summary",
      type: "performance",
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      fileSize: "2.4 MB",
      downloadUrl: "#",
      description:
        "Comprehensive analysis of channel performance for January 2024",
      metrics: ["Views", "Engagement", "Subscribers", "Watch Time"],
    },
    {
      id: "2",
      name: "Shorts vs Long-form Comparison",
      type: "comparison",
      status: "completed",
      createdAt: "2024-01-14T14:20:00Z",
      fileSize: "1.8 MB",
      downloadUrl: "#",
      description: "Detailed comparison of content format performance",
      metrics: ["Views", "Engagement Rate", "CTR", "Retention"],
    },
    {
      id: "3",
      name: "AI Insights Weekly Report",
      type: "insights",
      status: "generating",
      createdAt: "2024-01-16T09:00:00Z",
      fileSize: "Processing...",
      description: "AI-powered insights and recommendations",
      metrics: ["Performance Patterns", "Growth Opportunities", "Trends"],
    },
    {
      id: "4",
      name: "Q4 2023 Analytics Report",
      type: "custom",
      status: "completed",
      createdAt: "2024-01-01T12:00:00Z",
      fileSize: "4.2 MB",
      downloadUrl: "#",
      description: "Quarterly performance review with custom metrics",
      metrics: ["Revenue", "Growth Rate", "Top Videos", "Demographics"],
    },
    {
      id: "5",
      name: "Content Strategy Report",
      type: "insights",
      status: "scheduled",
      createdAt: "2024-01-20T08:00:00Z",
      fileSize: "Scheduled",
      description: "Strategic recommendations for next quarter",
      metrics: ["Content Mix", "Posting Schedule", "Audience Analysis"],
    },
  ];

  const reportTemplates: ReportTemplate[] = [
    {
      id: "performance",
      name: "Performance Overview",
      description: "Complete performance analysis with key metrics",
      icon: <BarChart3 className="h-6 w-6" />,
      metrics: ["Views", "Engagement", "Subscribers", "Watch Time"],
      frequency: "Weekly/Monthly",
    },
    {
      id: "comparison",
      name: "Format Comparison",
      description: "Shorts vs Long-form content analysis",
      icon: <PieChart className="h-6 w-6" />,
      metrics: ["Views", "Engagement Rate", "CTR", "Retention"],
      frequency: "Monthly",
    },
    {
      id: "insights",
      name: "AI Insights Report",
      description: "AI-powered recommendations and insights",
      icon: <Zap className="h-6 w-6" />,
      metrics: ["Trends", "Opportunities", "Predictions", "Recommendations"],
      frequency: "Weekly",
    },
    {
      id: "growth",
      name: "Growth Analysis",
      description: "Channel growth trends and projections",
      icon: <TrendingUp className="h-6 w-6" />,
      metrics: ["Subscriber Growth", "View Growth", "Engagement Trends"],
      frequency: "Monthly",
    },
    {
      id: "audience",
      name: "Audience Demographics",
      description: "Detailed audience analysis and insights",
      icon: <Users className="h-6 w-6" />,
      metrics: ["Age Groups", "Geography", "Interests", "Behavior"],
      frequency: "Quarterly",
    },
    {
      id: "content",
      name: "Content Performance",
      description: "Individual video performance analysis",
      icon: <Play className="h-6 w-6" />,
      metrics: ["Top Videos", "Performance Metrics", "Optimization Tips"],
      frequency: "Weekly",
    },
  ];

  const getStatusIcon = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "generating":
        return (
          <div className="h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        );
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "generating":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "scheduled":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "failed":
        return "text-red-400 bg-red-500/20 border-red-500/30";
    }
  };

  const handleGenerateReport = (templateId: string) => {
    console.log("Generating report from template:", templateId);
    // Implement report generation logic
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen text-white">
        <NavigationHeader />

        {/* Main Content */}
        <main className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-2">
                    Reports & Analytics
                  </h1>
                  <p className="text-white/60 text-lg">
                    Generate, download, and manage your analytics reports
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                    <Plus className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-white/[0.05] mb-8">
                  <TabsTrigger value="reports" className="text-white/70">
                    My Reports
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="text-white/70">
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="text-white/70">
                    Scheduled
                  </TabsTrigger>
                </TabsList>

                {/* My Reports Tab */}
                <TabsContent value="reports" className="space-y-6">
                  {/* Filters */}
                  <GlassCard variant="interactive">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search reports..."
                          className="bg-white/[0.05] border-white/[0.15] text-white placeholder:text-white/40"
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full md:w-48 bg-white/[0.05] border-white/[0.15] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="performance">
                            Performance
                          </SelectItem>
                          <SelectItem value="comparison">Comparison</SelectItem>
                          <SelectItem value="insights">Insights</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all-status">
                        <SelectTrigger className="w-full md:w-48 bg-white/[0.05] border-white/[0.15] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                          <SelectItem value="all-status">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="generating">Generating</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </GlassCard>

                  {/* Reports List */}
                  <div className="grid gap-4">
                    {mockReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <GlassCard
                          variant="interactive"
                          className="hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                              <FileText className="h-6 w-6 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-semibold text-white truncate">
                                  {report.name}
                                </h3>
                                <Badge
                                  className={getStatusColor(report.status)}
                                >
                                  {getStatusIcon(report.status)}
                                  <span className="ml-1 capitalize">
                                    {report.status}
                                  </span>
                                </Badge>
                              </div>
                              <p className="text-white/60 text-sm mb-2">
                                {report.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-white/50">
                                <span>
                                  Created:{" "}
                                  {format(
                                    new Date(report.createdAt),
                                    "MMM dd, yyyy",
                                  )}
                                </span>
                                <span>Size: {report.fileSize}</span>
                                <div className="flex items-center gap-1">
                                  <span>Metrics:</span>
                                  {report.metrics.slice(0, 2).map((metric) => (
                                    <Badge
                                      key={metric}
                                      variant="outline"
                                      className="text-xs bg-white/[0.05] border-white/20 text-white/70"
                                    >
                                      {metric}
                                    </Badge>
                                  ))}
                                  {report.metrics.length > 2 && (
                                    <span className="text-white/40">
                                      +{report.metrics.length - 2} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {report.status === "completed" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-white/60 hover:text-white"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-black/90 backdrop-blur-xl border-white/20 text-white"
                                >
                                  <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/[0.1]">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/[0.1]">
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/[0.1]">
                                    <Share className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/[0.1]">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reportTemplates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <GlassCard
                          variant="interactive"
                          className={`cursor-pointer ${selectedTemplate === template.id ? "ring-2 ring-red-500" : ""}`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="text-center">
                            <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-blue-500/20 w-fit mx-auto mb-4">
                              {template.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {template.name}
                            </h3>
                            <p className="text-white/60 text-sm mb-4">
                              {template.description}
                            </p>
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {template.metrics.map((metric) => (
                                  <Badge
                                    key={metric}
                                    variant="outline"
                                    className="text-xs bg-white/[0.05] border-white/20 text-white/70"
                                  >
                                    {metric}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-xs text-white/50">
                                {template.frequency}
                              </div>
                              <Button
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGenerateReport(template.id);
                                }}
                              >
                                Generate Report
                              </Button>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Scheduled Tab */}
                <TabsContent value="scheduled" className="space-y-6">
                  <GlassCard variant="interactive">
                    <div className="text-center py-12">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 w-fit mx-auto mb-4">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Scheduled Reports
                      </h3>
                      <p className="text-white/60 mb-6">
                        Set up automated report generation for regular insights
                      </p>
                      <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Report
                      </Button>
                    </div>
                  </GlassCard>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
};

export default Reports;
