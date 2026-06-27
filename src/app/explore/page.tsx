"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { destinations } from "@/lib/data";

const FILTERS = ["Historical", "Religious", "Hiking", "Nature", "Lakes", "Adventure", "Wildlife", "Budget Friendly"];
const SORTS = [
  { value: "rating", label: "⭐ Highest Rated" },
  { value: "budget", label: "💰 Cheapest" },
  { value: "trending", label: "🔥 Trending" },
  { value: "hidden", label: "🌿 Hidden Gems" },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((destination) => {
        const query = search.toLowerCase();
        const matchSearch = !query || [destination.name, destination.province, destination.category]
          .some((value) => value.toLowerCase().includes(query));
        const matchFilters = activeFilters.length === 0 || activeFilters.some((filter) =>
          destination.category.toLowerCase().includes(filter.toLowerCase()) ||
          destination.desc.toLowerCase().includes(filter.toLowerCase())
        );
        return matchSearch && matchFilters;
      })
      .sort((a, b) => {
        if (sortBy === "budget") {
          return a.budget.localeCompare(b.budget, undefined, { numeric: true });
        }
        if (sortBy === "hidden") {
          return a.name.localeCompare(b.name);
        }
        return b.rating - a.rating;
      });
  }, [activeFilters, search, sortBy]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-[#2D5A8E]">Explore Nepal</p>
          <h1 className="text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover unforgettable destinations
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Search by region, theme, or mood to find the perfect Nepal itinerary.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2D5A8E]"
                placeholder="Search Pokhara, Lumbini, Bhaktapur, Mustang..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SORTS.map((sort) => (
                <button
                  key={sort.value}
                  type="button"
                  onClick={() => setSortBy(sort.value)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${sortBy === sort.value ? "bg-[#1B3A2D] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Filter size={16} />
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => toggleFilter(filter)}
                className={`rounded-full border px-3 py-2 transition ${activeFilters.includes(filter) ? "border-[#1B3A2D] bg-[#EBF5EE] text-[#1B3A2D]" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} onAction={() => {}} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl bg-white p-16 text-center text-slate-600 shadow-sm border border-slate-200">
              <p className="text-xl font-semibold">No destinations matched your search.</p>
              <p className="mt-2 text-sm">Try a broader query or clear the filters to explore more.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
