import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  Filter,
  Download,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Minus,
  PlayCircle,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  BarChart3,
  Activity,
  Zap,
  Target,
  Brain,
  Sparkles,
  FileText,
  Share,
  MoreHorizontal,
  ChevronDown,
  Search,
  Grid,
  List,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  mockVideos,
  mockAnalyticsData,
  mockAIInsights,
  formatNumber,
  formatDuration,
  generateTrendData,
} from "@/lib/mockData";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/ui/metric-card";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useAppStore } from "@/lib/store";
import { DateRange } from 'react-day-picker';

const Analytics = () => {
  const { 
    fetchAnalytics, 
    fetchSummary, 
    analytics, 
    summary, 
    isAnalyticsLoading, 
    isSummaryLoading, 
    error,
    isAuthenticated 
  } = useAppStore();
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch analytics when user changes page, sort, search, etc.
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics(currentPage, 10, sortBy, sortOrder, searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, currentPage, sortBy, sortOrder, searchQuery]);

  // Fetch summary only when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const extendedData = generateTrendData(30);

  // Use real analytics data if available, fallback to mock data
  const filteredVideos = analytics.length > 0 ? analytics : mockVideos;
  
  const scatterData = filteredVideos.map((video) => ({
    x: video.views,
    y: (video.likes / video.views) * 100, // Calculate engagement rate
    z: video.comments,
    format: 'mixed', // API doesn't have format field
    title: video.title,
  }));

  const performanceMetrics = [
    {
      label: "Total Views",
      value: formatNumber(
        summary ? summary.summary.totalViews : extendedData.reduce((sum, item) => sum + item.shortsViews, 0) +
          extendedData.reduce((sum, item) => sum + item.longFormViews, 0),
      ),
      change: 23.5,
      trend: "up" as const,
      icon: <Eye className="h-5 w-5" />,
    },
    {
      label: "Avg Engagement",
      value: summary ? `${((summary.summary.avgLikes / summary.summary.avgViews) * 100).toFixed(1)}%` : "11.4%",
      change: 12.8,
      trend: "up" as const,
      icon: <Heart className="h-5 w-5" />,
    },
    {
      label: "Total Videos",
      value: summary ? summary.summary.totalVideos.toString() : filteredVideos.length.toString(),
      change: 5.2,
      trend: "up" as const,
      icon: <PlayCircle className="h-5 w-5" />,
    },
    {
      label: "Watch Time",
      value: "2.4K hrs",
      change: -2.1,
      trend: "down" as const,
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <GlassCard className="p-3 border border-white/20">
          <p className="text-white/90 font-medium mb-2">
            {format(new Date(label), "MMM dd, yyyy")}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/70">
                {entry.name === "shortsViews"
                  ? "Shorts"
                  : entry.name === "longFormViews"
                    ? "Long-form"
                    : entry.name === "shortsEngagement"
                      ? "Shorts Engagement"
                      : "Long-form Engagement"}
                :
              </span>
              <span className="text-white font-medium">
                {entry.name.includes("Views")
                  ? formatNumber(entry.value)
                  : `${entry.value.toFixed(1)}%`}
              </span>
            </div>
          ))}
        </GlassCard>
      );
    }
    return null;
  };

  // Show loading state
  if (isAnalyticsLoading && !analytics.length) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen text-white">
          <NavigationHeader />
          <main className="pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            </div>
          </main>
        </div>
      </AnimatedBackground>
    );
  }

  // Show error state
  if (error && !analytics.length) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen text-white">
          <NavigationHeader />
          <main className="pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center">
                <p className="text-red-300 mb-4">{error}</p>
                <Button onClick={() => fetchAnalytics(1, 10)}>
                  Retry
                </Button>
              </div>
            </div>
          </main>
        </div>
      </AnimatedBackground>
    );
  }

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
                    Analytics
                  </h1>
                  <p className="text-white/60 text-lg">
                    Deep dive into your YouTube performance metrics
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/[0.1]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/[0.1]"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share Report
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {performanceMetrics.map((metric, index) => (
                <MetricCard
                  key={metric.label}
                  title={metric.label}
                  value={metric.value}
                  change={metric.change}
                  trend={metric.trend}
                  icon={metric.icon}
                  index={index}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Performance Trends */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassCard variant="interactive" size="lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Performance Trends
                      </h3>
                      <p className="text-white/60">
                        Views and engagement over time
                      </p>
                    </div>
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                      <SelectTrigger className="w-32 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="views">Views</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="watchTime">Watch Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={extendedData.slice(-14)}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                              dataKey="date"
                              stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                              tickFormatter={(value) =>
                                format(new Date(value), "MMM dd")
                              }
                            />
                            <YAxis
                              stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickFormatter={(value) => formatNumber(value)}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                              type="monotone"
                        dataKey="shortsViews"
                              stroke="#ff6b6b"
                        strokeWidth={2}
                              dot={{ fill: "#ff6b6b", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#ff6b6b", strokeWidth: 2 }}
                            />
                            <Line
                              type="monotone"
                        dataKey="longFormViews"
                              stroke="#64b5f6"
                        strokeWidth={2}
                              dot={{ fill: "#64b5f6", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#64b5f6", strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                </GlassCard>
              </motion.div>

              {/* Engagement Analysis */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlassCard variant="interactive" size="lg">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Engagement Analysis
                    </h3>
                    <p className="text-white/60">
                      Views vs Engagement Rate
                    </p>
                      </div>

                  <ResponsiveContainer width="100%" height={300}>
                          <ScatterChart data={scatterData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                              type="number"
                              dataKey="x"
                              name="Views"
                              stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickFormatter={(value) => formatNumber(value)}
                            />
                            <YAxis
                              type="number"
                              dataKey="y"
                              name="Engagement Rate"
                              stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickFormatter={(value) => `${value.toFixed(1)}%`}
                            />
                            <Tooltip
                              content={({ payload }) => {
                                if (payload && payload[0]) {
                                  const data = payload[0].payload;
                                  return (
                              <GlassCard className="p-3 border border-white/20">
                                <p className="text-white/90 font-medium mb-2">
                                          {data.title}
                                </p>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white/70">Views:</span>
                                    <span className="text-white font-medium">
                                      {formatNumber(data.x)}
                                    </span>
                                        </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white/70">Engagement:</span>
                                    <span className="text-white font-medium">
                                      {data.y.toFixed(1)}%
                                    </span>
                                        </div>
                                      </div>
                                    </GlassCard>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Scatter
                        dataKey="y"
                              fill="#64b5f6"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth={1}
                            />
                          </ScatterChart>
                        </ResponsiveContainer>
                </GlassCard>
              </motion.div>
            </div>

            {/* Analytics Table Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard variant="interactive" size="lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Analytics Data
                    </h3>
                    <p className="text-white/60">
                      Detailed performance metrics for your content
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        placeholder="Search analytics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.05] border border-white/10">
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={
                          viewMode === "list"
                            ? "bg-white/[0.1] text-white"
                            : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                        }
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={
                          viewMode === "grid"
                            ? "bg-white/[0.1] text-white"
                            : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                        }
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-lg bg-white/[0.03] border border-white/10">
                  {/* Date Range */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/[0.1]"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Pick a date"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Format Filter */}
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger className="w-32 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      <SelectItem value="short">Shorts</SelectItem>
                      <SelectItem value="long">Long-form</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="createdAt">Date</SelectItem>
                        <SelectItem value="views">Views</SelectItem>
                        <SelectItem value="likes">Likes</SelectItem>
                        <SelectItem value="comments">Comments</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="border-white/20 text-white hover:bg-white/[0.1]"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Analytics List */}
                <div className="space-y-4">
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-gradient-to-br from-white/[0.1] to-white/[0.05] rounded-lg flex items-center justify-center group-hover:from-red-500/20 group-hover:to-blue-500/20 transition-all">
                          <BarChart3 className="h-6 w-6 text-white/60 group-hover:text-white transition-colors" />
                      </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                              {formatDuration(video.duration || 0)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(video.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {formatNumber(video.likes)}
                          </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                      <div className="text-right">
                          <div className="text-white font-medium">
                            {formatNumber(video.comments)}
                          </div>
                          <div className="text-white/60 text-sm">comments</div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/70"
                        >
                          Mixed
                        </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                              className="text-white/60 hover:text-white hover:bg-white/[0.1]"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {summary && summary.recentAnalytics.length > 0 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                    <div className="text-white/60 text-sm">
                      Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, summary.summary.totalVideos)} of {summary.summary.totalVideos} results
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-white/20 text-white hover:bg-white/[0.1]"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage * 10 >= summary.summary.totalVideos}
                        className="border-white/20 text-white hover:bg-white/[0.1]"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
};

export default Analytics;
