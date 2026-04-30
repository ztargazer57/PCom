"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Palette,
  ArrowRight,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ArtPortfolioLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);
    console.log("Login result:", result);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }


    window.location.href = result?.url || "/dashboard";
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FBFF] text-slate-700">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-sky-200/60 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-blue-100/80 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-100/70 blur-3xl" />

      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <a href="#" className="mb-10 flex items-center gap-3 text-xl font-bold tracking-tight text-slate-800">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-200/80 shadow-sm">
              <Sparkles className="h-6 w-6 text-sky-600" />
            </span>
            Lumi Art Studio
          </a>

          <div className="relative max-w-lg">
            <div className="absolute inset-0 rounded-[2.5rem] bg-sky-200/70 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-4 shadow-2xl shadow-sky-100">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1400&auto=format&fit=crop"
                alt="Soft artwork preview"
                loading="eager"
                className="h-[520px] w-full rounded-[2rem] object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/80 p-5 shadow-lg backdrop-blur-xl">
                <p className="text-sm font-semibold text-slate-800">Artist Dashboard Access</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Sign in securely to manage artworks, commissions, profile details, and client requests.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-8 flex items-center justify-center gap-3 md:hidden">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-200/80 shadow-sm">
              <Sparkles className="h-6 w-6 text-sky-600" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-800">Lumi Art Studio</span>
          </div>

          <Card className="rounded-[2rem] border-sky-100 bg-white/90 shadow-2xl shadow-sky-100/80 backdrop-blur-xl">
            <CardContent className="p-7 sm:p-9">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-sky-600 shadow-sm">
                <Palette className="h-8 w-8" />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Welcome Back</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">Sign in to your studio</h1>
                <p className="mt-4 leading-7 text-slate-500">
                  Enter your artist email and password to access your private dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <label className="block">
                  <span className="text-sm font-medium text-slate-600">Email Address</span>
                  <div className="mt-2 flex items-center rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 transition focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100">
                    <Mail className="h-5 w-5 text-sky-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="artist@example.com"
                      className="w-full bg-transparent px-3 py-3 text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-600">Password</span>
                  <div className="mt-2 flex items-center rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 transition focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100">
                    <LockKeyhole className="h-5 w-5 text-sky-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full bg-transparent px-3 py-3 text-slate-700 outline-none placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="text-slate-400 transition hover:text-sky-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </label>

                {error && (
                  <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-400 py-6 text-base font-semibold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 rounded-2xl bg-sky-50 p-4">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                  <p className="text-sm leading-6 text-slate-500">
                    This page is for the artist only. Public registration is disabled.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-center text-xs leading-6 text-slate-400">
                Protected by NextAuth credentials login.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
