"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Filter, Search, Sparkles } from "lucide-react";
import type { PlaceRecord } from "@/types/database";

type ExploreShowcaseProps = {
  places: PlaceRecord[];
};

const provinces = ["All", "Bagmati", "Gandaki", "Province 1", "Lumbini", "Karnali", "Sudurpashchim", "Madhesh"];
const categories = ["Heritage", "Adventure", "Religious", "Nature", "Urban", "Hidden Gems"];
const sampleDistricts = ["Kathmandu", "Pokhara", "Bhaktapur", "Lalitpur", "Chitwan", "Mustang"];

export function ExploreShowcase({ places }: ExploreShowcaseProps) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("All");
  const [district, setDistrict] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return places.filter((place) => {
      const address = `${place.address ?? ""} ${place.name ?? ""}`.toLowerCase();
      const matchesQuery = !normalizedQuery || address.includes(normalizedQuery);
      const matchesProvince = province === "All" || address.includes(province.toLowerCase());
      const matchesDistrict = district === "All" || address.includes(district.toLowerCase());
      const matchesCategory = category === "All" || address.includes(category.toLowerCase());

      return matchesQuery && matchesProvince && matchesDistrict && matchesCategory;
    });
  }, [category, district, places, province, query]);

  return (
    <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.95),_rgba(241,239,232,0.9))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Explore Nepal</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#0a3d62]">Find your next sacred or scenic stop</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d9a63a]/30 bg-[#fff8e6] px-3 py-1 text-sm font-medium text-[#7a4e2f]">
          <Sparkles size={16} />
          AI-powered discovery
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-[#0f4c81]/10 bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-[#0f4c81]/10 bg-[#f8fbfd] px-4 py-3">
            <Search size={16} className="text-[#0f4c81]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search places, districts, or experiences"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 rounded-full border border-[#0f4c81]/10 bg-[#f8fbfd] px-3 py-2 text-sm text-[#0f4c81]">
              <Filter size={14} />
              <select value={province} onChange={(event) => setProvince(event.target.value)} className="bg-transparent outline-none">
                {provinces.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-full border border-[#0f4c81]/10 bg-[#f8fbfd] px-3 py-2 text-sm text-[#0f4c81]">
              <Compass size={14} />
              <select value={district} onChange={(event) => setDistrict(event.target.value)} className="bg-transparent outline-none">
                <option value="All">District</option>
                {sampleDistricts.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={`rounded-full px-3 py-2 text-sm transition ${category === option ? "bg-[#0f4c81] text-white shadow" : "bg-[#f5f7fa] text-[#4b5563] hover:bg-[#eef4f8]"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.length > 0 ? filteredPlaces.map((place, index) => (
          <motion.article
            key={place.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: index * 0.04 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-[1.3rem] border border-[#0f4c81]/10 bg-white/80 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#eef7f1] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6f4f]">Featured</span>
              <span className="text-sm text-[#d9a63a]">★ {place.avg_rating?.toFixed(1) ?? "0.0"}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[#0a3d62]">{place.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[#4b5563]">{place.address ?? "A scenic destination in Nepal"}</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#e5e7eb] pt-3 text-sm text-[#4b5563]">
              <span>AI curated</span>
              <span className="font-medium text-[#0f4c81]">View journey</span>
            </div>
          </motion.article>
        )) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-[1.3rem] border border-dashed border-[#1f5b49]/25 bg-[#f8fbfd] p-8 text-center text-[#4b5563]">
            No matching destinations yet. Try broadening your filters.
          </div>
        )}
      </div>
    </section>
  );
}
