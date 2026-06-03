"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
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
import { ArtCarousel } from "@/components/Carousel";
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

const fade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 },
};

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

export default function SiteContent() {
  const [isSaving, setIsSaving] = useState(false);
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
      }
    };
    loadSiteContent();
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const el = e.target;
    const { name, value } = el;
    setPageContent((prev) => ({
      ...prev,
      [name]: value,
    }));
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { data: siteContent, error } = await supabase
      .from("site_content")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (!siteContent || siteContent.length === 0) {
      alert("No Site Content Found");
      return;
    }

    const siteContentId = siteContent.id;

    const { data, error: fetchError } = await supabase
      .from("site_content")
      .update({
        hero_title: pageContent.heroTitle,
        hero_subtitle: pageContent.heroSubtitle,
        featured_title: pageContent.featuredTitle,
        cta_title: pageContent.ctaTitle,
        cta_text: pageContent.ctaText,
        cta_button_text: pageContent.ctaBText,
        about_title: pageContent.aboutTitle,
        about_text: pageContent.aboutText,
      })
      .eq("id", siteContentId)
      .select();

    if (fetchError) {
      console.error("Saving Failed:", fetchError);
      alert("Saving Failed");
      return;
    }

    console.log("Saved Successfully", data);
    alert("Saved Successfully");
    setIsSaving(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#F7FBFF]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <main className="min-h-screen bg-surface-50 text-slate-700 overflow-hidden">
          <nav className="sticky top-0 z-50 border-b border-primary-100/80 bg-surface-50/80 backdrop-blur-xl">
            <div className="mx-auto flex items-center justify-between px-5 py-4 md:px-8">
              <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-200/80 shadow-sm">
                  <Sparkles className="h-5 w-5 text-primary-600" />
                </span>
                <input type="text" defaultValue="Lumi Art Studio"></input>
              </div>

              <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                <a href="#works" className="transition hover:text-primary-600">
                  Gallery
                </a>
                <a href="#about" className="transition hover:text-primary-600">
                  About
                </a>
                <a
                  href="#commission"
                  className="transition hover:text-primary-600"
                >
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
            <hr className="mt-20 mb-8 max-w-[90%] mx-auto border-primary-700/20 hidden md:block lg:block" />

            <div className="relative mx-auto grid max-w-7xl items-center px-5 py-8 md:grid-cols-2 md:px-8 md:py-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeRight}
                transition={{ duration: 1 }}
              >
                <div className="relative w-fit h-fit mx-auto">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-4 py-2 text-sm text-primary-700 shadow-sm backdrop-blur">
                    <Heart className="h-4 w-4 fill-primary-200 text-primary-500" />
                    <p className="font-styled text-lg mt-1 sm:text-xl lg:text-2xl">
                      Character art with a soft magical touch
                    </p>
                  </div>

                  <textarea
                    className="max-w-[15ch] text-4xl mx-auto font-heading font-bold tracking-wide leading-[0.95] text-slate-800 sm:text-5xl md:text-5xl lg:text-6xl [text-shadow:4px_4px_4px_rgba(1,1,1,0.25)] overflow-hidden"
                    name="heroTitle"
                    value={pageContent.heroTitle}
                    onChange={handleInput}
                  ></textarea>

                  <textarea
                    className="mt-6 w-full font-body text-base leading-8 text-slate-600 md:text-lg overflow-hidden"
                    name="heroSubtitle"
                    value={pageContent.heroSubtitle}
                    onChange={handleInput}
                  ></textarea>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button className="rounded-2xl bg-primary-400 px-7 py-6 text-base text-white shadow-xl shadow-primary-200 transition hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-primary-300">
                      Commission Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-primary-200 bg-white/80 px-7 py-6 text-base text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-700"
                    >
                      View Gallery
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeLeft}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
                className="relative mx-auto w-full max-w-lg"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-primary-200 blur-3xl opacity-60" />
                <div className="relative mx-auto mt-20 w-full max-w-[520px] aspect-4/3 py-4 md:mt-0 lg:mt-0 transition duration-500 hover:scale-105">
                  <motion.div
                    animate={{
                      x: [0, -5, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",

                      // Makes each card start at different times
                      delay: 0.5,
                    }}
                    className="absolute top-0 left-0 h-[90%] w-[90%] rounded-[2rem] bg-primary-300 md:rounded-[3rem]"
                  />
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      x: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",

                      // Makes each card start at different times
                      delay: 0.5,
                    }}
                    className="absolute bottom-0 right-0 h-[80%] w-[80%] rounded-[2rem] bg-primary-900 md:rounded-[3rem]"
                  />
                  <div className="relative z-10 mx-auto h-full w-[90%] rounded-[2rem] float overflow-hidden shadow-2xl shadow-slate-900 ">
                    <img
                      src="https://i.pinimg.com/736x/ee/d6/fd/eed6fd6a3d1f461535030d4eb5717614.jpg"
                      alt=""
                      className="w-full h-full object-cover object-center zoom transition duration-700 scale-103 hover:scale-105 hover:brightness-110"
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
              <p className="text-sm font-bold font-heading uppercase tracking-[0.1em] text-primary-400 [text-shadow:0_0_4px_rgba(3,169,244,.3)]">
                Featured Works
              </p>
              <textarea
                className="mt-1 text-2xl font-bold font-heading text-center w-full h-10 tracking-tight text-primary-900 md:text-4xl overflow-hidden"
                name="featuredTitle"
                value={pageContent.featuredTitle}
                onChange={handleInput}
              ></textarea>
              <p className="text-lg font-body text-primary-900/70">
                Browse selected personal pieces, commissions, and gentle
                character studies.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fade}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
            >
              <div className="w-full min-h-120">
                <hr className="mt-8 max-w-[80%] mx-auto border-primary-700/20 " />
                <ArtCarousel></ArtCarousel>
              </div>
            </motion.div>
          </section>

          <section
            id="commission"
            className="mx-auto max-w-7xl px-5 pb-20 md:px-8"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeRight}
              transition={{ duration: 1 }}
              className="-mt-80 overflow-hidden rounded-[2rem] border border-primary-100 bg-gradient-to-br from-primary-100 via-white to-surface-50 p-8 shadow-xl shadow-primary-100 md:-mt-24 lg:mt-0 md:p-12"
            >
              <div className="h-fit py-4 px-0 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center md:p-0">
                <div className="flex-1">
                  <p className="text-sm font-bold font-heading uppercase tracking-[0.1em] text-primary-400 [text-shadow:0_0_4px_rgba(3,169,244,.3)]">
                    Commissions
                  </p>
                  <textarea
                    className="text-2xl mt-1 h-10 max-w-3xl w-full font-bold font-heading tracking-tight text-primary-900  md:text-3xl"
                    name="ctaTitle"
                    value={pageContent.ctaTitle}
                    onChange={handleInput}
                  ></textarea>
                  <textarea
                    className="w-full max-w-3xl font-body leading-7 text-primary-900/70 overflow-hidden"
                    name="ctaText"
                    value={pageContent.ctaText}
                    onChange={handleInput}
                  ></textarea>
                </div>
                <input
                  type="text"
                  className="button max-h-10! rounded-2xl font-body bg-primary-400 px-4 py-3 text-xs text-white shadow-xl shadow-primary-200 uppercase transition md:px-7 md:py-6 md:text-base md:ml-auto hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-primary-300"
                  name="ctaBText"
                  value={pageContent.ctaBText}
                  onChange={handleInput}
                ></input>
              </div>
            </motion.div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
            <div className="grid items-center rounded-[2rem] p-6 md:grid-cols-[280px_1fr] lg:p-10">
              <motion.div
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: false }}
                variants={fadeRight}
                transition={{ duration: 1 }}
                className="mx-auto"
              >
                <div className="bg-primary-200 p-3 rounded-full shadow-[6px_8px_15px] shadow-primary-900/40 mb-12 md:mb-0">
                  <img
                    src="https://i.pinimg.com/736x/4f/3b/95/4f3b95c3a2d989562165a98bb5197d73.jpg"
                    alt="Artist avatar"
                    loading="lazy"
                    className="h-52 w-52 rounded-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeLeft}
                transition={{ duration: 1 }}
              >
                <textarea
                  className="w-full text-sm font-bold font-heading uppercase tracking-[0.1em] text-primary-400 [text-shadow:0_0_4px_rgba(3,169,244,.3)]"
                  name="aboutTitle"
                  value={pageContent.aboutTitle}
                  onChange={handleInput}
                ></textarea>
                <hr className="ml-0 mt-1 w-[50%]  border-primary-700/20 lg:w-[30%] md:ml-4"/>
                <h2 className="ml-0 mt-1 text-3xl font-bold tracking-tight text-slate-800 md:ml-8">
              Hi, I’m <span className="text-primary-400">Frieren</span>.
            </h2>
                <textarea
                  className="w-full ml-0 font-body text-lg text-primary-900/70 md:ml-12"
                  name="aboutText"
                  value={pageContent.aboutText}
                  onChange={handleInput}
                ></textarea>

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
        <hr className="mt-12 w-[100%]  border-primary-700/20"/>
          </section>

          <footer className="border-t border-sky-100 bg-white/70 px-5 py-8 text-center text-sm text-slate-500">
            © 2026 Lumi Art Studio. Soft character art and commissions.
          </footer>
        </main>
      </div>

      {mounted &&
        createPortal(
          <Button
            type="button"
            onClick={handleSave}
            className="
        fixed
        bottom-6
        right-6
        z-[9999]
        rounded-2xl
        bg-sky-400
        px-6
        py-5
        text-white
        shadow-xl
        hover:bg-sky-500
      "
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>,
          document.body,
        )}
    </div>
  );
}
