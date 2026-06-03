"use client";

import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import MasonrySection from "@/components/Masonry";
import { Sparkles } from "lucide-react";
import { ArtCarousel } from "@/components/Carousel";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

interface nav {
  id: number;
  name: string;
  preview_image?: string | null;
};

interface Artwork {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    image_tag: string | null;
}

export default function GalleryPage() {
    const [currentCategory, setCurrentCategory] = useState("all");
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);
    const [filteredArtworks, setFilteredArtworks] = useState<Artwork[] | null>(null);
    const [navs, setNavs] = useState<nav[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchArtworks = supabase.from("artworks_with_tags").select("*");
                const fetchNavs = supabase.from("tags_with_preview").select("*");
                const [artworksRes, navsRes] = await Promise.all([fetchArtworks,fetchNavs]);
                if(artworksRes.error) throw artworksRes.error;
                if(navsRes.error) throw navsRes.error;

                setArtworks(artworksRes.data);
                setNavs(navsRes.data);
            } catch (error) {
                alert(error);
                return;
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    },[])

const filtered = useMemo(() => {
            if(currentCategory === "all") return artworks;
            return artworks?.filter((artwork) => {
                return artwork.image_tag === currentCategory
            })
    },[artworks,currentCategory]);
if(isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
}
  return (
    <div className="min-h-screen bg-surface-50 overflow-hidden">
    <nav className="sticky top-0 z-50 border-b border-primary-100/80 bg-surface-50/80 backdrop-blur-xl">
        <div className="mx-auto flex items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-800"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-200/80 shadow-sm">
              <Sparkles className="h-5 w-5 text-primary-600" />
            </span>
            Lumi Art Studio
          </Link>

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
      <div className="w-full h-full mx-auto">
        <img src="https://i.pinimg.com/1200x/33/34/92/33349277b1aa177314440b96c1ed3199.jpg" className="w-full h-40 object-cover md:h-80"></img>
      </div>
      <hr className=" mt-4 mb-4 max-w-[70%] mx-auto border-primary-700/20 hidden md:block lg:block"/>
      <div className=" flex items-center px-0 lg:px-8">
        <div className="relative mt-2 w-full flex-1 mr-2 items-center justify-center min-h-24">
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-primary-50 to-transparent" />
          <div className="flex mx-auto overflow-x-auto no-scrollbar">
            {navs?.map((nav) => (
              <Button
                key={nav.name}
                onClick={() => setCurrentCategory(nav.name)}
                className={`rounded-[1rem] min-h-12 px-0 pr-3 mr-3 py-2 min-w-fit overflow-hidden bg-transparent transition-all duration-400 lg:mr-8 hover:bg-primary-200
                ${currentCategory === nav.name? 'bg-primary-100' : ""}
                    `}
              >
                <img
                  className={`h-12 w-12 rounded-[.7rem] object-cover mr-[1rem}`}
                  src={nav.preview_image? nav.preview_image : "https://i.pinimg.com/736x/10/f9/49/10f949b11d982ba69fc74aba940acf62.jpg"}
                ></img>
                <p className={`text-slate-800 ${currentCategory === nav.name? "text-primary-400" : ""} transition-all duration-500`}>{nav.name}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <main className="px-2 w-full md:px-4">
        <div className="flex">
            <h1 className="flex-1 text-2xl font-bold font-heading uppercase p-2 md:text-4xl lg:text-5xl">{currentCategory}</h1>
        <div className="h-full w-xl">
          <Field orientation="horizontal" className="rounded-[1rem] bg-">
            <Input placeholder="Search..." />
            <Button>Search</Button>
          </Field>
        </div>
        </div>
        <div className="mt-8">
            <MasonrySection artworks={filtered? filtered :artworks}></MasonrySection>
        </div>
      </main>
    </div>
  );
}
