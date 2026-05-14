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
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Soft Morning Mage",
    category: "Personal Work",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pastel Daydream",
    category: "Commissioned Work",
    image:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Quiet Forest Spirit",
    category: "Illustration Study",
    image:
      "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Blue Hour Portrait",
    category: "Portrait Commission",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Little Star Witch",
    category: "Sketch / Study",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export default function ArtPortfolioLandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageContent, setPageContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
    featuredTitle: "",
    ctaTitle: "",
    ctaText: "",
    ctaBText: "",
    aboutTitle: "",
    aboutText: "",
  });
  useEffect(() => {
    const loadSiteContent = async () => {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .single();
        setPageContent({
          heroTitle: data?.hero_title,
          heroSubtitle: data?.hero_subtitle,
          featuredTitle: data?.featured_title,
          ctaTitle: data?.cta_title,
          ctaText: data?.cta_text,
          ctaBText: data?.cta_button_text,
          aboutTitle: data?.about_title,
          aboutText: data?.about_text,
        });
      } catch (error) {
        alert(error);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    loadSiteContent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-surface-50 text-slate-700">
      <nav className="sticky top-0 z-50 border-b border-primary-100/80 bg-surface-50/80 backdrop-blur-xl">
        <div className="mx-auto flex items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-800"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-200/80 shadow-sm">
              <Sparkles className="h-5 w-5 text-primary-600" />
            </span>
            Lumi Art Studio
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#works" className="transition hover:text-primary-600">
              Gallery
            </a>
            <a href="#about" className="transition hover:text-primary-600">
              About
            </a>
            <a href="#commission" className="transition hover:text-primary-600">
              Commission
            </a>
          </div>

          <Button className="rounded-2xl bg-primary-400 px-5 text-white shadow-lg shadow-primary-200 transition hover:bg-primary-500 hover:shadow-primary-300">
            Commission Me
          </Button>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-surface-200 via-surface-50 to-white">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-200/50 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary-100/70 blur-3xl" />

        <hr className="mt-24 mb-8 max-w-[90%] mx-auto border-primary-700/20 hidden md:block lg:block"></hr>

        <div className="relative mx-auto grid max-w-7xl items-center px-5 py-8 md:grid-cols-2 md:px-8 md:py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeRight}
            transition={{ duration: 1 }}
          >
            <div className="relative w-fit h-fit mx-auto">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-4 py-2 text-sm text-primary-700 shadow-sm backdrop-blur">
                <Heart className="h-4 w-4 fill-primary-200 text-primary-500" />
                <p className="font-styled text-xl mt-1">Custom character art with a soft magical touch</p>
              </div>

              <h1 className=" max-w-[15ch] text-4xl mx-auto font-heading font-bold tracking-wide leading-[0.95] text-slate-800 sm:text-5xl md:text-5xl lg:text-6xl [text-shadow:4px_4px_4px_rgba(1,1,1,0.25)]">
                {pageContent.heroTitle}
              </h1>

              <p className=" max-w-xl mx-auto font-body text-base leading-8 text-slate-600 md:text-lg">
                {pageContent.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-2xl bg-primary-400 px-7 py-6 text-base text-white shadow-xl shadow-primary-200 transition hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-primary-300 md:px-5 md:text-sm">
                  Commission Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-primary-200 bg-white/80 px-7 py-6 text-base text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-700 md:px-5 md:text-sm"
                >
                  View Gallery
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
            transition={{ duration: 1 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-primary-200 blur-3xl opacity-60" />
            <div className="relative mx-auto mt-20 w-full max-w-[520px] aspect-4/3 py-4 md:mt-0 lg:mt-0 transition duration-500 hover:scale-105">
              <div className="absolute top-0 left-0 h-[90%] w-[90%] rounded-[2rem] bg-primary-300 md:rounded-[3rem]" />
              <div className="absolute bottom-0 right-0 h-[80%] w-[80%] rounded-[2rem] bg-primary-900 md:rounded-[3rem]" />
              <div className="relative z-10 mx-auto h-full w-[90%] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900 ">
                    <img
                src="https://i.pinimg.com/736x/ee/d6/fd/eed6fd6a3d1f461535030d4eb5717614.jpg"
                alt=""
                className="w-full h-full object-cover object-center transition duration-700 hover:scale-105 hover:brightness-110"
              />
              </div>
            </div>
          </motion.div>
        </div>
        <hr className="mt-8 mb-24 max-w-[50%] mx-auto border-primary-700/20 hidden md:block lg:block"></hr>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Featured Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800  md:text-4xl">
            {pageContent.featuredTitle}
          </h2>
          <p className="mt-4 text-slate-600">
            Browse selected personal pieces, commissions, and gentle character
            studies.
          </p>
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
              <Card className="group overflow-hidden rounded-[1.75rem] border-primary-100 bg-white shadow-lg shadow-primary-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100">
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
                    <h3 className="font-semibold text-slate-800">
                      {art.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {art.category}
                    </p>
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
          className="relative overflow-hidden rounded-[2rem] border border-primary-100 bg-gradient-to-br from-primary-100 via-white to-surface-50 p-8 shadow-xl shadow-primary-100 md:p-12"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-200/60 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
                Commissions
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                {pageContent.ctaTitle}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                {pageContent.ctaText}
              </p>
            </div>
            <Button className="rounded-2xl bg-primary-400 px-7 py-6 text-base text-white shadow-xl shadow-primary-200 transition hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-primary-300">
              {pageContent.ctaBText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="grid items-center gap-10 rounded-[2rem] bg-white p-6 shadow-lg shadow-primary-100/70 md:grid-cols-[280px_1fr] md:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto"
          >
            <div className="rounded-full border-8 border-primary-100 bg-white p-2 shadow-xl shadow-primary-100">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
                alt="Artist avatar"
                loading="lazy"
                className="h-52 w-52 rounded-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
              {pageContent.aboutTitle}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
              Hi, I’m Lumi.
            </h2>
            {pageContent.aboutText}

            <div className="mt-7 flex gap-3">
              {[Send, MessageCircle, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-primary-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-100 hover:shadow-lg hover:shadow-primary-100"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-primary-100 bg-white/70 px-5 py-8 text-center text-sm text-slate-500">
        © 2026 Lumi Art Studio. Soft character art and commissions.
      </footer>
    </main>
  );
}
