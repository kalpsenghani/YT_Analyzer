import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  PlayCircle,
  ArrowLeft,
  Target,
  Users,
  TrendingUp,
  Award,
  Heart,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Creator-First",
      description:
        "Every feature we build is designed with YouTube creators in mind, addressing real challenges faced by content creators worldwide.",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Data-Driven Growth",
      description:
        "We believe in the power of data to unlock growth opportunities and help creators make informed decisions about their content.",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy & Security",
      description:
        "Your data is yours. We maintain the highest standards of security and privacy to protect your channel information.",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community Support",
      description:
        "We're committed to supporting the creator community through education, resources, and tools that enable success.",
      gradient: "from-red-500/20 to-orange-500/20",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former YouTube creator with 2M+ subscribers. Built YTAnalyzer after experiencing the analytics pain points firsthand.",
      initials: "SJ",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "David Chen",
      role: "CTO & Co-Founder",
      bio: "Former Google engineer who worked on YouTube's internal analytics systems. Expert in large-scale data processing.",
      initials: "DC",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Product",
      bio: "Product strategist with 10+ years at tech companies. Passionate about building tools that creators actually want to use.",
      initials: "MR",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Alex Thompson",
      role: "Head of AI/ML",
      bio: "AI researcher and former Netflix data scientist. Leading our machine learning initiatives for predictive analytics.",
      initials: "AT",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "Started by YouTube creators who needed better analytics",
    },
    {
      year: "2023",
      title: "1,000 Creators",
      description: "Reached our first thousand satisfied users",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched AI-powered insights and recommendations",
    },
    {
      year: "2024",
      title: "10,000+ Creators",
      description: "Now serving creators from 50+ countries worldwide",
    },
  ];

  const stats = [
    {
      label: "Creators Served",
      value: "10,000+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Videos Analyzed",
      value: "2.5M+",
      icon: <PlayCircle className="h-5 w-5" />,
    },
    {
      label: "Countries",
      value: "50+",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      label: "Uptime",
      value: "99.9%",
      icon: <Zap className="h-5 w-5" />,
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
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Built by Creators, for Creators
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent leading-tight">
              Empowering YouTube Creators
              <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Through Smart Analytics
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              We're on a mission to democratize YouTube analytics and help
              creators of all sizes make data-driven decisions to grow their
              channels and reach their full potential.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700"
            >
              Join Our Mission
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
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

        {/* Our Story */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  YTAnalyzer was born from frustration. As YouTube creators
                  ourselves, we struggled with the platform's limited analytics.
                  We couldn't get the insights we needed to understand what
                  content worked, when to post, or how to optimize our strategy.
                </p>
                <p>
                  After years of manually tracking performance in spreadsheets
                  and trying to make sense of scattered data, we decided to
                  build the analytics platform we wished existed.
                </p>
                <p>
                  Today, YTAnalyzer serves over 10,000 creators worldwide,
                  helping them make data-driven decisions and grow their
                  channels faster than ever before. We're just getting started.
                </p>
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
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Recognition & Awards
                  </h3>
                  <div className="space-y-3 text-white/80">
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span>Best Analytics Tool 2024 - Creator Awards</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span>Top 10 Creator Tools - Industry Report</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span>4.9/5 Rating - 500+ Reviews</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we
              make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="interactive" className="h-full p-8">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.gradient} border border-white/20 flex items-center justify-center mb-6`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              The passionate individuals behind YTAnalyzer, dedicated to helping
              creators succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="interactive" className="text-center p-6">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-red-400 text-sm mb-3">{member.role}</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Key milestones in our mission to transform YouTube analytics
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-12 ${
                  index % 2 === 1 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <GlassCard variant="interactive" className="p-6">
                    <div className="text-red-400 font-bold mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-white/70">{milestone.description}</p>
                  </GlassCard>
                </div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-blue-500 flex-shrink-0"></div>
                <div className="flex-1"></div>
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
                  Ready to Join Our Community?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Become part of the 10,000+ creators who trust YTAnalyzer to
                  help them grow their YouTube channels.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 text-lg font-semibold border-0 hover:from-red-600 hover:to-red-700"
                  >
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/contact")}
                    className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/[0.1]"
                  >
                    Get in Touch
                  </Button>
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

export default About;
