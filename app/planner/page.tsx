"use client";

import { useMemo, useState } from "react";
import { Download, Hotel, Share2, Sparkles, UtensilsCrossed } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";
import { planStyleOptions, planTemplates } from "@/src/lib/data";
import type { PlanDay } from "@/src/types";

export default function PlannerPage() {
  const [form, setForm] = useState({ from: "", to: "", days: "5", budget: "moderate", style: "" });
  const [plan, setPlan] = useState<PlanDay[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const styleLabel = useMemo(
    () => planStyleOptions.find((option) => option.value === form.style)?.label ?? "Custom",
    [form.style]
  );

  const generatePlan = () => {
    if (!form.style) {
      return;
    }

    setGenerating(true);

    window.setTimeout(() => {
      const template = planTemplates[form.style] ?? planTemplates.adventure;
      const totalDays = Math.min(Number.parseInt(form.days, 10) || 3, 7);

      const days = Array.from({ length: totalDays }, (_, index) => ({
        day: index + 1,
        ...template[index % template.length],
      }));

      setPlan(days);
      setGenerating(false);
    }, 900);
  };

  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">AI Planner</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0a3d62] sm:text-4xl">Shape a trip that feels curated, not generic</h1>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              Use the mock planner to assemble a day-by-day Nepal itinerary that balances scenery, food, and local culture.
            </p>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { key: "from", label: "Starting From", placeholder: "Your current city or country" },
                { key: "to", label: "Destination in Nepal", placeholder: "e.g. Pokhara, Kathmandu, Mustang" },
              ].map((field) => (
                <label key={field.key} className="space-y-2 text-sm text-[#4b5563]">
                  <span className="font-semibold text-[#0a3d62]">{field.label}</span>
                  <input
                    value={form[field.key as "from" | "to"]}
                    onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-3xl border border-[#0f4c81]/10 bg-[#f8fbfd] px-4 py-3 text-sm outline-none transition focus:border-[#2f6f4f]"
                  />
                </label>
              ))}

              <label className="space-y-2 text-sm text-[#4b5563]">
                <span className="font-semibold text-[#0a3d62]">Number of Days</span>
                <select
                  value={form.days}
                  onChange={(event) => setForm({ ...form, days: event.target.value })}
                  className="w-full rounded-3xl border border-[#0f4c81]/10 bg-[#f8fbfd] px-4 py-3 text-sm outline-none transition focus:border-[#2f6f4f]"
                >
                  {['1', '2', '3', '5', '7', '10', '14'].map((value) => (
                    <option key={value} value={value}>
                      {value} {Number.parseInt(value, 10) === 1 ? "Day" : "Days"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-[#4b5563]">
                <span className="font-semibold text-[#0a3d62]">Budget Level</span>
                <select
                  value={form.budget}
                  onChange={(event) => setForm({ ...form, budget: event.target.value })}
                  className="w-full rounded-3xl border border-[#0f4c81]/10 bg-[#f8fbfd] px-4 py-3 text-sm outline-none transition focus:border-[#2f6f4f]"
                >
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="comfort">Comfort</option>
                  <option value="luxury">Luxury</option>
                </select>
              </label>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-[#0a3d62]">Travel Style</p>
              <div className="flex flex-wrap gap-3">
                {planStyleOptions.map((style) => {
                  const active = form.style === style.value;

                  return (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setForm({ ...form, style: style.value })}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${active ? "border-transparent bg-[#0f4c81] text-white shadow" : "border-[#e5e7eb] bg-white text-[#4b5563] hover:bg-[#f8fbfd]"}`}
                    >
                      {style.label}
                    </button>
                  );
                })}
              </div>
              {!form.style ? <p className="mt-3 text-sm text-[#c2410c]">Select a travel style to generate the itinerary.</p> : null}
            </div>

            <button
              type="button"
              onClick={generatePlan}
              disabled={generating || !form.style}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-3xl bg-[linear-gradient(135deg,_#0a3d62,_#2f6f4f)] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating ? <span>Creating your itinerary…</span> : <><Sparkles size={18} /> Generate My Nepal Plan</>}
            </button>
          </div>

          {plan ? (
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0a3d62] sm:text-3xl">Your {form.days}-Day {styleLabel} Itinerary</h2>
                  <p className="mt-2 text-sm text-[#4b5563]">A mock itinerary created for travel inspiration.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-3xl border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-semibold text-[#4b5563] transition hover:bg-[#f8fbfd]">
                    <Download size={16} /> PDF
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-3xl border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-semibold text-[#4b5563] transition hover:bg-[#f8fbfd]">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {plan.map((day) => (
                  <article key={day.day} className="overflow-hidden rounded-[1.75rem] border border-[#0f4c81]/10 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-[#e5e7eb] bg-[#f8fbfd] p-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,_#0a3d62,_#2f6f4f)] text-lg font-semibold text-white">
                          {day.day}
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-[#0a3d62]">Day {day.day}</p>
                          <p className="text-sm text-[#6b7280]">{day.weather}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#4b5563]">Estimated cost: <span className="font-semibold text-[#0a3d62]">{day.cost}</span></p>
                    </div>

                    <div className="grid gap-4 p-5 md:grid-cols-3">
                      {[
                        { label: "Morning", text: day.morning, icon: "🌅" },
                        { label: "Afternoon", text: day.afternoon, icon: "☀️" },
                        { label: "Evening", text: day.evening, icon: "🌙" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-3xl bg-[#f8fbfd] p-5">
                          <p className="mb-3 text-sm font-semibold text-[#0a3d62]">{item.icon} {item.label}</p>
                          <p className="text-sm leading-7 text-[#4b5563]">{item.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-3 border-t border-[#e5e7eb] p-5 sm:grid-cols-2">
                      <div className="flex items-center gap-3 rounded-3xl bg-[#eff6ff] p-4">
                        <Hotel size={18} className="text-[#2563eb]" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-[#94a3b8]">Stay</p>
                          <p className="font-semibold text-[#0a3d62]">{day.hotel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-3xl bg-[#fffbeb] p-4">
                        <UtensilsCrossed size={18} className="text-[#f59e0b]" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-[#94a3b8]">Dine</p>
                          <p className="font-semibold text-[#0a3d62]">{day.restaurant}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </LayoutShell>
  );
}
