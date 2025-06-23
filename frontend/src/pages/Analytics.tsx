import { useState } from "react";
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

const Analytics = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const extendedData = generateTrendData(30);

  const filteredVideos = mockVideos
    .filter(
      (video) =>
        (selectedFormat === "all" || video.format === selectedFormat) &&
        (searchQuery === "" ||
          video.title.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const multiplier = sortOrder === "asc" ? 1 : -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * multiplier;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * multiplier;
      }

      return 0;
    });

  const scatterData = mockVideos.map((video) => ({
    x: video.views,
    y: video.engagementRate,
    z: video.duration,
    format: video.format,
    title: video.title,
  }));

  const performanceMetrics = [
    {
      label: "Total Views",
      value: formatNumber(
        extendedData.reduce((sum, item) => sum + item.shortsViews, 0) +
          extendedData.reduce((sum, item) => sum + item.longFormViews, 0),
      ),
      change: 23.5,
      trend: "up" as const,
      icon: <Eye className="h-5 w-5" />,
    },
    {
      label: "Avg Engagement",
      value: "11.4%",
      change: 12.8,
      trend: "up" as const,
      icon: <Heart className="h-5 w-5" />,
    },
    {
      label: "Total Videos",
      value: mockVideos.length.toString(),
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
                    Advanced Analytics
                  </h1>
                  <p className="text-white/60 text-lg">
                    Deep dive into your content performance and insights
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Filters Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard variant="interactive" size="lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Filters & Controls
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/70 mb-2 block">
                      Date Range
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white/[0.05] border-white/[0.15] text-white hover:bg-white/[0.08]"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from
                            ? format(dateRange.from, "MMM dd")
                            : "Start date"}{" "}
                          -{" "}
                          {dateRange.to
                            ? format(dateRange.to, "MMM dd")
                            : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-black/90 backdrop-blur-xl border-white/20"
                        align="start"
                      >
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={(range) =>
                            setDateRange(
                              range || { from: undefined, to: undefined },
                            )
                          }
                          numberOfMonths={2}
                          className="text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/70 mb-2 block">
                      Content Format
                    </label>
                    <Select
                      value={selectedFormat}
                      onValueChange={setSelectedFormat}
                    >
                      <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                        <SelectItem value="all">All Formats</SelectItem>
                        <SelectItem value="short">Shorts Only</SelectItem>
                        <SelectItem value="long">Long-form Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/70 mb-2 block">
                      Primary Metric
                    </label>
                    <Select
                      value={selectedMetric}
                      onValueChange={setSelectedMetric}
                    >
                      <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                        <SelectItem value="views">Views</SelectItem>
                        <SelectItem value="engagement">
                          Engagement Rate
                        </SelectItem>
                        <SelectItem value="watchTime">Watch Time</SelectItem>
                        <SelectItem value="ctr">Click-through Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/70 mb-2 block">
                      Sort By
                    </label>
                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="flex-1 bg-white/[0.05] border-white/[0.15] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                          <SelectItem value="publishedAt">
                            Date Published
                          </SelectItem>
                          <SelectItem value="views">Views</SelectItem>
                          <SelectItem value="likes">Likes</SelectItem>
                          <SelectItem value="engagementRate">
                            Engagement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                        }
                        className="px-3 bg-white/[0.05] border-white/[0.15] text-white hover:bg-white/[0.08]"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/70 mb-2 block">
                      Search Videos
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/[0.05] border-white/[0.15] text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
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
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Performance Trends Chart */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GlassCard variant="interactive" size="lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Performance Trends
                      </h3>
                      <p className="text-white/60">
                        Detailed analytics over time
                      </p>
                    </div>
                  </div>

                  <Tabs defaultValue="views" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3 bg-white/[0.05]">
                      <TabsTrigger value="views" className="text-white/70">
                        Views
                      </TabsTrigger>
                      <TabsTrigger value="engagement" className="text-white/70">
                        Engagement
                      </TabsTrigger>
                      <TabsTrigger value="comparison" className="text-white/70">
                        Comparison
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="views">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={extendedData}>
                            <defs>
                              <linearGradient
                                id="shortsGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#ff6b6b"
                                  stopOpacity={0.3}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#ff6b6b"
                                  stopOpacity={0.0}
                                />
                              </linearGradient>
                              <linearGradient
                                id="longformGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#64b5f6"
                                  stopOpacity={0.3}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#64b5f6"
                                  stopOpacity={0.0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) =>
                                format(new Date(value), "MMM dd")
                              }
                              stroke="rgba(255,255,255,0.5)"
                            />
                            <YAxis
                              tickFormatter={formatNumber}
                              stroke="rgba(255,255,255,0.5)"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="shortsViews"
                              stackId="1"
                              stroke="#ff6b6b"
                              fill="url(#shortsGradient)"
                              strokeWidth={2}
                            />
                            <Area
                              type="monotone"
                              dataKey="longFormViews"
                              stackId="1"
                              stroke="#64b5f6"
                              fill="url(#longformGradient)"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>

                    <TabsContent value="engagement">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={extendedData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                              dataKey="date"
                              tickFormatter={(value) =>
                                format(new Date(value), "MMM dd")
                              }
                              stroke="rgba(255,255,255,0.5)"
                            />
                            <YAxis
                              tickFormatter={(value) => `${value}%`}
                              stroke="rgba(255,255,255,0.5)"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                              type="monotone"
                              dataKey="shortsEngagement"
                              stroke="#ff6b6b"
                              strokeWidth={3}
                              dot={{ fill: "#ff6b6b", strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="longFormEngagement"
                              stroke="#64b5f6"
                              strokeWidth={3}
                              dot={{ fill: "#64b5f6", strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>

                    <TabsContent value="comparison">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart data={scatterData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                              type="number"
                              dataKey="x"
                              name="Views"
                              tickFormatter={formatNumber}
                              stroke="rgba(255,255,255,0.5)"
                            />
                            <YAxis
                              type="number"
                              dataKey="y"
                              name="Engagement Rate"
                              tickFormatter={(value) => `${value}%`}
                              stroke="rgba(255,255,255,0.5)"
                            />
                            <Tooltip
                              content={({ payload }) => {
                                if (payload && payload[0]) {
                                  const data = payload[0].payload;
                                  return (
                                    <GlassCard className="p-3">
                                      <div className="text-white text-sm">
                                        <div className="font-medium mb-1">
                                          {data.title}
                                        </div>
                                        <div>Views: {formatNumber(data.x)}</div>
                                        <div>
                                          Engagement: {data.y.toFixed(1)}%
                                        </div>
                                        <div>
                                          Duration: {formatDuration(data.z)}
                                        </div>
                                      </div>
                                    </GlassCard>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Scatter
                              name="Shorts"
                              data={scatterData.filter(
                                (item) => item.format === "short",
                              )}
                              fill="#ff6b6b"
                            />
                            <Scatter
                              name="Long-form"
                              data={scatterData.filter(
                                (item) => item.format === "long",
                              )}
                              fill="#64b5f6"
                            />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </GlassCard>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <GlassCard variant="accent" size="lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        AI Insights
                      </h3>
                      <p className="text-white/60 text-sm">
                        Advanced recommendations
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockAIInsights.map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-all cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {insight.type === "performance" && (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            )}
                            {insight.type === "strategy" && (
                              <Target className="h-4 w-4 text-blue-400" />
                            )}
                            {insight.type === "trending" && (
                              <Activity className="h-4 w-4 text-orange-400" />
                            )}
                            {insight.type === "optimization" && (
                              <Brain className="h-4 w-4 text-purple-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-white/60 text-xs leading-relaxed">
                              {insight.content}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="text-xs text-white/40">
                                {Math.round(insight.confidenceScore * 100)}%
                                confidence
                              </div>
                              {!insight.isRead && (
                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Video Performance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard variant="interactive" size="lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Video Performance
                    </h3>
                    <p className="text-white/60">
                      Detailed breakdown of your content (
                      {filteredVideos.length} videos)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white/[0.05] rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-white/[0.1] text-white" : "text-white/60"}`}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-white/[0.1] text-white" : "text-white/60"}`}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-20 h-14 bg-gradient-to-br from-white/[0.1] to-white/[0.05] rounded-lg flex items-center justify-center group-hover:from-red-500/20 group-hover:to-blue-500/20 transition-all">
                        <PlayCircle className="h-6 w-6 text-white/60 group-hover:text-white transition-colors" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate mb-1">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(video.duration)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(video.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {formatNumber(video.likes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {formatNumber(video.comments)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge
                          variant={
                            video.format === "short"
                              ? "destructive"
                              : "secondary"
                          }
                          className={
                            video.format === "short"
                              ? "bg-red-500/20 text-red-400 border-red-500/30 mb-2"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/30 mb-2"
                          }
                        >
                          {video.format === "short" ? "Short" : "Long"}
                        </Badge>
                        <div className="text-sm font-semibold text-white">
                          {video.engagementRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-white/60">
                          {video.ctr.toFixed(1)}% CTR
                        </div>
                      </div>

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
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/[0.1]">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
};

export default Analytics;
