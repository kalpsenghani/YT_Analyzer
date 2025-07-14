import React, { useState } from "react";
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
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";

export default function SignupForm() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    clearError();
    
    try {
      setLocalLoading(true);
      await register(formData.email, formData.password);
      // Registration successful, redirect to login
      navigate("/login");
    } catch (error) {
      // Error is handled by the store
      console.error("Registration failed:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleGoogleSignUp = () => {
    // In a real app, this would trigger Google OAuth
    navigate("/dashboard");
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;
  const passwordsDontMatch =
    formData.confirmPassword && formData.password !== formData.confirmPassword;

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
              Join YTAnalyzer
            </h2>
            <p className="text-white/60 text-sm">
              Start optimizing your YouTube channel today
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
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <LabelInputContainer>
                <AnimatedLabel htmlFor="firstName" className="text-sm">
                  First Name
                </AnimatedLabel>
                <AnimatedInput
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                  disabled={localLoading}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <AnimatedLabel htmlFor="lastName" className="text-sm">
                  Last Name
                </AnimatedLabel>
                <AnimatedInput
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                  disabled={localLoading}
                />
              </LabelInputContainer>
            </div>

            {/* Email */}
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
                  disabled={localLoading}
                />
              </div>
            </LabelInputContainer>

            {/* Password */}
            <LabelInputContainer>
              <AnimatedLabel htmlFor="password" className="text-sm">
                Password
              </AnimatedLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <AnimatedInput
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-10"
                  required
                  disabled={localLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={localLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-1">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Strength: {passwordStrength.label}</span>
                    <div className="w-20 bg-white/[0.1] rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.score * 25}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </LabelInputContainer>

            {/* Confirm Password */}
            <LabelInputContainer>
              <AnimatedLabel htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </AnimatedLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <AnimatedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-10"
                  required
                  disabled={localLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={localLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-1 flex items-center gap-2">
                  {passwordsMatch ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : passwordsDontMatch ? (
                    <div className="h-4 w-4 rounded-full border-2 border-red-400" />
                  ) : null}
                  <span
                    className={`text-xs ${
                      passwordsMatch
                        ? "text-green-400"
                        : passwordsDontMatch
                        ? "text-red-400"
                        : "text-white/60"
                    }`}
                  >
                    {passwordsMatch
                      ? "Passwords match"
                      : passwordsDontMatch
                      ? "Passwords don't match"
                      : "Confirm your password"}
                  </span>
                </div>
              )}
            </LabelInputContainer>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="mt-1 rounded border-white/20 bg-white/[0.05] text-red-500 focus:ring-red-500 focus:ring-offset-0 w-4 h-4"
                required
                disabled={localLoading}
              />
              <label htmlFor="terms" className="text-sm text-white/70 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              className="relative group/btn bg-gradient-to-r from-red-500 to-red-600 text-white w-full border-0 hover:from-red-600 hover:to-red-700 h-10"
              type="submit"
              disabled={localLoading || !formData.terms || !passwordsMatch}
            >
              {localLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <>
              Create Account
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
                onClick={handleGoogleSignUp}
                variant="outline"
                size="sm"
                className="relative group/btn border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30 p-2 h-10"
                disabled={localLoading}
              >
                <Chrome className="h-4 w-4" />
                <BottomGradient />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="relative group/btn border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30 p-2 h-10"
                disabled={localLoading}
              >
                <Github className="h-4 w-4" />
                <BottomGradient />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="relative group/btn border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30 p-2 h-10"
                disabled={localLoading}
              >
                <Youtube className="h-4 w-4" />
                <BottomGradient />
              </Button>
            </div>

            <div className="text-center text-xs text-white/50 mb-2">
              Continue with Google, GitHub, or YouTube
            </div>

            <p className="text-center text-sm text-white/60">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                Sign in here
              </a>
            </p>
          </form>
        </motion.div>
      </GlassCard>
    </div>
  );
}

const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return {
    score: Math.min(score, 4),
    label: labels[Math.min(score, 4)],
    color: colors[Math.min(score, 4)],
  };
};

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