import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Database,
  Zap,
  Key,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  Link,
  Youtube,
  Calendar,
  Clock,
  BarChart3,
  FileText,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      weekly: true,
      insights: true,
      reports: false,
    },
    privacy: {
      profilePublic: false,
      dataSharing: true,
      analytics: true,
    },
    preferences: {
      timezone: "UTC",
      language: "en",
      currency: "USD",
      dateFormat: "MM/dd/yyyy",
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const connectedServices = [
    {
      name: "YouTube",
      status: "connected",
      icon: <Youtube className="h-5 w-5" />,
      lastSync: "2 hours ago",
      channelCount: 3,
    },
    {
      name: "Google Analytics",
      status: "disconnected",
      icon: <BarChart3 className="h-5 w-5" />,
      lastSync: "Never",
      channelCount: 0,
    },
    {
      name: "Slack",
      status: "connected",
      icon: <Bell className="h-5 w-5" />,
      lastSync: "1 day ago",
      channelCount: 1,
    },
  ];

  return (
    <AnimatedBackground>
      <div className="min-h-screen text-white">
        <NavigationHeader />

        {/* Main Content */}
        <main className="pt-24 pb-8">
          <div className="max-w-6xl mx-auto px-6">
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
                    Settings
                  </h1>
                  <p className="text-white/60 text-lg">
                    Manage your account preferences and integrations
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Settings Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6 bg-white/[0.05] mb-8">
                  <TabsTrigger value="account" className="text-white/70">
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="text-white/70">
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="text-white/70">
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="text-white/70">
                    Integrations
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="text-white/70">
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="text-white/70">
                    Billing
                  </TabsTrigger>
                </TabsList>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                  {/* Profile Information */}
                  <GlassCard variant="interactive" size="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Profile Information
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white/70">Full Name</Label>
                          <Input
                            defaultValue="John Doe"
                            className="bg-white/[0.05] border-white/[0.15] text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/70">Email</Label>
                          <Input
                            defaultValue="john@ytanalyzer.com"
                            className="bg-white/[0.05] border-white/[0.15] text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/70">Username</Label>
                          <Input
                            defaultValue="johndoe"
                            className="bg-white/[0.05] border-white/[0.15] text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-white/70">Phone Number</Label>
                          <Input
                            defaultValue="+1 (555) 123-4567"
                            className="bg-white/[0.05] border-white/[0.15] text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/70">Location</Label>
                          <Input
                            defaultValue="New York, NY"
                            className="bg-white/[0.05] border-white/[0.15] text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/70">Bio</Label>
                          <Textarea
                            defaultValue="YouTube content creator and analytics enthusiast."
                            className="bg-white/[0.05] border-white/[0.15] text-white resize-none"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
                          <User className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Profile Photo
                          </p>
                          <p className="text-white/60 text-sm">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/[0.1] border-red-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </GlassCard>

                  {/* Security Settings */}
                  <GlassCard variant="interactive" size="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Security Settings
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-white/70">Change Password</Label>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="New password"
                              className="bg-white/[0.05] border-white/[0.15] text-white pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-white/40" />
                              ) : (
                                <Eye className="h-4 w-4 text-white/40" />
                              )}
                            </Button>
                          </div>
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            className="bg-white/[0.05] border-white/[0.15] text-white"
                          />
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">
                              Two-Factor Authentication
                            </p>
                            <p className="text-white/60 text-sm">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            Recommended
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Enable 2FA
                        </Button>
                      </div>

                      <Separator className="bg-white/10" />

                      <div className="space-y-4">
                        <div>
                          <p className="text-white font-medium mb-2">
                            Active Sessions
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                              <div className="flex items-center gap-3">
                                <Smartphone className="h-4 w-4 text-white/60" />
                                <div>
                                  <p className="text-white text-sm">
                                    Chrome on Windows
                                  </p>
                                  <p className="text-white/60 text-xs">
                                    New York, NY • Current session
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                  <GlassCard variant="interactive" size="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Notification Preferences
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-medium mb-4">
                          Email Notifications
                        </h4>
                        <div className="space-y-4">
                          {[
                            {
                              key: "email",
                              label: "Email Notifications",
                              description: "Receive notifications via email",
                            },
                            {
                              key: "weekly",
                              label: "Weekly Reports",
                              description: "Weekly performance summaries",
                            },
                            {
                              key: "insights",
                              label: "AI Insights",
                              description: "New insights and recommendations",
                            },
                            {
                              key: "reports",
                              label: "Report Generation",
                              description:
                                "When reports are ready for download",
                            },
                          ].map((item) => (
                            <div
                              key={item.key}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <p className="text-white text-sm">
                                  {item.label}
                                </p>
                                <p className="text-white/60 text-xs">
                                  {item.description}
                                </p>
                              </div>
                              <Switch
                                checked={
                                  settings.notifications[
                                    item.key as keyof typeof settings.notifications
                                  ]
                                }
                                onCheckedChange={(checked) =>
                                  handleSettingChange(
                                    "notifications",
                                    item.key,
                                    checked,
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div>
                        <h4 className="text-white font-medium mb-4">
                          Push Notifications
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm">
                              Browser Notifications
                            </p>
                            <p className="text-white/60 text-xs">
                              Real-time alerts in your browser
                            </p>
                          </div>
                          <Switch
                            checked={settings.notifications.push}
                            onCheckedChange={(checked) =>
                              handleSettingChange(
                                "notifications",
                                "push",
                                checked,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent value="privacy" className="space-y-6">
                  <GlassCard variant="interactive" size="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                        <Lock className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Privacy Settings
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            key: "profilePublic",
                            label: "Public Profile",
                            description:
                              "Make your profile visible to other users",
                          },
                          {
                            key: "dataSharing",
                            label: "Data Sharing",
                            description:
                              "Share anonymized data to improve our services",
                          },
                          {
                            key: "analytics",
                            label: "Usage Analytics",
                            description:
                              "Help us improve by sharing usage statistics",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]"
                          >
                            <div>
                              <p className="text-white text-sm">{item.label}</p>
                              <p className="text-white/60 text-xs">
                                {item.description}
                              </p>
                            </div>
                            <Switch
                              checked={
                                settings.privacy[
                                  item.key as keyof typeof settings.privacy
                                ]
                              }
                              onCheckedChange={(checked) =>
                                handleSettingChange(
                                  "privacy",
                                  item.key,
                                  checked,
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-blue-400 font-medium text-sm">
                              Data Protection
                            </p>
                            <p className="text-white/80 text-xs mt-1">
                              Your data is encrypted and stored securely. We
                              never share personal information with third
                              parties without your consent.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button
                          variant="outline"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/[0.1] border-red-500/30"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations" className="space-y-6">
                  <GlassCard variant="interactive" size="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20">
                        <Link className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Connected Services
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {connectedServices.map((service, index) => (
                        <div
                          key={service.name}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white/[0.1]">
                              {service.icon}
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {service.name}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-white/60">
                                <span>Last sync: {service.lastSync}</span>
                                {service.channelCount > 0 && (
                                  <span>
                                    {service.channelCount} channels connected
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                service.status === "connected"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {service.status === "connected" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 mr-1" />
                              )}
                              {service.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className={
                                service.status === "connected"
                                  ? "text-red-400 hover:text-red-300 hover:bg-red-500/[0.1] border-red-500/30"
                                  : "text-white/70 hover:text-white hover:bg-white/[0.1] border-white/20"
                              }
                            >
                              {service.status === "connected"
                                ? "Disconnect"
                                : "Connect"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                  <GlassCard variant="interactive" size="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                        <Sliders className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        General Preferences
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white/70">Theme</Label>
                          <Select
                            value={theme}
                            onValueChange={(value) => setTheme(value)}
                          >
                            <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white/70">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white/70">Timezone</Label>
                          <Select defaultValue="UTC">
                            <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="EST">Eastern Time</SelectItem>
                              <SelectItem value="PST">Pacific Time</SelectItem>
                              <SelectItem value="GMT">GMT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-white/70">Currency</Label>
                          <Select defaultValue="USD">
                            <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="JPY">JPY (��)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white/70">Date Format</Label>
                          <Select defaultValue="MM/dd/yyyy">
                            <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                              <SelectItem value="MM/dd/yyyy">
                                MM/dd/yyyy
                              </SelectItem>
                              <SelectItem value="dd/MM/yyyy">
                                dd/MM/yyyy
                              </SelectItem>
                              <SelectItem value="yyyy-MM-dd">
                                yyyy-MM-dd
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white/70">
                            Default Dashboard View
                          </Label>
                          <Select defaultValue="overview">
                            <SelectTrigger className="bg-white/[0.05] border-white/[0.15] text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                              <SelectItem value="overview">Overview</SelectItem>
                              <SelectItem value="analytics">
                                Analytics
                              </SelectItem>
                              <SelectItem value="reports">Reports</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="space-y-6">
                  <GlassCard variant="interactive" size="lg">
                    <div className="text-center py-12">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 w-fit mx-auto mb-4">
                        <SettingsIcon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Billing & Subscription
                      </h3>
                      <p className="text-white/60 mb-6">
                        Manage your subscription and billing preferences
                      </p>
                      <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                        View Billing Details
                      </Button>
                    </div>
                  </GlassCard>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </AnimatedBackground>
  );
};

export default Settings;
