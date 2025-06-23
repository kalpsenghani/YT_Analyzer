export interface Video {
  id: string;
  title: string;
  duration: number; // in seconds
  format: "short" | "long";
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  thumbnailUrl: string;
  engagementRate: number;
  ctr: number;
}

export interface ChannelStats {
  totalVideos: number;
  totalViews: number;
  totalSubscribers: number;
  avgEngagementRate: number;
  shortsCount: number;
  longFormCount: number;
  shortsViews: number;
  longFormViews: number;
}

export interface AnalyticsData {
  date: string;
  shortsViews: number;
  longFormViews: number;
  shortsEngagement: number;
  longFormEngagement: number;
  shortsWatchTime: number;
  longFormWatchTime: number;
}

export interface AIInsight {
  id: string;
  type: "performance" | "strategy" | "trending" | "optimization";
  title: string;
  content: string;
  confidenceScore: number;
  isRead: boolean;
  createdAt: string;
}

export const mockChannelStats: ChannelStats = {
  totalVideos: 247,
  totalViews: 2847392,
  totalSubscribers: 45230,
  avgEngagementRate: 8.4,
  shortsCount: 156,
  longFormCount: 91,
  shortsViews: 1923847,
  longFormViews: 923545,
};

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "Quick Gaming Tips #shorts",
    duration: 45,
    format: "short",
    views: 125847,
    likes: 12847,
    comments: 1847,
    publishedAt: "2024-01-15T10:00:00Z",
    thumbnailUrl: "/placeholder.svg",
    engagementRate: 11.2,
    ctr: 8.9,
  },
  {
    id: "2",
    title: "Complete Guide to YouTube Analytics",
    duration: 1245,
    format: "long",
    views: 98234,
    likes: 8234,
    comments: 934,
    publishedAt: "2024-01-12T14:30:00Z",
    thumbnailUrl: "/placeholder.svg",
    engagementRate: 9.3,
    ctr: 12.4,
  },
  {
    id: "3",
    title: "Daily Motivation #shorts",
    duration: 30,
    format: "short",
    views: 203847,
    likes: 18923,
    comments: 2847,
    publishedAt: "2024-01-14T08:15:00Z",
    thumbnailUrl: "/placeholder.svg",
    engagementRate: 10.7,
    ctr: 9.2,
  },
  {
    id: "4",
    title: "Behind the Scenes: Making Content",
    duration: 892,
    format: "long",
    views: 76234,
    likes: 6834,
    comments: 723,
    publishedAt: "2024-01-10T16:45:00Z",
    thumbnailUrl: "/placeholder.svg",
    engagementRate: 9.9,
    ctr: 11.8,
  },
  {
    id: "5",
    title: "Life Hack #shorts",
    duration: 35,
    format: "short",
    views: 156923,
    likes: 14523,
    comments: 1923,
    publishedAt: "2024-01-13T12:20:00Z",
    thumbnailUrl: "/placeholder.svg",
    engagementRate: 10.5,
    ctr: 8.7,
  },
];

