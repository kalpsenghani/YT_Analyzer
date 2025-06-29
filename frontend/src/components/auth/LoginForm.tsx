import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedLabel } from "@/components/ui/animated-label";
import { AnimatedInput } from "@/components/ui/animated-input.tsx";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  Github,
  Chrome,
  Youtube,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isAuthenticated, error, clearError } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Error is handled by the store
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would trigger Google OAuth
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <GlassCard variant="interactive" className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60 text-sm">
              Sign in to your YTAnalyzer account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <LabelInputContainer>
              <AnimatedLabel htmlFor="email" className="text-sm">
                Email Address
              </AnimatedLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <AnimatedInput
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer>
              <AnimatedLabel htmlFor="password" className="text-sm">
                Password
              </AnimatedLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <AnimatedInput
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </LabelInputContainer>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-white/[0.05] text-red-500 focus:ring-red-500 focus:ring-offset-0 w-4 h-4"
                  disabled={isLoading}
                />
                <span className="ml-2 text-white/70">Remember me</span>
              </label>
              <a
                href="#"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              className="relative group/btn bg-gradient-to-r from-red-500 to-red-600 text-white w-full border-0 hover:from-red-600 hover:to-red-700 h-10"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
              <BottomGradient />
            </Button>

            <div className="bg-gradient-to-r from-transparent via-white/20 to-transparent my-4 h-[1px] w-full" />

            {/* Social Login - Compact Grid Layout */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                variant="outline"
                size="sm"
                className="relative group/btn border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30 p-2 h-10"
                disabled={isLoading}
              >
                <Chrome className="h-4 w-4" />
                <BottomGradient />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="relative group/btn border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30 p-2 h-10"
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
                <BottomGradient />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="relative group/btn border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30 p-2 h-10"
                disabled={isLoading}
              >
                <Youtube className="h-4 w-4" />
                <BottomGradient />
              </Button>
            </div>

            <div className="text-center text-xs text-white/50 mb-2">
              Continue with Google, GitHub, or YouTube
            </div>

            <p className="text-center text-sm text-white/60">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                Sign up here
              </a>
            </p>
          </form>
        </motion.div>
      </GlassCard>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
