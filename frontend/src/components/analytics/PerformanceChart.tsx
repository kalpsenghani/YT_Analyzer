import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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
  ComposedChart,
} from "recharts";
import { TrendingUp, Download, Maximize } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface PerformanceChartProps {
  data: Array<{
    date: string;
    shortsViews: number;
    longFormViews: number;
    shortsEngagement: number;
    longFormEngagement: number;
    shortsWatchTime?: number;
    longFormWatchTime?: number;
  }>;
  title: string;
  description?: string;
  showTabs?: boolean;
  height?: number;
  onExport?: () => void;
  onExpand?: () => void;
}

export const PerformanceChart = ({
  data,
  title,
  description,
  showTabs = true,
  height = 320,
  onExport,
  onExpand,
}: PerformanceChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const chartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium mb-2">
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
              <span className="text-slate-600 dark:text-slate-400">
                {entry.name === "shortsViews"
                  ? "Shorts"
                  : entry.name === "longFormViews"
                    ? "Long-form"
                    : entry.name === "shortsEngagement"
                      ? "Shorts Engagement"
                      : "Long-form Engagement"}
                :
              </span>
              <span className="font-medium">
                {entry.name.includes("Views")
                  ? formatNumber(entry.value)
                  : `${entry.value.toFixed(1)}%`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-professional-blue" />
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onExpand && (
              <Button variant="outline" size="sm" onClick={onExpand}>
                <Maximize className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {showTabs ? (
            <Tabs defaultValue="views" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="views" className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-youtube-red rounded-full" />
                    <span className="text-sm">Shorts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-professional-blue rounded-full" />
                    <span className="text-sm">Long-form</span>
                  </div>
                </div>
                <div style={{ height }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis tickFormatter={formatNumber} />
                      <Tooltip content={chartTooltip} />
                      <Area
                        type="monotone"
                        dataKey="shortsViews"
                        stackId="1"
                        stroke="#FF0000"
                        fill="#FF0000"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="longFormViews"
                        stackId="1"
                        stroke="#1976D2"
                        fill="#1976D2"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-youtube-red rounded-full" />
                    <span className="text-sm">Shorts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-professional-blue rounded-full" />
                    <span className="text-sm">Long-form</span>
                  </div>
                </div>
                <div style={{ height }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip content={chartTooltip} />
                      <Line
                        type="monotone"
                        dataKey="shortsEngagement"
                        stroke="#FF0000"
                        strokeWidth={3}
                        dot={{ fill: "#FF0000", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="longFormEngagement"
                        stroke="#1976D2"
                        strokeWidth={3}
                        dot={{ fill: "#1976D2", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <Badge variant="outline" className="bg-youtube-red/10">
                    Performance Score = (Views ÷ 1000) × Engagement Rate
                  </Badge>
                </div>
                <div style={{ height }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          Number(value).toFixed(0),
                          name === "shortsPerformance"
                            ? "Shorts Score"
                            : "Long-form Score",
                        ]}
                        labelFormatter={(value) =>
                          format(new Date(value), "MMM dd, yyyy")
                        }
                        name="shortsPerformance"
                      />
                      <Bar
                        dataKey="longFormViews"
                        fill="#1976D2"
                        fillOpacity={0.6}
                        name="longFormPerformance"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div style={{ height }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip content={chartTooltip} />
                  <Area
                    type="monotone"
                    dataKey="shortsViews"
                    stackId="1"
                    stroke="#FF0000"
                    fill="#FF0000"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="longFormViews"
                    stackId="1"
                    stroke="#1976D2"
                    fill="#1976D2"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
