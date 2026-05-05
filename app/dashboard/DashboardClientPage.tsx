"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import React from "react";
import { motion } from "framer-motion";
import {
  Image,
  User,
  Settings,
  Inbox,
  Plus,
  Pencil,
  Trash2,
  Star,
  Upload,
  Save,
  ToggleRight,
  Search,
  Bell,
  CheckCircle2,
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

const requests = [
  {
    name: "Mia Santos",
    type: "OC Portrait",
    date: "Apr 28",
    status: "Pending",
  },
  {
    name: "Kai Rivera",
    type: "Couple Art",
    date: "Apr 27",
    status: "Accepted",
  },
  {
    name: "Nora Lee",
    type: "Character Sheet",
    date: "Apr 25",
    status: "In Progress",
  },
  { name: "Theo Cruz", type: "Gift Portrait", date: "Apr 22", status: "Done" },
];

const menuItems = [
  { label: "Artworks", icon: Image, active: true },
  { label: "Profile", icon: User },
  { label: "Commission Settings", icon: Settings },
  { label: "Commission Requests", icon: Inbox },
];

const statusClass: Record<string, string> = {
  Pending: "bg-slate-100 text-slate-600",
  Accepted: "bg-sky-100 text-sky-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Done: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function ArtistDashboardPage() {
  // PROFILE STATES
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [tagline, setTagline] = useState("");
  const [avatarPic, setAvatarPic] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .single();
        if (error) {
          console.error(error);
          return;
        }
        if (!data) {
          alert("No data");
          return;
        }

        setArtistName(data.name);
        setBio(data.bio);
        setTagline(data.tagline);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the one existing profile
    const { data: profiles, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .limit(1);

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    if (!profiles || profiles.length === 0) {
      alert("No profile found.");
      return;
    }

    const profileId = profiles[0].id;

    // Update that profile
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: artistName,
        bio: bio,
        tagline: tagline,
      })
      .eq("id", profileId)
      .select();

    if (error) {
      console.error("Saving failed:", error);
      alert("Saving failed");
      return;
    }

    console.log("Updated:", data);
    alert("Profile saved successfully");
  };
  return (
    <main className="min-h-screen bg-[#F7FBFF] text-slate-700">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-sky-100 bg-white/80 px-5 py-4 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
          <div className="flex items-center justify-between lg:block">
            <a
              href="#"
              className="flex items-center gap-3 text-lg font-bold tracking-tight text-slate-800"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-200/80 shadow-sm">
                <Star className="h-5 w-5 fill-sky-100 text-sky-600" />
              </span>
              Lumi Studio
            </a>
            <Button
              size="icon"
              variant="outline"
              className="rounded-2xl border-sky-100 bg-sky-50 text-sky-600 lg:hidden"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href="#"
                  className={`flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    item.active
                      ? "bg-sky-100 text-sky-700 shadow-sm"
                      : "text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-8 hidden rounded-[1.5rem] bg-gradient-to-br from-sky-100 to-white p-5 shadow-sm lg:block">
            <p className="text-sm font-semibold text-slate-800">
              Commission Status
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Open
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              You are currently accepting new custom artwork requests.
            </p>
          </div>
        </aside>

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

            <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">
                  Profile Settings
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Update your public artist profile.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
                    alt="Artist avatar"
                    loading="lazy"
                    className="h-20 w-20 rounded-full border-4 border-sky-100 object-cover shadow-sm"
                  />
                  <Button
                    variant="outline"
                    className="rounded-2xl border-sky-100 bg-sky-50 text-sky-700 hover:bg-sky-100"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Avatar
                  </Button>
                </div>
                <form onSubmit={handleSaveProfile}>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-600">
                      Artist Name
                    </span>
                    <input
                      className="mt-2 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-600">
                      Tagline
                    </span>
                    <input
                      className="mt-2 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-600">
                      Bio
                    </span>
                    <textarea
                      className="mt-2 min-h-28 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </label>

                  <Button
                    type="submit"
                    className="w-full rounded-2xl bg-sky-400 py-6 text-white shadow-lg shadow-sky-200 hover:bg-sky-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.4fr]">
            <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">
                  Commission Settings
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Control availability, pricing, terms, and process.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                  <div>
                    <p className="font-semibold text-slate-800">Availability</p>
                    <p className="text-sm text-green-700">
                      Open for commissions
                    </p>
                  </div>
                  <ToggleRight className="h-9 w-9 text-sky-500" />
                </div>

                {[
                  ["Pricing", "Bust: $35\nHalf Body: $55\nFull Body: $80"],
                  [
                    "Terms",
                    "Payment upfront. Personal use only unless discussed.",
                  ],
                  [
                    "Process",
                    "Submit request → Review → Payment → Sketch → Final art",
                  ],
                ].map(([label, value]) => (
                  <label key={label} className="block">
                    <span className="text-sm font-medium text-slate-600">
                      {label}
                    </span>
                    <textarea
                      className="mt-2 min-h-24 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                      defaultValue={value}
                    />
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800">
                    Commission Requests
                  </CardTitle>
                  <p className="mt-1 text-sm text-slate-500">
                    Review incoming client requests and update their status.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-sky-100 bg-white text-slate-600 hover:bg-sky-50"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-[1.5rem] border border-sky-100">
                  <div className="hidden grid-cols-4 bg-sky-50 px-5 py-3 text-sm font-semibold text-slate-600 md:grid">
                    <span>Client</span>
                    <span>Type</span>
                    <span>Date</span>
                    <span>Status</span>
                  </div>
                  {requests.map((request) => (
                    <div
                      key={request.name}
                      className="grid gap-3 border-t border-sky-100 px-5 py-4 transition hover:bg-sky-50/70 md:grid-cols-4 md:items-center"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {request.name}
                        </p>
                        <p className="text-sm text-slate-500 md:hidden">
                          {request.type} · {request.date}
                        </p>
                      </div>
                      <p className="hidden text-sm text-slate-600 md:block">
                        {request.type}
                      </p>
                      <p className="hidden text-sm text-slate-500 md:block">
                        {request.date}
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[request.status]}`}
                        >
                          {request.status}
                        </span>
                        {request.status === "Done" && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
