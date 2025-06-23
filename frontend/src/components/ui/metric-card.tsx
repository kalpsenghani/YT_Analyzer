import { GlassCard } from "./glass-card";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  index?: number;
  accent?: boolean;
}

export const MetricCard = ({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  index = 0,
  accent = false,
}: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-400" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-blue-400" />;
      default:
        return <Minus className="h-3 w-3 text-white/40" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-red-400";
      case "down":
        return "text-blue-400";
      default:
        return "text-white/40";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
    >
      <GlassCard
        variant={accent ? "accent" : "interactive"}
        className="group cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-white/60 mb-2">{title}</p>
            <motion.p
              className="text-3xl font-bold text-white mb-3"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            >
              {value}
            </motion.p>
            {change !== undefined && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {change > 0 ? "+" : ""}
                  {change.toFixed(1)}%
                </span>
                <span className="text-white/40 text-sm">vs last month</span>
              </motion.div>
            )}
          </div>

          {/* Icon with glassmorphism background */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.1] border border-white/[0.15] backdrop-blur-sm flex items-center justify-center group-hover:bg-white/[0.15] transition-all duration-300">
              <div className="text-white/80 group-hover:text-white transition-colors">
                {icon}
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
          </motion.div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      </GlassCard>
    </motion.div>
  );
};
