import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageCircle,
  PlayCircle,
  Video,
  Zap,
  Activity,
  Clock,
  Target,
  Brain,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  mockChannelStats,
  mockVideos,
  mockAnalyticsData,
  mockAIInsights,
  formatNumber,
  formatDuration,
} from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    fetchAnalytics, 
    fetchSummary, 
    analytics, 
    summary, 
    isAnalyticsLoading, 
    error,
    isAuthenticated 
  } = useAppStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics(1, 10);
      fetchSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Use real data if available, fallback to mock data
  const channelStats = summary ? {
    totalVideos: summary.summary.totalVideos,
    totalViews: summary.summary.totalViews,
    totalSubscribers: 0, // Not in API summary
    avgEngagementRate: summary.summary.avgLikes / summary.summary.avgViews * 100 || 0,
    shortsViews: summary.summary.totalViews * 0.6, // Estimate from mock data ratio
    longFormViews: summary.summary.totalViews * 0.4, // Estimate from mock data ratio
  } : mockChannelStats;

  const recentData = mockAnalyticsData.slice(-7);
  const pieData = [
    { name: "Shorts", value: channelStats.shortsViews, color: "#ff6b6b" },
    {
      name: "Long-form",
      value: channelStats.longFormViews,
      color: "#64b5f6",
    },
  ];

  const unreadInsights = mockAIInsights.filter((insight) => !insight.isRead);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <GlassCard className="p-3 border border-white/20">
          <p className="text-white/90 font-medium mb-2">
            {new Date(label).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/70">
                {entry.name === "shortsViews" ? "Shorts" : "Long-form"}:
              </span>
              <span className="text-white font-medium">
                {formatNumber(entry.value)}
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
                    Analytics Dashboard
                  </h1>
                  <p className="text-white/60 text-lg">
                    Real-time insights for your YouTube channel performance
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {["24h", "7d", "30d", "90d"].map((timeframe) => (
                    <Button
                      key={timeframe}
                      variant={
                        selectedTimeframe === timeframe ? "default" : "ghost"
                      }
                      size="sm"
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={
                        selectedTimeframe === timeframe
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
                          : "text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                      }
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Videos"
                value={channelStats.totalVideos.toString()}
                change={12.5}
                trend="up"
                icon={<Video className="h-6 w-6" />}
                index={0}
              />
              <MetricCard
                title="Total Views"
                value={formatNumber(channelStats.totalViews)}
                change={28.3}
                trend="up"
                icon={<Eye className="h-6 w-6" />}
                index={1}
              />
              <MetricCard
                title="Subscribers"
                value={formatNumber(channelStats.totalSubscribers)}
                change={15.7}
                trend="up"
                icon={<Users className="h-6 w-6" />}
                index={2}
              />
              <MetricCard
                title="Engagement Rate"
                value={`${channelStats.avgEngagementRate}%`}
                change={5.2}
                trend="up"
                icon={<TrendingUp className="h-6 w-6" />}
                index={3}
                accent={true}
              />
            </div>

            {/* Main Charts Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Performance Chart */}
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
                        Shorts vs Long-form content over time
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/[0.1]"
                      onClick={() => navigate("/analytics")}
                    >
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={recentData}>
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
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="longFormGradient"
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
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.5)"
                        fontSize={12}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="shortsViews"
                        stroke="#ff6b6b"
                        fill="url(#shortsGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="longFormViews"
                        stroke="#64b5f6"
                        fill="url(#longFormGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </GlassCard>
              </motion.div>

              {/* Content Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <GlassCard variant="interactive" size="lg">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Content Distribution
                    </h3>
                    <p className="text-white/60">
                      Views by content type
                    </p>
                  </div>

                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => formatNumber(value)}
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="mt-4 space-y-2">
                    {pieData.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-white/70">{item.name}</span>
                        </div>
                        <span className="text-white font-medium">
                          {formatNumber(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Recent Analytics and AI Insights */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <GlassCard variant="interactive" size="lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Recent Analytics
                      </h3>
                      <p className="text-white/60">
                        Latest performance data
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/[0.1]"
                      onClick={() => navigate("/analytics")}
                    >
                      View All
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {analytics.slice(0, 5).map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/[0.05] border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-white/80" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-sm">
                              {item.title}
                            </h4>
                            <p className="text-white/60 text-xs">
                              {formatNumber(item.views)} views
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium text-sm">
                            {formatNumber(item.likes)}
                          </div>
                          <div className="text-white/60 text-xs">likes</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <GlassCard variant="interactive" size="lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        AI Insights
                      </h3>
                      <p className="text-white/60">
                        Intelligent recommendations
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Powered
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {unreadInsights.slice(0, 3).map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                            <Brain className="h-4 w-4 text-purple-300" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-white/70 text-xs leading-relaxed">
                              {insight.content}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className="text-xs border-purple-500/30 text-purple-300"
                              >
                                {insight.type}
                              </Badge>
                              <span className="text-white/50 text-xs">
                                {Math.round(insight.confidenceScore * 100)}% confidence
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    >
                      View All Insights
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
};

export default Dashboard;
