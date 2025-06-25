import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Settings,
  User,
  Menu,
  LogOut,
  ChevronDown,
  Edit,
  CheckCircle,
  Clock,
  Zap,
  TrendingUp,
  BarChart3,
  X,
} from "lucide-react";
import { GlassCard } from "./glass-card";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/lib/store";

interface NavigationHeaderProps {
  onMenuToggle?: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "insight";
  time: string;
  isRead: boolean;
  icon: React.ReactNode;
}

export const NavigationHeader = ({ onMenuToggle }: NavigationHeaderProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New AI Insight Available",
      message:
        "Your latest video performance analysis is ready with actionable recommendations.",
      type: "insight",
      time: "2 minutes ago",
      isRead: false,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "Weekly Report Generated",
      message:
        "Your weekly analytics report for January 15-21 has been generated and is ready for download.",
      type: "success",
      time: "1 hour ago",
      isRead: false,
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Channel Performance Alert",
      message:
        "Your shorts are performing 45% better than usual this week. Consider increasing production.",
      type: "info",
      time: "3 hours ago",
      isRead: false,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Data Sync Complete",
      message: "Successfully synced latest data from your YouTube channel.",
      type: "success",
      time: "Yesterday",
      isRead: true,
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Scheduled Report Reminder",
      message: "Your monthly report will be generated tomorrow at 9:00 AM.",
      type: "info",
      time: "Yesterday",
      isRead: true,
      icon: <Clock className="h-4 w-4" />,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Analytics", path: "/analytics" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ];

  const unreadNotifications = notifications.filter((n) => !n.isRead);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] }}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          {!scrolled ? (
            // Default Slim Header
            <motion.div
              key="slim-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-white/[0.08]"
            >
              <GlassCard
                variant="default"
                className="rounded-none border-0 border-b border-white/[0.08] backdrop-blur-[20px]"
              >
                <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-1">
                  {/* Left Section - Logo Only */}
                  <div className="flex items-center gap-4">
                    {/* Mobile menu toggle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMenuToggle}
                      className="md:hidden text-white/80 hover:text-white hover:bg-white/[0.1] h-8 w-8 p-0"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>

                    {/* Logo Only */}
                    <motion.div
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to="/dashboard">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          </div>
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-500 to-blue-500 blur-md opacity-30 -z-10" />
                        </div>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Center Section - Navigation */}
                  <motion.nav
                    className="hidden lg:flex items-center gap-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link
                          to={item.path}
                          className="text-white/70 hover:text-white transition-all duration-200 relative group text-sm font-medium py-1 px-3 rounded-lg hover:bg-white/[0.05] block"
                        >
                          {item.label}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>

                  {/* Right Section - Profile Only */}
                  <div className="flex items-center">
                    <ProfileDropdown
                      notifications={notifications}
                      onMarkAsRead={markAsRead}
                      onMarkAllAsRead={markAllAsRead}
                      unreadCount={unreadNotifications.length}
                      onLogout={handleLogout}
                      user={user}
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            // Scrolled Island Header
            <motion.div
              key="island-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between gap-6">
                  {/* Left Island - Logo Only */}
                  <motion.div
                    layout
                    className="flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <GlassCard
                      variant="interactive"
                      className="px-4 py-2 flex items-center"
                    >
                      <Link to="/dashboard">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        </div>
                      </Link>
                    </GlassCard>
                  </motion.div>

                  {/* Center Island - Navigation Only */}
                  <motion.div
                    layout
                    className="flex items-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <GlassCard
                      variant="interactive"
                      className="px-8 py-2 flex items-center gap-6"
                    >
                      <nav className="flex items-center gap-6">
                        {navigationItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="text-white/70 hover:text-white transition-all duration-200 text-sm font-medium relative group py-1 px-3 rounded-lg hover:bg-white/[0.05]"
                          >
                            {item.label}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                          </Link>
                        ))}
                      </nav>
                    </GlassCard>
                  </motion.div>

                  {/* Right Island - Profile Only */}
                  <motion.div
                    layout
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <GlassCard
                      variant="interactive"
                      className="px-4 py-2 flex items-center"
                    >
                      <ProfileDropdown
                        notifications={notifications}
                        onMarkAsRead={markAsRead}
                        onMarkAllAsRead={markAllAsRead}
                        unreadCount={unreadNotifications.length}
                        onLogout={handleLogout}
                        user={user}
                      />
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Profile Dropdown Component with Notifications
interface ProfileDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  unreadCount: number;
  onLogout: () => void;
  user: any;
  compact?: boolean;
}

const ProfileDropdown = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  unreadCount,
  onLogout,
  user,
  compact = false,
}: ProfileDropdownProps) => {
  const getNotificationTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400 bg-green-500/20";
      case "warning":
        return "text-yellow-400 bg-yellow-500/20";
      case "insight":
        return "text-purple-400 bg-purple-500/20";
      default:
        return "text-blue-400 bg-blue-500/20";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white/80 hover:text-white hover:bg-white/[0.1] relative group h-8 flex items-center gap-2 px-2"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center relative">
            <User className="h-4 w-4 text-white" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </div>
            )}
          </div>
          {!compact && (
            <ChevronDown className="h-3 w-3 text-white/60 group-hover:text-white transition-colors" />
          )}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg -z-10" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-black/90 backdrop-blur-xl border-white/20 text-white p-0"
      >
        {/* Profile Section */}
        <DropdownMenuLabel className="text-white/90 p-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">{user?.email || 'User'}</p>
              <p className="text-xs text-white/60">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="px-4">
          <Separator className="bg-white/20" />
        </div>

        {/* Profile Actions */}
        <div className="py-2">
          <DropdownMenuItem
            asChild
            className="text-white/80 hover:text-white hover:bg-white/[0.1] focus:bg-white/[0.1] focus:text-white cursor-pointer px-4 py-2"
          >
            <Link to="/settings">
              <Edit className="h-4 w-4 mr-3" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/[0.1] focus:bg-white/[0.1] focus:text-white cursor-pointer px-4 py-2">
            <Settings className="h-4 w-4 mr-3" />
            <span>Settings</span>
          </DropdownMenuItem>
        </div>

        <div className="px-4">
          <Separator className="bg-white/20" />
        </div>

        {/* Notifications Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-white/70" />
              <h4 className="text-sm font-medium text-white">Notifications</h4>
              {unreadCount > 0 && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-blue-400 hover:text-blue-300 text-xs h-6 px-2"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notification List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <motion.div
                key={notification.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  !notification.isRead
                    ? "bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20"
                    : "bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08]"
                }`}
                onClick={() =>
                  !notification.isRead && onMarkAsRead(notification.id)
                }
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${getNotificationTypeColor(notification.type)} mt-0.5`}
                  >
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h5
                        className={`font-medium text-xs ${!notification.isRead ? "text-white" : "text-white/80"}`}
                      >
                        {notification.title}
                      </h5>
                      {!notification.isRead && (
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-white/60 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {notifications.length > 5 && (
            <Button
              variant="ghost"
              className="w-full text-white/70 hover:text-white hover:bg-white/[0.1] text-xs mt-3 h-8"
            >
              View all notifications
            </Button>
          )}
        </div>

        <div className="px-4">
          <Separator className="bg-white/20" />
        </div>

        {/* Sign Out */}
        <div className="py-2">
          <DropdownMenuItem 
            onClick={onLogout}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/[0.1] focus:bg-red-500/[0.1] focus:text-red-300 cursor-pointer px-4 py-2"
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
