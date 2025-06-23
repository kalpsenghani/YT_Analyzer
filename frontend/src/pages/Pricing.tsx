import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  PlayCircle,
  ArrowLeft,
  Check,
  X,
  Star,
  Zap,
  Crown,
  ArrowRight,
  Users,
  BarChart3,
  Brain,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for new creators getting started",
      price: { monthly: 0, annual: 0 },
      features: [
        "1 YouTube channel",
        "Basic analytics dashboard",
        "Shorts vs Long-form comparison",
        "Monthly performance reports",
        "Email support",
        "7-day data history",
      ],
      limitations: [
        "Limited to 1,000 videos analyzed per month",
        "Basic AI insights only",
        "No team collaboration",
        "No API access",
      ],
      cta: "Get Started Free",
      popular: false,
      icon: <Users className="h-6 w-6" />,
      gradient: "from-gray-500/20 to-slate-500/20",
      borderColor: "border-gray-500/30",
    },
    {
      name: "Pro",
      description: "For serious creators looking to optimize",
      price: { monthly: 29, annual: 24 },
      features: [
        "Up to 3 YouTube channels",
        "Advanced analytics dashboard",
        "AI-powered content insights",
        "Real-time performance monitoring",
        "Weekly automated reports",
        "Priority email & chat support",
        "30-day data history",
        "Thumbnail performance analysis",
        "Best posting time recommendations",
        "Content optimization suggestions",
      ],
      limitations: [
        "Limited to 10,000 videos analyzed per month",
        "Basic team collaboration (2 users)",
      ],
      cta: "Start Pro Trial",
      popular: true,
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/50",
    },
    {
      name: "Agency",
      description: "For agencies and enterprise teams",
      price: { monthly: 99, annual: 79 },
      features: [
        "Unlimited YouTube channels",
        "Full analytics suite",
        "Advanced AI insights & predictions",
        "Real-time monitoring & alerts",
        "Daily automated reports",
        "24/7 priority support",
        "Unlimited data history",
        "White-label reporting",
        "Team collaboration (unlimited users)",
        "API access & integrations",
        "Custom dashboard branding",
        "Dedicated account manager",
      ],
      limitations: [],
      cta: "Start Agency Trial",
      popular: false,
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/50",
    },
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 14-day free trial for all paid plans. No credit card required to start your trial.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your data remains accessible for 30 days after cancellation, giving you time to export any important analytics or reports.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee if you're not satisfied with our service. Contact support for assistance.",
    },
    {
      question: "Can I add team members?",
      answer:
        "Pro plans include 2 team members, and Agency plans include unlimited team members. Additional users can be added to Pro plans for $10/month each.",
    },
    {
      question: "Is my YouTube data secure?",
      answer:
        "Absolutely. We use enterprise-grade security, OAuth 2.0 authentication, and are SOC 2 certified. Your data is encrypted and never shared with third parties.",
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
            <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              Simple, Transparent Pricing
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent leading-tight">
              Choose the Perfect Plan
              <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                for Your Channel
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Start free and scale as you grow. All plans include our core
              features with no hidden fees or long-term commitments.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-lg ${!isAnnual ? "text-white" : "text-white/60"}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                  isAnnual ? "bg-red-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                    isAnnual ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-lg ${isAnnual ? "text-white" : "text-white/60"}`}
              >
                Annual
              </span>
              {isAnnual && (
                <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                  Save 20%
                </Badge>
              )}
            </div>
          </motion.div>
        </section>

        {/* Pricing Plans */}
        <section className="container mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-500 text-white border-red-500 px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <GlassCard
                  variant={plan.popular ? "accent" : "interactive"}
                  className={`h-full p-8 relative ${plan.popular ? "border-2 border-red-500/50" : `border ${plan.borderColor}`}`}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.gradient} border border-white/20 flex items-center justify-center mx-auto mb-4`}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-white">
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-white/60">
                          /{isAnnual ? "month" : "month"}
                        </span>
                      </div>
                      {isAnnual && plan.price.monthly > 0 && (
                        <div className="text-sm text-white/60 mt-1">
                          Billed annually (${plan.price.annual * 12}/year)
                        </div>
                      )}
                      {plan.price.monthly === 0 && (
                        <div className="text-sm text-green-400 mt-1">
                          Forever free
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => navigate("/signup")}
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700"
                          : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white mb-3">
                      What's included:
                    </h4>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-semibold text-white/60 mb-3 mt-6">
                          Limitations:
                        </h4>
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                            <span className="text-white/60 text-sm">
                              {limitation}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Have questions? We've got answers. Contact us if you need more
              help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="interactive" className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
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
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Accelerate Your Growth?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Join 10,000+ creators who are already using YTAnalyzer to
                  optimize their content and grow their channels faster.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700"
                >
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
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

export default Pricing;
