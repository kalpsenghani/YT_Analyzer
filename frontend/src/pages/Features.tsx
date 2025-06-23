import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  PlayCircle,
  ArrowLeft,
  BarChart3,
  Brain,
  TrendingUp,
  Target,
  Activity,
  Shield,
  Youtube,
  Eye,
  Clock,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Download,
  Bell,
  Calendar,
  Globe,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Analytics",
      description:
        "Compare Shorts vs Long-form video performance with detailed metrics and insights.",
      features: [
        "View duration analysis",
        "Engagement rate tracking",
        "Click-through rate optimization",
        "Retention curve analysis",
        "Audience demographics",
      ],
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500/50 to-cyan-500/50",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Insights",
      description:
        "Get intelligent recommendations powered by machine learning algorithms.",
      features: [
        "Content optimization suggestions",
        "Best posting time predictions",
        "Thumbnail performance analysis",
        "Title optimization recommendations",
        "Trend prediction algorithms",
      ],
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-500/50 to-pink-500/50",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Trend Analysis",
      description:
        "Identify patterns and trends in your content performance over time.",
      features: [
        "Growth trajectory tracking",
        "Seasonal performance patterns",
        "Content format effectiveness",
        "Audience behavior insights",
        "Competitive benchmarking",
      ],
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-500/50 to-emerald-500/50",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Content Strategy",
      description:
        "Receive actionable recommendations to optimize your content strategy.",
      features: [
        "Content gap analysis",
        "Optimal video length suggestions",
        "Topic performance scoring",
        "Audience interest mapping",
        "Content calendar planning",
      ],
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-500/50 to-red-500/50",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description:
        "Track your channel's performance with live data synchronization.",
      features: [
        "Live view count tracking",
        "Real-time engagement monitoring",
        "Instant notification alerts",
        "Performance milestone tracking",
        "Competitor activity monitoring",
      ],
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderGradient: "from-yellow-500/50 to-orange-500/50",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Integration",
      description:
        "Connect your YouTube channel safely with enterprise-grade security.",
      features: [
        "OAuth 2.0 authentication",
        "End-to-end encryption",
        "GDPR compliance",
        "SOC 2 certified infrastructure",
        "Regular security audits",
      ],
      gradient: "from-indigo-500/20 to-blue-500/20",
      borderGradient: "from-indigo-500/50 to-blue-500/50",
    },
  ];

  const additionalFeatures = [
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Reports",
      description:
        "Download detailed analytics reports in multiple formats (PDF, CSV, Excel).",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Notifications",
      description:
        "Get alerts for important metrics changes and growth opportunities.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Scheduling Tools",
      description:
        "Plan and schedule your content uploads for optimal engagement.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-language Support",
      description:
        "Access the platform in multiple languages with localized insights.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description:
        "Share insights and collaborate with team members on your channel strategy.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "API Access",
      description:
        "Integrate YTAnalyzer data with your existing tools and workflows.",
    },
  ];

  return (
    <AnimatedBackground>
      <div className="min-h-screen text-white">
        {/* Navigation */}
        <nav className="border-b border-white/[0.08] p-6">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PlayCircle className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500 to-blue-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  YTAnalyzer
                </span>
                <div className="text-xs text-white/60">Pro Analytics</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/">
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/[0.1]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              Comprehensive Feature Set
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent leading-tight">
              Everything You Need to
              <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Master YouTube
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Discover how our comprehensive suite of tools and features can
              help you analyze, optimize, and grow your YouTube channel like
              never before.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700"
            >
              Start Your Free Trial
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
          </motion.div>
        </section>

        {/* Main Features */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Our powerful suite of analytics tools designed specifically for
              YouTube creators
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard
                  variant="interactive"
                  className={`h-full p-8 border-2 border-transparent bg-gradient-to-br ${feature.gradient} hover:border-opacity-50`}
                  style={{
                    borderImage: `linear-gradient(135deg, ${feature.borderGradient.replace("from-", "").replace("to-", "").replace("/50", "")}) 1`,
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white flex-shrink-0 border border-white/20`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-white/80 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Additional Tools
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Extra features to enhance your YouTube analytics experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard
                  variant="interactive"
                  className="h-full p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="accent" className="text-center p-12">
              <div className="max-w-3xl mx-auto">
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-blue-500/20 w-fit mx-auto mb-6">
                  <Youtube className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Unlock Your Channel's Potential?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Start using these powerful features today and see the
                  difference data-driven insights can make for your YouTube
                  success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700"
                  >
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/pricing")}
                    className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/[0.1]"
                  >
                    View Pricing
                  </Button>
                </div>
                <div className="mt-6 text-white/60 text-sm">
                  ✓ 14-day free trial • ✓ No credit card required • ✓ Cancel
                  anytime
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.08] py-12">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="text-white/60 text-sm">
              © 2024 YTAnalyzer. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <Link
                to="/privacy"
                className="hover:text-white/80 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-white/80 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/contact"
                className="hover:text-white/80 transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedBackground>
  );
};

export default Features;
