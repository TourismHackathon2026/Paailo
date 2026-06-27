"use client";

import { useState } from "react";
import { ChevronRight, MapPin, Sparkles } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";
import { provinces } from "@/src/lib/data";

export default function ProvincesPage() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(3);
  const selectedProvince = provinces.find((province) => province.id === selectedProvinceId) ?? provinces[0];

  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Province Guide</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0a3d62] sm:text-4xl">Explore Nepal's provinces through color and story</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b5563]">
              Tap a province card to reveal the most relevant travel notes, best season, and the signature experiences that define the region.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <aside className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#2f6f4f]">Province list</p>
                  <h2 className="mt-2 text-xl font-semibold text-[#0a3d62]">Seven provinces, seven moods</h2>
                </div>
                <div className="rounded-full bg-[#fff8e6] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
                  <Sparkles size={14} className="inline-block" /> Discover
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {provinces.map((province) => {
                  const active = province.id === selectedProvinceId;

                  return (
                    <button
                      key={province.id}
                      type="button"
                      onClick={() => setSelectedProvinceId(province.id)}
                      className={`group overflow-hidden rounded-[1.5rem] border text-left transition hover:-translate-y-1 ${active ? "border-transparent bg-[#0f4c81] text-white shadow-[0_18px_40px_rgba(15,76,129,0.2)]" : "border-[#e5e7eb] bg-white text-[#0a3d62] hover:border-[#dbeafe]"}`}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img src={province.img} alt={province.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className={`absolute inset-0 ${active ? "bg-[linear-gradient(180deg,_rgba(10,61,98,0.05),_rgba(10,61,98,0.55))]" : "bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(10,61,98,0.72))]"}`} />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a3d62]">
                          Province {province.id}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-lg font-semibold">{province.name}</p>
                            <p className={`mt-1 text-xs ${active ? "text-slate-200" : "text-[#6b7280]"}`}>{province.nepali} · {province.capital}</p>
                          </div>
                          <ChevronRight size={16} className={active ? "text-[#f3c96b]" : "text-[#94a3b8]"} />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {province.categories.slice(0, 2).map((category) => (
                            <span key={category} className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${active ? "bg-white/15 text-white" : "bg-[#f8fbfd] text-[#4b5563]"}`}>
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <article className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#f8fbfd] shadow-[0_16px_40px_rgba(15,76,129,0.08)]">
                    <img src={selectedProvince.img} alt={selectedProvince.name} className="h-72 w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#2f6f4f]">{selectedProvince.bestSeason}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-[#0a3d62]">{selectedProvince.name} Province</h2>
                    <p className="mt-1 text-sm text-[#6b7280]">{selectedProvince.nepali} · Capital {selectedProvince.capital}</p>
                  </div>
                  <p className="text-sm leading-7 text-[#4b5563]">{selectedProvince.description}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#f8fbfd] p-4">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#94a3b8]">Budget</p>
                      <p className="mt-2 text-sm font-semibold text-[#0a3d62]">{selectedProvince.budget}</p>
                    </div>
                    <div className="rounded-2xl bg-[#f8fbfd] p-4">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#94a3b8]">Top experience</p>
                      <p className="mt-2 text-sm font-semibold text-[#0a3d62]">{selectedProvince.topDest[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-[1.5rem] bg-[#f8fbfd] p-5">
                  <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[#94a3b8]">Highlights</p>
                      <p className="mt-2 text-sm font-semibold text-[#0a3d62]">Key experiences</p>
                    </div>
                    <MapPin size={18} className="text-[#2f6f4f]" />
                  </div>
                  <div className="space-y-3">
                    {selectedProvince.highlights.map((item) => (
                      <div key={item} className="rounded-3xl border border-[#e5e7eb] bg-white p-4 text-sm text-[#4b5563] shadow-sm">
                        <span className="font-semibold text-[#2f6f4f]">• </span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#94a3b8]">Travel note</p>
                    <p className="mt-3 text-sm leading-7 text-[#4b5563]">
                      This province is presented as a calm, premium discovery layer so travelers can quickly move from inspiration into planning.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
