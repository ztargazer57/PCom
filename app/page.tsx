"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Sparkles,
  ArrowRight,
  Heart,
  Send,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const artworks = [
  {
    title: "Moonlit Guardian",
    category: "Character Illustration",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Soft Morning Mage",
    category: "Personal Work",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pastel Daydream",
    category: "Commissioned Work",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Quiet Forest Spirit",
    category: "Illustration Study",
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Blue Hour Portrait",
    category: "Portrait Commission",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Little Star Witch",
    category: "Sketch / Study",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ArtPortfolioLandingPage() {
    const [pageContent, setPageContent] = useState({
        heroTitle: "",
        heroSubtitle: "",
        featuredTitle: "",
        ctaTitle: "",
        ctaText: "",
        ctaBText: "",

    });
    useEffect(() => {
        const loadSiteContent = async () => {
            try {
                const {data, error} = await supabase.from("site_content").select("*").single();
                setPageContent({
                    heroTitle: data?.hero_title,
                    heroSubtitle: data?.hero_subtitle,
                    featuredTitle: data?.featured_title,
                    ctaTitle: data?.cta_title,
                    ctaText: data?.cta_text,
                    ctaBText: data?.cta_button_text,
                })
            } catch (error) {
                alert(error);
                return;
            }

        }
        loadSiteContent();
        }
    ,[])
  return (
    <main className="min-h-screen bg-[#F7FBFF] text-slate-700">
      <nav className="sticky top-0 z-50 border-b border-sky-100/80 bg-[#F7FBFF]/80 backdrop-blur-xl">
        <div className="mx-auto flex items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-800">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-200/80 shadow-sm">
              <Sparkles className="h-5 w-5 text-sky-600" />
            </span>
            Lumi Art Studio
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#works" className="transition hover:text-sky-600">Gallery</a>
            <a href="#about" className="transition hover:text-sky-600">About</a>
            <a href="#commission" className="transition hover:text-sky-600">Commission</a>
          </div>

          <Button className="rounded-2xl bg-sky-400 px-5 text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500 hover:shadow-sky-300">
            Commission Me
          </Button>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#DDF1FF] via-[#F7FBFF] to-white">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              <Heart className="h-4 w-4 fill-sky-200 text-sky-500" />
              Custom character art with a soft magical touch
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
              {pageContent.heroTitle}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              {pageContent.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl bg-sky-400 px-7 py-6 text-base text-white shadow-xl shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-sky-300">
                Commission Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-2xl border-sky-200 bg-white/80 px-7 py-6 text-base text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-700">
                View Gallery
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-sky-200 blur-3xl opacity-60" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-2xl shadow-sky-100">
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1400&auto=format&fit=crop"
                alt="Featured character artwork"
                loading="eager"
                className="h-[460px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/80 p-4 shadow-lg backdrop-blur-xl">
                <p className="text-sm font-semibold text-slate-800">Featured Artwork</p>
                <p className="text-sm text-slate-500">Pastel character portrait with dreamy lighting</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Featured Works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">{pageContent.featuredTitle}</h2>
          <p className="mt-4 text-slate-600">Browse selected personal pieces, commissions, and gentle character studies.</p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, index) => (
            <motion.div
              key={art.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden rounded-[1.75rem] border-sky-100 bg-white shadow-lg shadow-sky-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100">
                <CardContent className="p-3">
                  <div className="overflow-hidden rounded-[1.35rem]">
                    <img
                      src={art.image}
                      alt={art.title}
                      loading="lazy"
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800">{art.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{art.category}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="commission" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-100 via-white to-blue-50 p-8 shadow-xl shadow-sky-100 md:p-12"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Commissions</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                {pageContent.ctaTitle}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                {pageContent.ctaText}
              </p>
            </div>
            <Button className="rounded-2xl bg-sky-400 px-7 py-6 text-base text-white shadow-xl shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-sky-300">
              {pageContent.ctaBText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="grid items-center gap-10 rounded-[2rem] bg-white p-6 shadow-lg shadow-sky-100/70 md:grid-cols-[280px_1fr] md:p-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto">
            <div className="rounded-full border-8 border-sky-100 bg-white p-2 shadow-xl shadow-sky-100">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
                alt="Artist avatar"
                loading="lazy"
                className="h-52 w-52 rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">About the Artist</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">Hi, I’m Lumi.</h2>
            <p className="mt-4 max-w-3xl leading-8 text-slate-600">
              I create character illustrations with soft colors, gentle expressions, and cozy details. My work is inspired by dreamy skies, quiet stories, and the little emotions that make a character feel alive.
            </p>
            <p className="mt-3 max-w-3xl leading-8 text-slate-600">
              Whether you want art of your original character, a cute portrait, or a special gift, I’ll help shape your idea into a warm and personal piece.
            </p>

            <div className="mt-7 flex gap-3">
              {[Send, MessageCircle, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-lg hover:shadow-sky-100"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-sky-100 bg-white/70 px-5 py-8 text-center text-sm text-slate-500">
        © 2026 Lumi Art Studio. Soft character art and commissions.
      </footer>
    </main>
  );
}
