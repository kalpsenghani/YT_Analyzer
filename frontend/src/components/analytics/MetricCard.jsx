import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

export const MetricCard = ({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  color = "text-slate-900",
  badge,
  delay = 0,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-success" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-error" />;
      default:
        return <Minus className="h-3 w-3 text-slate-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-error";
      default:
        return "text-slate-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-slate-500">{title}</p>
                {badge && <Badge variant="outline">{badge}</Badge>}
              </div>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              {change !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon()}
                  <span className={`text-xs ${getTrendColor()}`}>
                    {change > 0 ? "+" : ""}
                    {change.toFixed(1)}% vs last period
                  </span>
                </div>
              )}
            </div>
            {icon && (
              <div className="h-12 w-12 bg-gradient-to-r from-youtube-red/10 to-professional-blue/10 rounded-lg flex items-center justify-center ml-4">
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
