"use client";

import { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const artworks = [
  {
    title: "Moonlit Guardian",
    type: "Featured",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Pastel Daydream",
    type: "Commission",
    image:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Blue Hour Portrait",
    type: "Personal",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=900&auto=format&fit=crop",
  },
];



const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function ArtistDashboardPage() {
  return (
        <section className="flex-1 px-5 py-6 md:px-8 lg:px-10">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
                Artist Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                Welcome back, Lumi
              </h1>
              <p className="mt-2 text-slate-500">
                Manage artworks, profile details, commissions, and incoming
                requests.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-2xl border-sky-100 bg-white text-slate-600 shadow-sm hover:bg-sky-50"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button className="rounded-2xl bg-sky-400 px-5 text-white shadow-lg shadow-sky-200 hover:bg-sky-500">
                <Plus className="mr-2 h-4 w-4" />
                Add Artwork
              </Button>
            </div>
          </header>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {[
              ["Total Artworks", "42"],
              ["Featured Works", "8"],
              ["Open Requests", "6"],
              ["Completed", "27"],
            ].map(([label, value]) => (
              <Card
                key={label}
                className="rounded-[1.5rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60"
              >
                <CardContent className="p-5">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-800">
                    {value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
            <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800">
                    Artworks Management
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-500">
                    Preview, edit, delete, and feature your artwork.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-sky-100 bg-sky-50 text-sky-700 hover:bg-sky-100"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Upload New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 md:grid-cols-3">
                  {artworks.map((art, index) => (
                    <motion.div
                      key={art.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group overflow-hidden rounded-[1.5rem] border border-sky-100 bg-[#F7FBFF] p-3 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100"
                    >
                      <div className="overflow-hidden rounded-[1.2rem]">
                        <img
                          src={art.image}
                          alt={art.title}
                          loading="lazy"
                          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {art.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {art.type}
                            </p>
                          </div>
                          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                            Live
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-xl border-sky-100 bg-white text-sky-600 hover:bg-sky-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-xl border-sky-100 bg-white text-yellow-600 hover:bg-yellow-50"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-xl border-red-100 bg-white text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>


          </div>


        </section>
  );
}
