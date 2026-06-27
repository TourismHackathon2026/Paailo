"use client";

import { useState } from "react";
import { DollarSign, Globe, Info, LogIn, LogOut } from "lucide-react";
import { destinations } from "@/lib/data";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-3xl">
        {loggedIn ? (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1B3A2D] to-[#2D5A8E] text-white text-2xl">👤</div>
                <div>
                  <p className="text-sm text-slate-500">Welcome back,</p>
                  <h1 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>{form.name || "Nepal Traveler"}</h1>
                  <p className="text-sm text-slate-500">{form.email || "traveler@pailanepal.com"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLoggedIn(false)}
                className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>❤️ Saved Places</h2>
                <div className="space-y-3">
                  {destinations.slice(0, 4).map((destination) => (
                    <div key={destination.id} className="flex items-center gap-3 rounded-3xl bg-slate-50 p-4">
                      <img src={destination.img} alt={destination.name} className="h-12 w-12 rounded-3xl object-cover" />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{destination.name}</p>
                        <p className="text-[11px] text-slate-500">{destination.province} · {destination.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>⚙️ Account Settings</h2>
                <div className="space-y-3">
                  {[
                    { icon: Globe, label: "Language", value: "English" },
                    { icon: DollarSign, label: "Currency", value: "USD ($)" },
                    { icon: Info, label: "Notifications", value: "Enabled" },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <setting.icon size={16} />
                        {setting.label}
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{setting.value}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full rounded-3xl bg-gradient-to-br from-[#1B3A2D] to-[#2D5A8E] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90">
                  Plan a New Trip
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
            <div className="mb-6 flex flex-wrap gap-2 rounded-3xl bg-slate-50 p-2">
              {(["login", "register"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTab(option)}
                  className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold transition ${tab === option ? "bg-white text-slate-950" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  {option === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {tab === "register" && (
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Aarav Sharma"
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
                  />
                </label>
              )}
              <label className="block text-sm font-semibold text-slate-700">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="traveler@example.com"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D5A8E]"
                />
              </label>
              <button
                type="button"
                onClick={() => setLoggedIn(true)}
                className="w-full rounded-3xl bg-gradient-to-br from-[#1B3A2D] to-[#2D5A8E] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {tab === "login" ? "Sign In to Paila" : "Create My Account"}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              {tab === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => setTab(tab === "login" ? "register" : "login")} className="font-semibold text-[#2D5A8E] hover:text-[#1B3A2D]">
                {tab === "login" ? "Register free" : "Sign in"}
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
