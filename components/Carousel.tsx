"use client";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "./ui/skeleton";

const artworks = [

  {
    title: "Moonlit Guardian",
    category: "Character Illustration",
    image:
      "https://i1-e.pinimg.com/1200x/fb/f3/ff/fbf3ff5aa547c621b1b7c948f040d40c.jpg",
  },
  {
    title: "Pastel Daydream",
    category: "Commissioned Work",
    image:
      "https://i1-e.pinimg.com/1200x/4d/5c/6c/4d5c6c4e19e1686d2630dd4509b81883.jpg",
  },
  {
    title: "Quiet Forest Spirit",
    category: "Illustration Study",
    image:
      "https://i1-e.pinimg.com/1200x/58/9f/bb/589fbbc112c3f0af9e45a55a800a7692.jpg",
  },
  {
    title: "Blue Hour Portrait",
    category: "Portrait Commission",
    image:
      "https://i.pinimg.com/736x/f7/05/08/f705083dadc2de4aec2d9cdc94e932a0.jpg",
  },
  {
    title: "Little Star Witch",
    category: "Sketch / Study",
    image:
      "https://i.pinimg.com/736x/b0/4d/a2/b04da24f15e49f6fe44281ecc5f79305.jpg",
  },
];

export function ArtCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    setIsLoading(false);
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-[150%] ml-[-25%] py-4 max-w-7xl md:w-full md:ml-0 md:mx-auto"
      >
        <CarouselContent className="-ml-1 py-8">
          {artworks.map((artwork, index) => (
            <CarouselItem
              key={index}
              className={`relative basis-1/3 md:basis-1/3 lg:basis-1/3 md:pl-1 ${
                    index === (current + 1) % artworks.length ? "z-20" : "z-0"
                  }`}
            >
                  <Card
                    className={`h-24 w-full p-0 rounded-[0.5rem] shadow-lg md:rounded-[2rem] md:h-48 lg:h-64 transition-all duration-600 ${
                      index === (current + 1) % artworks.length
                        ? "scale-150 md:scale-110 opacity-100"
                        : "scale-100 md:scale-85 opacity-85"
                    }`}
                  >
                    {isLoading ? (
                      <Skeleton></Skeleton>
                    ) : (
                      <img src={artwork.image} className="h-full w-full object-cover"></img>
                    )}
                  </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-3 items-center justify-center w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-2xl ${
              index === current % count
                ? "bg-primary-500/50"
                : "bg-primary-900/10"
            }`}
          />
        ))}
      </div>
    </>
  );
}
