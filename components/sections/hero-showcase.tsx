"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, MapPinned, Mountain, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LocalFoodRecord, PlaceRecord } from "@/types/database";

type HeroShowcaseProps = {
  places: PlaceRecord[];
  foods: LocalFoodRecord[];
  configMessage: string | null;
  errorMessage: string | null;
};

const statCards = [
  { label: "Nepal provinces", value: "7" },
  { label: "Live highlights", value: "20+" },
  { label: "Travel modes", value: "AI" },
];

export function HeroShowcase({ places, foods, configMessage, errorMessage }: HeroShowcaseProps) {
  const displayPlaces = places.length > 0 ? places : [
    { id: "p1", name: "Pashupatinath Temple", address: "Kathmandu", avg_rating: 4.8 },
    { id: "p2", name: "Pokhara Lakeside", address: "Pokhara", avg_rating: 4.7 },
    { id: "p3", name: "Boudhanath Stupa", address: "Kathmandu", avg_rating: 4.9 },
  ] as PlaceRecord[];

  const displayFoods = foods.length > 0 ? foods : [
    { id: "f1", name: "Dal Bhat", description: "Nepal’s signature comfort meal" },
    { id: "f2", name: "Momo", description: "Warm dumplings with local spice" },
    { id: "f3", name: "Thakali Set", description: "Hearty mountain hospitality" },
  ] as LocalFoodRecord[];

  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-[#1f5b49]/20 bg-[radial-gradient(circle_at_top_left,_rgba(217,166,58,0.18),_transparent_40%),linear-gradient(135deg,_#fdfcf7_0%,_#f1efe8_100%)] p-8 shadow-[0_30px_80px_rgba(15,76,129,0.12)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,_rgba(47,111,79,0.16),_transparent_25%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2f6f4f]/20 bg-white/80 px-3 py-1 text-sm font-medium text-[#0f4c81] shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-[#d9a63a]" />
            AI Tourism Companion for Nepal
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-[#0a3d62] sm:text-5xl lg:text-6xl">
            Discover Nepal with a <span className="text-[#2f6f4f]">premium</span> travel companion.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4b5563]">
            Plan treks, explore provinces and districts, and uncover the most memorable stays, foods, and hidden experiences in the Himalayas.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-[#0f4c81] text-white shadow-[0_10px_30px_rgba(15,76,129,0.25)] hover:bg-[#0a3d62]">
              <Link href="/explore">
                Start exploring <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-[#2f6f4f]/30 bg-white/70 text-[#2f6f4f] hover:bg-[#eef7f1]">
              <Link href="/planner">Open planner</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {statCards.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-semibold text-[#0a3d62]">{item.value}</p>
                <p className="mt-1 text-sm text-[#4b5563]">{item.label}</p>
              </div>
            ))}
          </div>

          {(configMessage || errorMessage) && (
            <div className="mt-6 rounded-2xl border border-[#d9a63a]/30 bg-[#fff8e6] p-4 text-sm text-[#7a4e2f]">
              {configMessage ?? errorMessage}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="relative overflow-hidden rounded-[2rem] border border-[#0f4c81]/10 bg-[#0a3d62] p-7 text-white shadow-[0_30px_80px_rgba(10,61,98,0.25)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,166,58,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(47,111,79,0.28),_transparent_25%)]" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[#f3c96b]">
            <Compass size={18} />
            <span className="text-sm font-medium uppercase tracking-[0.25em]">Paaila highlights</span>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-200">Trending destinations</p>
                <p className="mt-1 text-xl font-semibold">Curated for your next journey</p>
              </div>
              <div className="rounded-full bg-[#2f6f4f]/70 p-2">
                <Mountain size={18} />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {displayPlaces.slice(0, 3).map((place) => (
                <div key={place.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0f4c81]/50 px-3 py-3">
                  <div>
                    <p className="font-medium text-white">{place.name}</p>
                    <p className="text-sm text-slate-300">{place.address ?? "Nepal"}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-sm text-[#f3c96b]">
                    <Star size={14} fill="currentColor" />
                    <span>{place.avg_rating?.toFixed(1) ?? "0.0"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[#2f6f4f]/30 bg-[#112d28]/70 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a7d5c2]">Local flavors</p>
                <p className="mt-1 text-xl font-semibold">Taste Nepal, beautifully</p>
              </div>
              <div className="rounded-full bg-[#d9a63a]/20 p-2 text-[#f3c96b]">
                <Sparkles size={18} />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {displayFoods.slice(0, 3).map((food) => (
                <div key={food.id} className="flex items-start justify-between gap-3 rounded-2xl bg-white/10 p-3">
                  <div>
                    <p className="font-medium text-white">{food.name}</p>
                    <p className="mt-1 text-sm text-slate-300">{food.description}</p>
                  </div>
                  <div className="rounded-full bg-[#d9a63a]/20 p-2 text-[#f3c96b]">
                    <MapPinned size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
