'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Github, Google } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 opacity-20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Back Button */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-400 hover:text-violet-400 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative"
        >
          {/* Login Form Card */}
          <div className="backdrop-blur-xl bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mb-8">
                Please sign in to your account
              </p>
            </motion.div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-800 hover:border-violet-500 text-gray-300 hover:text-white transition-all duration-300">
                <Google className="h-5 w-5" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-800 hover:border-violet-500 text-gray-300 hover:text-white transition-all duration-300">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center gap-4 mb-8">
              <div className="flex-1 border-t border-gray-800" />
              <span className="text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 border-t border-gray-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 px-10 text-gray-100 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 px-10 text-gray-100 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-800 bg-gray-900/50 text-violet-500 focus:ring-violet-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
              >
                Sign In
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
} 