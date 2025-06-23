import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
  Users,
  Activity,
  Brain,
  Target,
  PlayCircle,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Youtube,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Performance Analytics",
      description:
        "Compare Shorts vs Long-form video performance with detailed metrics and insights.",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description:
        "Get intelligent recommendations powered by machine learning algorithms.",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Trend Analysis",
      description:
        "Identify patterns and trends in your content performance over time.",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Content Strategy",
      description:
        "Receive actionable recommendations to optimize your content strategy.",
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Real-time Monitoring",
      description:
        "Track your channel's performance with live data synchronization.",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Integration",
      description:
        "Connect your YouTube channel safely with enterprise-grade security.",
      gradient: "from-indigo-500/20 to-blue-500/20",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Gaming Creator",
      content:
        "This tool helped me increase my Shorts engagement by 200%. The AI insights are incredible!",
      rating: 5,
      metrics: { subscribers: "2.4M", growth: "+185%" },
    },
    {
      name: "Sarah Chen",
      role: "Tech Reviewer",
      content:
        "Finally, a tool that shows me exactly which format works best for my audience. Game-changer!",
      rating: 5,
      metrics: { subscribers: "890K", growth: "+120%" },
    },
    {
      name: "Mike Rodriguez",
      role: "Fitness Coach",
      content:
        "The analytics helped me optimize my posting schedule and doubled my views in just 2 months.",
      rating: 5,
      metrics: { subscribers: "1.2M", growth: "+95%" },
    },
  ];

  const stats = [
    {
      label: "Creators Helped",
      value: "10,000+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Views Analyzed",
      value: "500M+",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      label: "Success Rate",
      value: "94%",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: "Avg Growth",
      value: "+185%",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  const benefits = [
    "Identify your best performing content formats",
    "Optimize posting schedules for maximum engagement",
    "Get AI-powered recommendations for content strategy",
    "Track performance trends and growth patterns",
    "Compare Shorts vs Long-form effectiveness",
    "Export detailed analytics reports",
  ];

  return (
    <AnimatedBackground>
      <div className="min-h-screen text-white">
        {/* Navigation */}
        <nav className="border-b border-white/[0.08] relative z-50">
          <GlassCard
            variant="default"
            className="rounded-none border-0 border-b border-white/[0.08] backdrop-blur-[20px]"
          >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/" className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <PlayCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500 to-blue-500 blur-lg opacity-30 -z-10" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                      YTAnalyzer
                    </span>
                    <div className="text-xs text-white/60">Pro Analytics</div>
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <motion.div
                className="hidden md:flex items-center gap-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>

              {/* Desktop CTA Buttons */}
              <motion.div
                className="hidden md:flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/[0.1]"
                  >
                    Sign In
                  </Button>
                </Link>
                <Button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white/70 hover:text-white hover:bg-white/[0.1]"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <motion.div
                className="md:hidden border-t border-white/[0.08] bg-black/20 backdrop-blur-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-6 py-6 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block text-white/70 hover:text-white transition-colors duration-200 font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/[0.1]"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        handleGetStarted();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700"
                    >
                      Get Started Free
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                New: AI-Powered Content Insights
              </Badge>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent leading-tight">
              Master YouTube with
              <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Smart Analytics
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Compare Shorts vs Long-form performance, get AI-powered insights,
              and optimize your content strategy to grow your YouTube channel
              faster than ever.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700 shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Connect with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30"
              >
                <PlayCircle className="w-5 h-5 mr-3" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center justify-center gap-8 mt-12 text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">5-minute setup</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="interactive" className="text-center p-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-blue-500/20 w-fit mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Powerful Features for YouTube Creators
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Everything you need to analyze, optimize, and grow your YouTube
              channel with data-driven insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="interactive" className="h-full p-6 group">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-white/60 mb-8">
                Join thousands of successful creators who are already using our
                platform to optimize their YouTube strategy.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassCard variant="accent" className="p-8">
                <div className="text-center">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-blue-500/20 w-fit mx-auto mb-6">
                    <Youtube className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Transform Your Channel?
                  </h3>
                  <p className="text-white/70 mb-6">
                    Join 10,000+ creators who are already using AI-powered
                    analytics to grow their channels faster.
                  </p>
                  <Button
                    onClick={() => navigate("/signup")}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700"
                  >
                    Start Free Analysis
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Loved by 10,000+ Creators
            </h2>
            <p className="text-xl text-white/60">
              See what successful YouTube creators are saying about YTAnalyzer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="interactive" className="h-full p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-white/60">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-400">
                        {testimonial.metrics.growth}
                      </div>
                      <div className="text-xs text-white/60">
                        {testimonial.metrics.subscribers}
                      </div>
                    </div>
                  </div>
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
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your YouTube Strategy?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Join thousands of creators who are already using AI-powered
                  analytics to grow their channels faster.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700 shadow-xl"
                >
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
                <div className="mt-6 text-white/60 text-sm">
                  ✓ Free to start • ✓ No credit card required • ✓ 5-minute setup
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.08] py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 bg-gradient-to-br from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <PlayCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    YTAnalyzer
                  </span>
                </div>
                <p className="text-white/60 max-w-md">
                  The leading YouTube analytics platform trusted by 10,000+
                  creators worldwide. Optimize your content strategy with
                  AI-powered insights.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <div className="space-y-2">
                  <Link
                    to="/features"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    to="/pricing"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/analytics"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Analytics
                  </Link>
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <div className="space-y-2">
                  <Link
                    to="/about"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                  <a
                    href="#"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/60 text-sm mb-4 md:mb-0">
                © 2024 YTAnalyzer. Built for YouTube creators worldwide.
              </div>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <a href="#" className="hover:text-white/80 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white/80 transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-white/80 transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedBackground>
  );
};

export default Landing;
