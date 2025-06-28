import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Youtube, 
  Link, 
  RefreshCw, 
  Unlink, 
  CheckCircle, 
  AlertCircle,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const YouTubeConnection = () => {
  const {
    connectedChannels,
    isYouTubeLoading,
    isSyncing,
    getYouTubeAuthUrl,
    handleYouTubeCallback,
    fetchConnectedChannels,
    syncChannelData,
    disconnectChannel,
    error,
    clearError
  } = useAppStore();

  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (connectedChannels.length === 0) {
      fetchConnectedChannels();
    }
  }, [fetchConnectedChannels, connectedChannels.length]);

  const handleConnectYouTube = async () => {
    setIsConnecting(true);
    clearError();
    try {
      const authUrl = await getYouTubeAuthUrl();
      const popup = window.open(
        authUrl,
        'youtube-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      // ... rest of popup logic
    } catch (error) {
      setIsConnecting(false);
    }
  };

  const handleSyncChannel = async (channelId: number) => {
    await syncChannelData(channelId);
  };

  const handleDisconnectChannel = async (channelId: number) => {
    await disconnectChannel(channelId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  if (isYouTubeLoading) {
    return (
      <GlassCard className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Youtube className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">YouTube Connection</h3>
              <p className="text-white/70 text-sm">
                {connectedChannels.length > 0 
                  ? `${connectedChannels.length} channel${connectedChannels.length > 1 ? 's' : ''} connected`
                  : 'No channels connected'
                }
              </p>
            </div>
          </div>
          
          {connectedChannels.length === 0 && (
            <Button
              onClick={handleConnectYouTube}
              disabled={isConnecting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Link className="h-4 w-4 mr-2" />
                  Connect YouTube
                </>
              )}
            </Button>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-red-400 text-sm">{error}</span>
          </motion.div>
        )}
      </GlassCard>

      {/* Connected Channels */}
      {connectedChannels.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Connected Channels</h4>
          {connectedChannels.map((channel) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Youtube className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-medium">{channel.channelTitle}</h5>
                        <p className="text-white/60 text-sm">{channel.channelId}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    </div>

                    {/* Channel Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-400" />
                        <div>
                          <p className="text-white/60 text-xs">Subscribers</p>
                          <p className="text-white font-medium">
                            {channel.subscriberCount ? formatNumber(channel.subscriberCount) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-green-400" />
                        <div>
                          <p className="text-white/60 text-xs">Total Views</p>
                          <p className="text-white font-medium">
                            {channel.viewCount ? formatNumber(channel.viewCount) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                        <div>
                          <p className="text-white/60 text-xs">Videos</p>
                          <p className="text-white font-medium">
                            {channel.videoCount ? formatNumber(channel.videoCount) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <div>
                          <p className="text-white/60 text-xs">Last Sync</p>
                          <p className="text-white font-medium">
                            {channel.lastSyncAt ? formatDate(channel.lastSyncAt) : 'Never'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Videos Preview */}
                    {channel.videos && channel.videos.length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-white/80 text-sm font-medium mb-2">Recent Videos</h6>
                        <div className="space-y-2">
                          {channel.videos.slice(0, 3).map((video: any) => (
                            <div key={video.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm truncate">{video.title}</p>
                                <div className="flex items-center space-x-4 text-xs text-white/60">
                                  <span className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    {formatNumber(video.viewCount)}
                                  </span>
                                  <span className="flex items-center">
                                    <Heart className="h-3 w-3 mr-1" />
                                    {formatNumber(video.likeCount)}
                                  </span>
                                  <span className="flex items-center">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    {formatNumber(video.commentCount)}
                                  </span>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {video.isShort ? 'Short' : 'Video'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      onClick={() => handleSyncChannel(channel.id)}
                      disabled={isSyncing}
                      variant="outline"
                      size="sm"
                      className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                    >
                      {isSyncing ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => handleDisconnectChannel(channel.id)}
                      variant="outline"
                      size="sm"
                      className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                    >
                      <Unlink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}; 