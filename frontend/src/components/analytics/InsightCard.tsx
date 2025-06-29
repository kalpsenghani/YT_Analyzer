import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Brain, TrendingUp, Target, Activity } from "lucide-react";

interface InsightCardProps {
  insight: {
    id: string;
    type: string;
    title: string;
    content: string;
    confidenceScore: number;
    isRead: boolean;
    createdAt: string;
  };
  onMarkAsRead?: (id: string) => void;
  delay?: number;
}

export const InsightCard = ({
  insight,
  onMarkAsRead,
  delay = 0,
}: InsightCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "performance":
        return <TrendingUp className="h-4 w-4" />;
      case "strategy":
        return <Target className="h-4 w-4" />;
      case "trending":
        return <Activity className="h-4 w-4" />;
      case "optimization":
        return <Brain className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "bg-success/10 text-success border-success/20";
      case "strategy":
        return "bg-professional-blue/10 text-professional-blue border-professional-blue/20";
      case "trending":
        return "bg-warning/10 text-warning border-warning/20";
      case "optimization":
        return "bg-youtube-red/10 text-youtube-red border-youtube-red/20";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card
        className={`border-0 shadow-md hover:shadow-lg transition-all duration-200 ${!insight.isRead ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor(insight.type)}>
                {getTypeIcon(insight.type)}
                <span className="ml-1 capitalize">{insight.type}</span>
              </Badge>
              {!insight.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
            <div className="text-xs text-slate-500">
              {Math.round(insight.confidenceScore * 100)}% confidence
            </div>
          </div>
          <CardTitle className="text-lg font-semibold leading-tight">
            {insight.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {insight.content}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {new Date(insight.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
            {!insight.isRead && onMarkAsRead && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsRead(insight.id)}
                className="text-xs"
              >
                Mark as Read
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
