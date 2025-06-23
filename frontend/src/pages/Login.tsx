import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  ArrowLeft,
  TrendingUp,
  Users,
  BarChart3,
  Brain,
  Zap,
  Target,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const stats = [
    {
      label: "Active Creators",
      value: "10,000+",
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Videos Analyzed",
      value: "2.5M+",
      icon: BarChart3,
      color: "text-green-400",
    },
    {
      label: "Growth Increase",
      value: "300%",
      icon: TrendingUp,
      color: "text-red-400",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Get intelligent recommendations to optimize your content strategy with machine learning.",
    },
    {
      icon: Target,
      title: "Performance Analytics",
      description:
        "Track Shorts vs Long-form performance with detailed metrics and trends.",
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description:
        "Monitor your channel performance with live data updates and instant notifications.",
    },
  ];

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
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

            <Link to="/">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/[0.1]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Analytics Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-lg">
                <motion.h1
                  className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Welcome Back to YouTube Success
                </motion.h1>

                <motion.p
                  className="text-xl text-white/70 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Continue optimizing your YouTube channel with AI-powered
                  analytics and insights that drive real growth.
                </motion.p>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {stats.map((stat, index) => (
                    <GlassCard
                      key={stat.label}
                      variant="interactive"
                      className="p-4 text-center"
                    >
                      <stat.icon
                        className={`h-6 w-6 mx-auto mb-2 ${stat.color}`}
                      />
                      <div className="text-xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </GlassCard>
                  ))}
                </motion.div>

                {/* Features */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-white/80" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <span>✓ 256-bit SSL encryption</span>
                    <span>✓ GDPR compliant</span>
                    <span>✓ SOC 2 certified</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LoginForm />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-white/60">
            <div>© 2024 YTAnalyzer. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <Link to="#" className="hover:text-white/80 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white/80 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-white/80 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedBackground>
  );
};

export default Login;
