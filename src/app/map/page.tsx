"use client";

import { useState } from "react";
import { Search, ChevronRight, MapPin } from "lucide-react";
import { provinces } from "@/lib/data";
import { mapFilters } from "@/lib/data";

export default function MapPage() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const selectedProvince = provinces.find((province) => province.id === selectedProvinceId) ?? null;

  const filteredProvinces = provinces.filter((province) => province.name.toLowerCase().includes(search.toLowerCase()));

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#F0F6FF] px-5 py-12 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.28em] text-[#2D5A8E]">Interactive Map</p>
            <h2 className="mt-3 text-2xl font-semibold">Find provinces and highlights</h2>
          </div>

          <div className="relative mb-6">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search places..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
            />
          </div>

          <div className="mb-6">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">Show on map</p>
            <div className="flex flex-wrap gap-2">
              {mapFilters.map((filter) => {
                const active = activeFilters.includes(filter);
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => toggleFilter(filter)}
                    className={`rounded-2xl px-3 py-2 text-xs font-semibold transition ${active ? "bg-[#1B3A2D] text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">All Provinces</p>
            <div className="space-y-2">
              {filteredProvinces.map((province) => (
                <button
                  key={province.id}
                  type="button"
                  onClick={() => setSelectedProvinceId(province.id)}
                  className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                >
                  <span>{province.name}</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-[#2D5A8E]">Nepal — Land of the Himalayas</p>
            <h1 className="mt-3 text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Click a province to explore its details
            </h1>
          </div>

          <div className="rounded-3xl bg-[#EFF7FF] p-6">
            <svg viewBox="0 50 960 290" className="h-full w-full overflow-visible rounded-3xl" preserveAspectRatio="xMidYMid meet">
              <rect x="0" y="50" width="960" height="290" rx="16" fill="#F0F7FF" />
              {[
                { id: 7, path: "M 15 60 L 195 55 L 195 218 L 155 228 L 15 228 Z", cx: 105, cy: 145 },
                { id: 6, path: "M 195 52 L 348 48 L 348 218 L 195 218 Z", cx: 272, cy: 135 },
                { id: 4, path: "M 348 45 L 502 42 L 502 185 L 348 185 Z", cx: 425, cy: 113 },
                { id: 5, path: "M 195 218 L 502 185 L 502 268 L 195 268 Z", cx: 350, cy: 232 },
                { id: 3, path: "M 500 42 L 662 45 L 662 268 L 500 268 Z", cx: 581, cy: 158 },
                { id: 2, path: "M 195 268 L 662 268 L 662 305 L 195 305 Z", cx: 428, cy: 286 },
                { id: 1, path: "M 660 45 L 945 50 L 945 305 L 660 305 Z", cx: 800, cy: 180 },
              ].map((shape) => {
                const province = provinces.find((item) => item.id === shape.id)!;
                const isActive = selectedProvince?.id === province.id;
                return (
                  <g key={province.id} onClick={() => setSelectedProvinceId(province.id)} style={{ cursor: "pointer" }}>
                    <path d={shape.path} fill={province.color} fillOpacity={isActive ? 0.92 : 0.66} stroke="#ffffff" strokeWidth="2.5" />
                    <text x={shape.cx} y={shape.cy - 7} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Playfair Display, serif">
                      {province.name}
                    </text>
                    <text x={shape.cx} y={shape.cy + 9} textAnchor="middle" fill="#ffffff" fontSize="8" opacity="0.75" fontFamily="Caveat, cursive">
                      {province.nepali}
                    </text>
                  </g>
                );
              })}
              <g transform="translate(928, 80)">
                <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#CBD5E0" strokeWidth="1.5" />
                <text x="0" y="-6" textAnchor="middle" fontSize="7" fill="#555" fontWeight="bold">N</text>
                <text x="0" y="11" textAnchor="middle" fontSize="7" fill="#999">S</text>
                <text x="-11" y="3" textAnchor="middle" fontSize="7" fill="#999">W</text>
                <text x="11" y="3" textAnchor="middle" fontSize="7" fill="#999">E</text>
                <polygon points="0,-12 2.5,0 0,4 -2.5,0" fill="#A8200D" />
              </g>
              <text x="22" y="328" fontSize="9" fill="#94a3b8" fontFamily="Nunito, sans-serif">
                Simplified province map for navigation — click to explore
              </text>
            </svg>
          </div>

          {selectedProvince ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{selectedProvince.name} Province</p>
                  <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedProvince.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">Capital: {selectedProvince.capital}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-3xl bg-[#1B3A2D] px-4 py-3 text-sm font-semibold text-white">Explore</button>
                  <button onClick={() => setSelectedProvinceId(null)} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    Close
                  </button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Best Season</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{selectedProvince.bestSeason}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Budget</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{selectedProvince.budget}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <h3 className="mb-3 text-lg font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Highlights
                  </h3>
                  <div className="space-y-2">
                    {selectedProvince.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 rounded-2xl bg-white p-3 text-sm text-slate-700">
                        <MapPin size={14} className="text-[#1B5E3B]" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <h3 className="mb-3 text-lg font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Things to Know
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">Selected province details are placeholders based on the Figma design. Use this screen to expand itinerary and local guide info later.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
              <p className="text-xl font-semibold">Select a province on the map to view details.</p>
              <p className="mt-3 text-sm">This screen is designed for a responsive interactive map experience.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
