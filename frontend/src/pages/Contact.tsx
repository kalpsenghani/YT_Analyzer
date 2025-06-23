import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  PlayCircle,
  ArrowLeft,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Users,
  LifeBuoy,
  Zap,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedInput } from "@/components/ui/animated-input";
import { AnimatedLabel } from "@/components/ui/animated-label";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // In a real app, handle form submission here
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Get help via email",
      detail: "support@ytanalyzer.com",
      responseTime: "24 hours",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our team",
      detail: "Available in app",
      responseTime: "5 minutes",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Call us directly",
      detail: "+1 (555) 123-4567",
      responseTime: "Immediate",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  const supportOptions = [
    {
      icon: <LifeBuoy className="h-6 w-6" />,
      title: "Technical Support",
      description: "Get help with bugs, integrations, and technical issues",
      category: "technical",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Account & Billing",
      description: "Questions about your subscription, billing, and account",
      category: "billing",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Feature Requests",
      description: "Suggest new features or improvements to YTAnalyzer",
      category: "feature",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "General Inquiries",
      description: "General questions, partnerships, and other topics",
      category: "general",
    },
  ];

  const faqs = [
    {
      question: "How do I connect my YouTube channel?",
      answer:
        "Simply sign up with your Google account and we'll automatically connect your YouTube channel. You can manage multiple channels from your dashboard.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use enterprise-grade security measures including OAuth 2.0 authentication, end-to-end encryption, and are SOC 2 certified.",
    },
    {
      question: "Can I export my analytics data?",
      answer:
        "Absolutely! You can export your data in multiple formats including PDF reports, CSV files, and Excel spreadsheets.",
    },
    {
      question: "Do you offer team accounts?",
      answer:
        "Yes, our Pro plan includes 2 team members, and our Agency plan includes unlimited team members with collaboration features.",
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
              <MessageCircle className="h-4 w-4 mr-2" />
              We're Here to Help
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent leading-tight">
              Get in Touch
              <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                with Our Team
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Have questions about YTAnalyzer? Need help getting started? Our
              team is here to support you every step of the way.
            </p>

            <div className="flex items-center justify-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-400" />
                <span className="text-sm">Expert Team</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard
                  variant="interactive"
                  className="text-center p-6 h-full"
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${method.gradient} border border-white/20 flex items-center justify-center mx-auto mb-4`}
                  >
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-white/80 font-medium mb-2">
                    {method.detail}
                  </div>
                  <div className="text-green-400 text-xs">
                    Response time: {method.responseTime}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Contact Form & Support Options */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassCard variant="interactive" className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <AnimatedLabel htmlFor="name" className="text-sm">
                        Full Name
                      </AnimatedLabel>
                      <AnimatedInput
                        id="name"
                        name="name"
                        placeholder="Your name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-10"
                        required
                      />
                    </div>
                    <div>
                      <AnimatedLabel htmlFor="email" className="text-sm">
                        Email Address
                      </AnimatedLabel>
                      <AnimatedInput
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <AnimatedLabel htmlFor="category" className="text-sm">
                      Category
                    </AnimatedLabel>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg bg-white/[0.05] border border-white/[0.2] text-white placeholder-white/60 focus:outline-none focus:border-white/[0.4] transition-colors"
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Account & Billing</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>

                  <div>
                    <AnimatedLabel htmlFor="subject" className="text-sm">
                      Subject
                    </AnimatedLabel>
                    <AnimatedInput
                      id="subject"
                      name="subject"
                      placeholder="Brief description of your inquiry"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="h-10"
                      required
                    />
                  </div>

                  <div>
                    <AnimatedLabel htmlFor="message" className="text-sm">
                      Message
                    </AnimatedLabel>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about how we can help you..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.2] text-white placeholder-white/60 focus:outline-none focus:border-white/[0.4] transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700 h-12"
                  >
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Support Options & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Support Options */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  How Can We Help?
                </h2>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <GlassCard variant="interactive" className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                            {option.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-white mb-1">
                              {option.title}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick FAQ */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <GlassCard variant="default" className="p-4">
                        <h4 className="font-semibold text-white mb-2 text-sm">
                          {faq.question}
                        </h4>
                        <p className="text-white/70 text-xs leading-relaxed">
                          {faq.answer}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Office Information */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="accent" className="p-12">
              <div className="text-center max-w-3xl mx-auto">
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-blue-500/20 w-fit mx-auto mb-6">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Visit Our Office
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  While we're primarily a remote team, you can reach us at our
                  headquarters in San Francisco or schedule a virtual meeting
                  anytime.
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="font-bold text-white mb-2">Address</h3>
                    <p className="text-white/70">
                      123 Tech Street
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">
                      Business Hours
                    </h3>
                    <p className="text-white/70">
                      Monday - Friday: 9:00 AM - 6:00 PM PST
                      <br />
                      Saturday - Sunday: Emergency support only
                      <br />
                      Holidays: Limited availability
                    </p>
                  </div>
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
                to="/about"
                className="hover:text-white/80 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedBackground>
  );
};

export default Contact;
