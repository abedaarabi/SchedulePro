"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Bell,
  Calendar,
  DollarSign,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

import app from "/public/img/app.png";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  delay?: number;
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay?: number;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Add pricing tiers data
  const pricingTiers: PricingTierProps[] = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small cafes and restaurants",
      features: [
        "Up to 10 employees",
        "Basic scheduling",
        "Email notifications",
        "Mobile app access",
      ],
      delay: 0.1,
    },
    {
      name: "Professional",
      price: "$79",
      description: "Ideal for growing establishments",
      features: [
        "Up to 50 employees",
        "Advanced scheduling",
        "SMS notifications",
        "Time tracking",
        "Shift swapping",
        "Performance analytics",
      ],
      recommended: true,
      delay: 0.2,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large restaurant chains",
      features: [
        "Unlimited employees",
        "AI-powered scheduling",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "Multi-location support",
      ],
      delay: 0.3,
    },
  ];

  // Add testimonials data
  const testimonials: TestimonialProps[] = [
    {
      quote:
        "SchedulePro transformed how we manage our staff. We've reduced scheduling time by 75%.",
      author: "Sarah Johnson",
      role: "Restaurant Manager",
      company: "The Rustic Kitchen",
      delay: 0.1,
    },
    {
      quote:
        "The AI-powered scheduling suggestions are incredibly accurate. It's like having a dedicated HR assistant.",
      author: "Michael Chen",
      role: "Owner",
      company: "Fusion Bites",
      delay: 0.2,
    },
    {
      quote:
        "Employee satisfaction has improved significantly since we started using SchedulePro.",
      author: "Emma Rodriguez",
      role: "Operations Director",
      company: "Café Delights",
      delay: 0.3,
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-gray-100 min-h-screen overflow-hidden">
      {/* Header Section */}
      <header className="fixed w-full backdrop-blur-lg bg-black/50 border-b border-gray-800/50 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
          >
            SchedulePro
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex items-center space-x-8 absolute md:relative top-full left-0 right-0 md:top-auto bg-black/95 md:bg-transparent p-4 md:p-0 border-b border-gray-800/50 md:border-0`}
          >
            <Link
              href="#home"
              className="hover:text-violet-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="hover:text-violet-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-violet-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="hover:text-violet-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/pages/login"
              className="px-4 py-2 rounded-lg border border-violet-500/30 hover:border-violet-500 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href="#cta"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
            >
              Start Free Trial
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 px-4 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 opacity-20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 mb-6 leading-tight">
                Effortless Scheduling for Modern Restaurants
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Transform your restaurant scheduling with AI-powered automation
              and real-time team collaboration.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Our scheduling app combines cutting-edge AI technology with a
              user-friendly interface, making it easier than ever to manage your
              restaurant&apos;s staff and schedules. Experience seamless integration,
              real-time updates, and a collaborative environment that enhances
              productivity and employee satisfaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#cta"
                className="group relative px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="#demo"
                className="group px-8 py-4 rounded-xl text-lg font-semibold border border-gray-800 hover:border-violet-500 transition-all duration-300 flex items-center justify-center"
              >
                Watch Demo
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* App Description Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 opacity-20" />
        <div className="max-w-7xl mx-auto relative text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            Revolutionize Your Scheduling
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Our scheduling app combines cutting-edge AI technology with a
            user-friendly interface, making it easier than ever to manage your
            restaurant&apos;s staff and schedules. Experience seamless integration,
            real-time updates, and a collaborative environment that enhances
            productivity and employee satisfaction.
          </motion.p>
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
              <Image src={app} alt="Scheduling App" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 to-violet-500/10 opacity-20" />
        <div className="max-w-7xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            Powerful Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Smart Scheduling"
              description="AI-powered scheduling that learns your team's preferences"
              delay={0.1}
            />
            <FeatureCard
              icon={<Bell className="w-6 h-6" />}
              title="Instant Updates"
              description="Real-time notifications keep everyone in sync"
              delay={0.2}
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Time Management"
              description="Easy shift swaps and time-off requests"
              delay={0.3}
            />
            <FeatureCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Payroll Integration"
              description="Seamless integration with popular payroll systems"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 opacity-20" />
        <div className="max-w-7xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            Why Choose SchedulePro?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-4">Save Time</h3>
              <p className="text-gray-400">
                Reduce scheduling time by up to 80% with our AI-powered
                automation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-4">Boost Efficiency</h3>
              <p className="text-gray-400">
                Optimize staff allocation and reduce overtime costs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-4">Happy Staff</h3>
              <p className="text-gray-400">
                Improve employee satisfaction with fair and flexible scheduling
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            What Our Customers Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 opacity-20" />
        <div className="max-w-7xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            Simple, Transparent Pricing
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            About SchedulePro
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-gray-400 mb-6">
                We&apos;re on a mission to revolutionize restaurant scheduling. By
                combining AI technology with human-centered design, we&apos;re making
                staff management more efficient, fair, and enjoyable for
                everyone involved.
              </p>
              <p className="text-gray-400">
                Founded by restaurant industry veterans, we understand the
                unique challenges of hospitality scheduling and are committed to
                solving them through innovative technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-8">
                <div className="w-full h-full rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
            >
              SchedulePro
            </Link>
            <p className="mt-4 text-gray-400">
              Making restaurant scheduling effortless and efficient.
            </p>
          </div>

          {/* Add more footer content */}
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-800 hover:border-violet-500 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  recommended,
  delay = 0,
}: PricingTierProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`p-6 rounded-2xl ${
        recommended
          ? "bg-gradient-to-b from-violet-500/20 to-fuchsia-500/20 border-violet-500"
          : "bg-gradient-to-b from-gray-800/50 to-gray-900/50 border-gray-800"
      } border backdrop-blur-sm relative`}
    >
      {recommended && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 rounded-full text-sm font-semibold">
          Recommended
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="w-5 h-5 mr-2 text-violet-400">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full py-3 rounded-lg bg-violet-500 hover:bg-violet-600 transition-colors">
        Get Started
      </button>
    </motion.div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  delay = 0,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-800 backdrop-blur-sm"
    >
      <p className="text-gray-400 mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-400 text-sm">{role}</p>
        <p className="text-violet-400 text-sm">{company}</p>
      </div>
    </motion.div>
  );
}
