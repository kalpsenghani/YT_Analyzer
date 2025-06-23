import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  MoreHorizontal,
  TrendingUp,
  Share,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Video } from "@/lib/mockData";
import { formatNumber, formatDuration } from "@/lib/mockData";

interface VideoCardProps {
  video: Video;
  showActions?: boolean;
  compact?: boolean;
  delay?: number;
}

export const VideoCard = ({
  video,
  showActions = true,
  compact = false,
  delay = 0,
}: VideoCardProps) => {
  const engagementColor =
    video.engagementRate > 10
      ? "text-success"
      : video.engagementRate > 7
        ? "text-warning"
        : "text-slate-500";

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay }}
        className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        <div className="w-16 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <PlayCircle className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate mb-1">{video.title}</h4>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(video.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {formatNumber(video.likes)}
            </span>
            <span className={engagementColor}>
              {video.engagementRate.toFixed(1)}%
            </span>
          </div>
        </div>
        <Badge
          variant={video.format === "short" ? "destructive" : "secondary"}
          className="text-xs"
        >
          {video.format === "short" ? "Short" : "Long"}
        </Badge>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Thumbnail */}
            <div className="w-24 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <PlayCircle className="h-8 w-8 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base leading-tight line-clamp-2">
                  {video.title}
                </h3>
                {showActions && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share Video
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">
                    {formatNumber(video.views)}
                  </span>
                  <span className="text-slate-500">views</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Heart className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">
                    {formatNumber(video.likes)}
                  </span>
                  <span className="text-slate-500">likes</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MessageCircle className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">
                    {formatNumber(video.comments)}
                  </span>
                  <span className="text-slate-500">comments</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                  <span className={`font-medium ${engagementColor}`}>
                    {video.engagementRate.toFixed(1)}%
                  </span>
                  <span className="text-slate-500">engagement</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      video.format === "short" ? "destructive" : "secondary"
                    }
                  >
                    {video.format === "short" ? "YouTube Short" : "Long-form"}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {new Date(video.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {video.ctr.toFixed(1)}% CTR
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
