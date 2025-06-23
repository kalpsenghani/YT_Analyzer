import { useState } from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  const recentData = mockAnalyticsData.slice(-7);
  const pieData = [
    { name: "Shorts", value: mockChannelStats.shortsViews, color: "#ff6b6b" },
    {
      name: "Long-form",
      value: mockChannelStats.longFormViews,
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
                value={mockChannelStats.totalVideos.toString()}
                change={12.5}
                trend="up"
                icon={<Video className="h-6 w-6" />}
                index={0}
              />
              <MetricCard
                title="Total Views"
                value={formatNumber(mockChannelStats.totalViews)}
                change={28.3}
                trend="up"
                icon={<Eye className="h-6 w-6" />}
                index={1}
              />
              <MetricCard
                title="Subscribers"
                value={formatNumber(mockChannelStats.totalSubscribers)}
                change={15.7}
                trend="up"
                icon={<Users className="h-6 w-6" />}
                index={2}
              />
              <MetricCard
                title="Engagement Rate"
                value={`${mockChannelStats.avgEngagementRate}%`}
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
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-white/70 text-sm">Shorts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-white/70 text-sm">Long-form</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
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
                            new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
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
                </GlassCard>
              </motion.div>

              {/* Content Distribution & AI Insights */}
              <div className="space-y-6">
                {/* Content Distribution */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <GlassCard variant="interactive">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Content Split
                        </h3>
                        <p className="text-white/60 text-sm">Views by format</p>
                      </div>
                    </div>

                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="value"
                            stroke="none"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ payload }) => {
                              if (payload && payload[0]) {
                                return (
                                  <GlassCard className="p-2">
                                    <div className="text-white text-sm">
                                      {payload[0].name}:{" "}
                                      {formatNumber(Number(payload[0].value))}
                                    </div>
                                  </GlassCard>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-white/70 text-sm">
                          Shorts (
                          {Math.round(
                            (mockChannelStats.shortsViews /
                              mockChannelStats.totalViews) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="text-white/70 text-sm">
                          Long-form (
                          {Math.round(
                            (mockChannelStats.longFormViews /
                              mockChannelStats.totalViews) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* AI Insights Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <GlassCard variant="accent">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          AI Insights
                        </h3>
                        <p className="text-white/60 text-sm">
                          Smart recommendations
                        </p>
                      </div>
                      {unreadInsights.length > 0 && (
                        <Badge className="ml-auto bg-red-500/20 text-red-400 border-red-500/30">
                          {unreadInsights.length} new
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      {mockAIInsights.slice(0, 2).map((insight, index) => (
                        <motion.div
                          key={insight.id}
                          className="p-4 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-all cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
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
                              <h4 className="text-white font-medium text-sm mb-1 line-clamp-1">
                                {insight.title}
                              </h4>
                              <p className="text-white/60 text-xs line-clamp-2">
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

                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-white/70 hover:text-white hover:bg-white/[0.1] border border-white/20"
                      onClick={() => navigate("/analytics")}
                    >
                      View All Insights
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </GlassCard>
                </motion.div>
              </div>
            </div>

            {/* Recent Videos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GlassCard variant="interactive" size="lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Recent Videos
                    </h3>
                    <p className="text-white/60">
                      Your latest content performance
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/[0.1]"
                    onClick={() => navigate("/analytics")}
                  >
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  {mockVideos.slice(0, 4).map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
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
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          }
                        >
                          {video.format === "short" ? "Short" : "Long"}
                        </Badge>
                        <div className="text-sm text-white/60 mt-1">
                          {video.engagementRate.toFixed(1)}% engagement
                        </div>
                      </div>
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

export default Dashboard;
