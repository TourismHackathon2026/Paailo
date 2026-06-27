"use client";

import { useMemo, useState } from "react";
import { Download, Share2, Sparkles, Hotel, Utensils } from "lucide-react";
import { planStyleOptions, planTemplates } from "@/lib/data";
import type { PlanDay } from "@/types";

export default function PlannerPage() {
  const [form, setForm] = useState({ from: "", to: "", days: "5", budget: "moderate", style: "" });
  const [plan, setPlan] = useState<PlanDay[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const styleLabel = useMemo(() => planStyleOptions.find((item) => item.value === form.style)?.label ?? "Custom", [form.style]);

  const generatePlan = () => {
    if (!form.style) return;
    setGenerating(true);
    setTimeout(() => {
      const template = planTemplates[form.style] ?? planTemplates.adventure;
      const days = Array.from({ length: Math.min(parseInt(form.days, 10) || 3, 7) }, (_, index) => ({ day: index + 1, ...template[index % template.length] }));
      setPlan(days);
      setGenerating(false);
    }, 1200);
  };

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-[#2D5A8E]">AI Planner</p>
          <h1 className="mt-3 text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Plan Your Nepal Journey
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Share your preferences and we will generate a day-by-day itinerary mock for your adventure.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { name: "from", label: "Starting From", placeholder: "Your current city or country" },
              { name: "to", label: "Destination in Nepal", placeholder: "e.g. Pokhara, Kathmandu, Mustang" },
            ].map((field) => (
              <label key={field.name} className="space-y-2 text-sm text-slate-700">
                <span className="font-semibold">{field.label}</span>
                <input
                  value={form[field.name as "from" | "to"]}
                  onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                  placeholder={field.placeholder}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
                />
              </label>
            ))}
            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-semibold">Number of Days</span>
              <select
                value={form.days}
                onChange={(event) => setForm({ ...form, days: event.target.value })}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
              >
                {['1', '2', '3', '5', '7', '10', '14'].map((value) => (
                  <option key={value} value={value}>
                    {value} {parseInt(value, 10) === 1 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-semibold">Budget Level</span>
              <select
                value={form.budget}
                onChange={(event) => setForm({ ...form, budget: event.target.value })}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
              >
                <option value="budget">💚 Budget (Under $30/day)</option>
                <option value="moderate">💛 Moderate ($30–80/day)</option>
                <option value="comfort">🧡 Comfort ($80–150/day)</option>
                <option value="luxury">❤️ Luxury ($150+/day)</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">Travel Style</p>
            <div className="flex flex-wrap gap-3">
              {planStyleOptions.map((style) => {
                const active = form.style === style.value;
                return (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setForm({ ...form, style: style.value })}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${active ? "border-transparent bg-[#1B3A2D] text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    {style.label}
                  </button>
                );
              })}
            </div>
            {!form.style && <p className="mt-3 text-sm text-rose-500">Please select a travel style to generate your plan.</p>}
          </div>

          <button
            type="button"
            onClick={generatePlan}
            disabled={generating || !form.style}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-br from-[#1B3A2D] to-[#2D5A8E] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? (
              <span>Creating Your Perfect Itinerary…</span>
            ) : (
              <>
                <Sparkles size={18} /> Generate My Nepal Plan
              </>
            )}
          </button>
        </div>

        {plan && (
          <div className="mt-10 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your {form.days}-Day {styleLabel} Itinerary
                </h2>
                <p className="mt-2 text-sm text-slate-600">A mock itinerary created for travel inspiration.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Download size={16} /> PDF
                </button>
                <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {plan.map((day) => (
                <article key={day.day} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1B3A2D] to-[#2D5A8E] text-white text-lg font-semibold">
                        {day.day}
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-slate-950">Day {day.day}</p>
                        <p className="text-sm text-slate-500">{day.weather}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Estimated cost: <span className="font-semibold text-slate-900">{day.cost}</span></p>
                  </div>
                  <div className="grid gap-4 p-5 md:grid-cols-3">
                    {[
                      { label: "Morning", text: day.morning, icon: "🌅" },
                      { label: "Afternoon", text: day.afternoon, icon: "☀️" },
                      { label: "Evening", text: day.evening, icon: "🌙" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl bg-slate-50 p-5">
                        <p className="mb-3 text-sm font-semibold text-slate-900">{item.icon} {item.label}</p>
                        <p className="text-sm leading-7 text-slate-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 border-t border-slate-200 p-5 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-3xl bg-[#eff6ff] p-4">
                      <Hotel size={18} className="text-[#2563eb]" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Stay</p>
                        <p className="font-semibold text-slate-900">{day.hotel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-3xl bg-[#fffbeb] p-4">
                      <Utensils size={18} className="text-[#f59e0b]" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Dine</p>
                        <p className="font-semibold text-slate-900">{day.restaurant}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
