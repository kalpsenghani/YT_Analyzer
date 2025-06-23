import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlayCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  const features = [
    "Advanced YouTube analytics",
    "AI-powered content insights",
    "Shorts vs Long-form comparison",
    "Performance optimization tips",
    "Automated reporting",
    "Priority customer support",
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
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-lg">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-4">
                  Start Growing Your YouTube Channel Today
                </h1>
                <p className="text-lg text-white/70 mb-6">
                  Join 10,000+ creators who use our AI-powered analytics to
                  optimize their content strategy and accelerate growth.
                </p>

                <GlassCard variant="interactive" className="p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    What you'll get:
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                <div className="grid grid-cols-3 gap-6 text-sm text-white/60">
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mb-1" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mb-1" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mb-1" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SignupForm />
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

export default Signup;
