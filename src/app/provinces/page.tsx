"use client";

import { useState } from "react";
import { ChevronRight, Calendar, DollarSign, MapPin } from "lucide-react";
import { provinces } from "@/lib/data";
import { ProvinceCard } from "@/components/cards/ProvinceCard";

export default function ProvincesPage() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
  const selectedProvince = provinces.find((province) => province.id === selectedProvinceId) ?? null;

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-[#2D5A8E]">Provinces</p>
          <h1 className="text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Nepal's 7 Provinces
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
            Each province is a distinct world of culture, landscape, and adventure. Tap a province card to explore it in depth.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {provinces.map((province) => (
                <button
                  key={province.id}
                  type="button"
                  onClick={() => setSelectedProvinceId(province.id)}
                  className="rounded-3xl border border-slate-200 bg-white p-0 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <ProvinceCard province={province} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
            {selectedProvince ? (
              <div>
                <button
                  type="button"
                  onClick={() => setSelectedProvinceId(null)}
                  className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                  <ChevronRight size={16} className="-rotate-90" /> Back to all provinces
                </button>
                <img src={selectedProvince.img} alt={selectedProvince.name} className="mb-6 h-56 w-full rounded-3xl object-cover" />
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Province {selectedProvince.id} · {selectedProvince.capital}</p>
                  <h2 className="mt-3 text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedProvince.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedProvince.nepali}</p>
                </div>
                <p className="mb-6 text-sm leading-7 text-slate-600">{selectedProvince.description}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Best Season</p>
                    <p className="mt-2 font-semibold text-slate-900">{selectedProvince.bestSeason}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Budget</p>
                    <p className="mt-2 font-semibold text-slate-900">{selectedProvince.budget}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Top Destinations
                    </h3>
                    <div className="grid gap-3">
                      {selectedProvince.topDest.map((destination) => (
                        <div key={destination} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm shadow-sm">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1B5E3B] text-white">•</span>
                          <div>{destination}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Highlights
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProvince.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full bg-white px-4 py-2 text-xs text-slate-700 shadow-sm">
                          <MapPin size={12} className="inline-block align-text-bottom" /> {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-slate-600">
                <p className="text-sm">Select a province card to view its details here.</p>
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <p className="text-lg font-semibold">Province details will appear here.</p>
                  <p className="mt-2 text-sm text-slate-500">Explore each region to learn about culture, climate, and top destinations.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
