"use client";

import { useMemo, useState } from "react";
import { Compass, MapPin, Search, Sparkles } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";
import { provinces, mapFilters } from "@/src/lib/data";

type Highlight = {
  id: number;
  label: string;
  x: number;
  y: number;
};

const highlights: Highlight[] = [
  { id: 1, label: "Koshi", x: 120, y: 98 },
  { id: 2, label: "Madhesh", x: 218, y: 176 },
  { id: 3, label: "Bagmati", x: 214, y: 114 },
  { id: 4, label: "Gandaki", x: 127, y: 154 },
  { id: 5, label: "Lumbini", x: 94, y: 205 },
  { id: 6, label: "Karnali", x: 48, y: 132 },
  { id: 7, label: "Sudurpashchim", x: 8, y: 182 },
];

const provinceShapes = [
  { id: 7, path: "M 4 72 L 92 64 L 110 126 L 76 188 L 6 178 Z" },
  { id: 6, path: "M 92 58 L 168 52 L 186 120 L 132 172 L 110 126 Z" },
  { id: 4, path: "M 168 48 L 246 52 L 242 126 L 186 120 Z" },
  { id: 5, path: "M 76 188 L 164 160 L 214 188 L 132 228 L 8 212 Z" },
  { id: 3, path: "M 246 52 L 336 58 L 332 132 L 242 126 Z" },
  { id: 2, path: "M 164 160 L 242 126 L 332 132 L 320 212 L 214 188 Z" },
  { id: 1, path: "M 332 58 L 434 68 L 446 214 L 320 212 L 332 132 Z" },
];

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(3);

  const filteredProvinces = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return provinces.filter((province) => {
      const matchesSearch =
        !normalizedSearch ||
        [province.name, province.nepali, province.capital, province.description, ...province.highlights]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every((filter) =>
          [province.name, province.nepali, province.capital, province.description, ...province.categories, ...province.highlights]
            .join(" ")
            .toLowerCase()
            .includes(filter.toLowerCase())
        );

      return matchesSearch && matchesFilters;
    });
  }, [activeFilters, search]);

  const selectedProvince =
    provinces.find((province) => province.id === selectedProvinceId) ?? filteredProvinces[0] ?? provinces[0];

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Interactive Map</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0a3d62] sm:text-4xl">Explore Nepal by province and highlight</h1>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              Search a province, filter by travel mood, and tap the map to inspect each region's signature experiences.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9a63a]/30 bg-[#fff8e6] px-3 py-1 text-sm font-medium text-[#7a4e2f]">
            <Sparkles size={16} />
            Mock map for itinerary discovery
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <aside className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0f4c81]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search places, culture, or destinations"
                className="w-full rounded-full border border-[#0f4c81]/10 bg-[#f8fbfd] px-11 py-3 text-sm outline-none transition focus:border-[#2f6f4f]"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {mapFilters.map((filter) => {
                const isActive = activeFilters.includes(filter);

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => toggleFilter(filter)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${isActive ? "bg-[#0f4c81] text-white shadow" : "bg-[#f5f7fa] text-[#4b5563] hover:bg-[#eef4f8]"}`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-[1.25rem] border border-[#1f5b49]/10 bg-[#f8fbfd] p-4 text-sm text-[#4b5563]">
              <p className="font-semibold text-[#0a3d62]">Map legend</p>
              <p className="mt-2 leading-6">
                Each province uses its own accent color so the map feels closer to the Figma exploration screen while staying fully static.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {filteredProvinces.map((province) => {
                const isActive = selectedProvince?.id === province.id;

                return (
                  <button
                    key={province.id}
                    type="button"
                    onClick={() => setSelectedProvinceId(province.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${isActive ? "border-transparent bg-[#0f4c81] text-white shadow" : "border-[#e5e7eb] bg-white text-[#0a3d62] hover:bg-[#f8fbfd]"}`}
                  >
                    <span>
                      <span className="block font-semibold">{province.name}</span>
                      <span className={`mt-1 block text-xs ${isActive ? "text-slate-200" : "text-[#6b7280]"}`}>{province.nepali} · {province.capital}</span>
                    </span>
                    <Compass size={16} className={isActive ? "text-[#f3c96b]" : "text-[#94a3b8]"} />
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-[linear-gradient(180deg,_#f2f7ff_0%,_#ffffff_100%)] p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Nepal map</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#0a3d62]">Tap a province to inspect highlights</h2>
              </div>
              <div className="rounded-full bg-[#0f4c81] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                Static atlas
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white bg-white p-4 shadow-[0_20px_40px_rgba(15,76,129,0.08)]">
                <svg viewBox="0 0 460 260" className="h-full w-full" role="img" aria-label="Stylized map of Nepal">
                  <defs>
                    <linearGradient id="mapBackdrop" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#edf5ff" />
                      <stop offset="100%" stopColor="#fff9ef" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="460" height="260" rx="28" fill="url(#mapBackdrop)" />
                  {provinceShapes.map((shape) => {
                    const province = provinces.find((item) => item.id === shape.id);
                    if (!province) {
                      return null;
                    }

                    const isActive = selectedProvince?.id === province.id;

                    return (
                      <g key={province.id} onClick={() => setSelectedProvinceId(province.id)} className="cursor-pointer">
                        <path d={shape.path} fill={province.color} fillOpacity={isActive ? 0.92 : 0.72} stroke="#ffffff" strokeWidth="2.5" />
                      </g>
                    );
                  })}
                  {highlights.map((point) => (
                    <g key={point.id}>
                      <circle cx={point.x} cy={point.y} r="6" fill="#ffffff" opacity="0.8" />
                      <circle cx={point.x} cy={point.y} r="3" fill="#f3c96b" />
                    </g>
                  ))}
                  <g transform="translate(402 26)">
                    <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#dbeafe" strokeWidth="1.5" />
                    <text x="0" y="-6" textAnchor="middle" fontSize="7" fill="#0a3d62" fontWeight="700">N</text>
                    <text x="0" y="11" textAnchor="middle" fontSize="7" fill="#94a3b8">S</text>
                    <text x="-11" y="3" textAnchor="middle" fontSize="7" fill="#94a3b8">W</text>
                    <text x="11" y="3" textAnchor="middle" fontSize="7" fill="#94a3b8">E</text>
                    <polygon points="0,-12 2.5,0 0,4 -2.5,0" fill="#c2410c" />
                  </g>
                  <text x="20" y="242" fontSize="10" fill="#94a3b8" fontFamily="Inter, sans-serif">
                    A stylized province map for fast travel discovery
                  </text>
                  {highlights.map((point) => (
                    <text key={`${point.id}-label`} x={point.x + 10} y={point.y + 4} fontSize="8" fill="#0a3d62" fontWeight="700">
                      {point.label}
                    </text>
                  ))}
                </svg>
              </div>

              <div className="rounded-[1.5rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#2f6f4f]">Selected province</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#0a3d62]">{selectedProvince.name}</h3>
                    <p className="mt-1 text-sm text-[#6b7280]">{selectedProvince.nepali} · {selectedProvince.capital}</p>
                  </div>
                  <div className="rounded-2xl bg-[#fff8e6] p-3 text-[#c2410c]">
                    <MapPin size={18} />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#4b5563]">{selectedProvince.description}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f8fbfd] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#94a3b8]">Best season</p>
                    <p className="mt-2 text-sm font-semibold text-[#0a3d62]">{selectedProvince.bestSeason}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f8fbfd] p-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#94a3b8]">Budget</p>
                    <p className="mt-2 text-sm font-semibold text-[#0a3d62]">{selectedProvince.budget}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#94a3b8]">Highlights</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProvince.highlights.map((highlight) => (
                      <span key={highlight} className="rounded-full bg-white px-3 py-2 text-xs font-medium text-[#4b5563] shadow-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,_#0a3d62,_#0f4c81)] p-4 text-white shadow-[0_15px_30px_rgba(10,61,98,0.16)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#f3c96b]">Map insight</p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">
                    {selectedProvince.name} is framed as a calm discovery layer, so travelers can move from geography into itinerary planning without losing context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