export const mockAnalyticsData: AnalyticsData[] = [
  {
    date: "2024-01-01",
    shortsViews: 45000,
    longFormViews: 23000,
    shortsEngagement: 9.2,
    longFormEngagement: 11.4,
    shortsWatchTime: 1200,
    longFormWatchTime: 15400,
  },
  {
    date: "2024-01-02",
    shortsViews: 52000,
    longFormViews: 19000,
    shortsEngagement: 8.9,
    longFormEngagement: 10.8,
    shortsWatchTime: 1350,
    longFormWatchTime: 12800,
  },
  {
    date: "2024-01-03",
    shortsViews: 48000,
    longFormViews: 31000,
    shortsEngagement: 9.8,
    longFormEngagement: 12.1,
    shortsWatchTime: 1280,
    longFormWatchTime: 18900,
  },
  {
    date: "2024-01-04",
    shortsViews: 61000,
    longFormViews: 28000,
    shortsEngagement: 10.2,
    longFormEngagement: 11.7,
    shortsWatchTime: 1520,
    longFormWatchTime: 17200,
  },
  {
    date: "2024-01-05",
    shortsViews: 58000,
    longFormViews: 25000,
    shortsEngagement: 9.6,
    longFormEngagement: 10.9,
    shortsWatchTime: 1440,
    longFormWatchTime: 15500,
  },
  {
    date: "2024-01-06",
    shortsViews: 67000,
    longFormViews: 22000,
    shortsEngagement: 10.8,
    longFormEngagement: 11.2,
    shortsWatchTime: 1680,
    longFormWatchTime: 13800,
  },
  {
    date: "2024-01-07",
    shortsViews: 72000,
    longFormViews: 35000,
    shortsEngagement: 11.1,
    longFormEngagement: 12.9,
    shortsWatchTime: 1800,
    longFormWatchTime: 21200,
  },
  {
    date: "2024-01-08",
    shortsViews: 65000,
    longFormViews: 29000,
    shortsEngagement: 10.4,
    longFormEngagement: 11.8,
    shortsWatchTime: 1620,
    longFormWatchTime: 18100,
  },
  {
    date: "2024-01-09",
    shortsViews: 59000,
    longFormViews: 26000,
    shortsEngagement: 9.7,
    longFormEngagement: 11.3,
    shortsWatchTime: 1480,
    longFormWatchTime: 16300,
  },
  {
    date: "2024-01-10",
    shortsViews: 63000,
    longFormViews: 32000,
    shortsEngagement: 10.0,
    longFormEngagement: 12.5,
    shortsWatchTime: 1570,
    longFormWatchTime: 19800,
  },
  {
    date: "2024-01-11",
    shortsViews: 69000,
    longFormViews: 27000,
    shortsEngagement: 10.6,
    longFormEngagement: 11.1,
    shortsWatchTime: 1720,
    longFormWatchTime: 16900,
  },
  {
    date: "2024-01-12",
    shortsViews: 74000,
    longFormViews: 38000,
    shortsEngagement: 11.3,
    longFormEngagement: 13.2,
    shortsWatchTime: 1850,
    longFormWatchTime: 22700,
  },
  {
    date: "2024-01-13",
    shortsViews: 71000,
    longFormViews: 33000,
    shortsEngagement: 10.9,
    longFormEngagement: 12.0,
    shortsWatchTime: 1780,
    longFormWatchTime: 20100,
  },
  {
    date: "2024-01-14",
    shortsViews: 76000,
    longFormViews: 30000,
    shortsEngagement: 11.5,
    longFormEngagement: 11.6,
    shortsWatchTime: 1900,
    longFormWatchTime: 18500,
  },
  {
    date: "2024-01-15",
    shortsViews: 82000,
    longFormViews: 41000,
    shortsEngagement: 12.1,
    longFormEngagement: 13.8,
    shortsWatchTime: 2050,
    longFormWatchTime: 24300,
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: "1",
    type: "performance",
    title: "Shorts Outperforming Long-Form by 3.2x",
    content:
      "Your YouTube Shorts are generating 3.2x more views than long-form content. Shorts about gaming tips and daily motivation are your top performers, averaging 11.2% engagement rate vs 9.8% for long-form videos.",
    confidenceScore: 0.92,
    isRead: false,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    type: "strategy",
    title: "Optimal Posting Schedule Identified",
    content:
      "Data shows your Shorts perform 25% better when posted between 8-10 AM on weekdays. Consider scheduling more content during these peak engagement windows to maximize reach.",
    confidenceScore: 0.87,
    isRead: true,
    createdAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    type: "trending",
    title: "Gaming Content Trending Upward",
    content:
      "Gaming-related Shorts show 45% higher engagement rates compared to other categories. The gaming niche is experiencing significant growth - consider increasing gaming content production.",
    confidenceScore: 0.89,
    isRead: false,
    createdAt: "2024-01-13T11:20:00Z",
  },
  {
    id: "4",
    type: "optimization",
    title: "Improve Long-Form Retention",
    content:
      "Long-form videos have an average watch time of only 34%. Consider adding more engaging hooks in the first 15 seconds and breaking content into shorter segments to improve retention.",
    confidenceScore: 0.84,
    isRead: true,
    createdAt: "2024-01-12T14:45:00Z",
  },
];

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const calculateEngagementRate = (
  likes: number,
  comments: number,
  views: number,
): number => {
  return ((likes + comments) / views) * 100;
};

export const generateTrendData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    data.push({
      date: date.toISOString().split("T")[0],
      shortsViews: Math.floor(Math.random() * 30000) + 45000,
      longFormViews: Math.floor(Math.random() * 20000) + 20000,
      shortsEngagement: Math.random() * 3 + 9,
      longFormEngagement: Math.random() * 4 + 10,
    });
  }

  return data;
};
