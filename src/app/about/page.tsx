"use client";

import { useState } from "react";
import { Calendar, Globe, Mail, Phone } from "lucide-react";
import { IMG } from "@/lib/data";

const tabs = [
  { id: "about", label: "About Paila" },
  { id: "nepal", label: "About Nepal" },
  { id: "team", label: "Our Team" },
  { id: "future", label: "Future Plans" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-slate-900 text-white">
          <img src={IMG.culture} alt="Nepal culture" className="h-72 w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/90" />
          <div className="absolute inset-x-0 bottom-0 p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">Nepal Tourism Platform</p>
            <h1 className="mt-3 text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              About Paila
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">“पाइला” — every great journey begins with a single step.</p>
          </div>
        </div>

        <div className="mb-10 rounded-3xl bg-white p-2 shadow-sm border border-slate-200">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${activeTab === tab.id ? "bg-[#1B3A2D] text-white" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "about" && (
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Our Mission", emoji: "🎯", content: "To make Nepal's extraordinary diversity accessible to every traveler through technology and local community insights." },
              { title: "Our Vision", emoji: "🔭", content: "A Nepal where every corner of its 7 provinces is celebrated and sustainably visited." },
              { title: "Our Objectives", emoji: "📋", content: "Digitize tourism data, build AI trip planning, and connect travelers with authentic homestays." },
              { title: "Why We Built Paila", emoji: "💡", content: "पाइला means 'footstep'. We built the platform to make the first step into Nepal easy and inspiring." },
            ].map((card) => (
              <article key={card.title} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="mb-3 text-xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">{card.content}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "nepal" && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <h2 className="text-3xl font-semibold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Kingdom of the Himalayas
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Capital", value: "Kathmandu" },
                  { label: "Population", value: "30 Million" },
                  { label: "Area", value: "147,181 km²" },
                  { label: "Currency", value: "NPR (₨)" },
                  { label: "Language", value: "Nepali + 124 more" },
                  { label: "Religion", value: "Hindu & Buddhist" },
                  { label: "Time Zone", value: "UTC+5:45" },
                  { label: "UNESCO Sites", value: "8" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-4 text-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className="mt-2 font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                Nepal is a landlocked country between China and India, home to 8 of the world's 14 highest peaks including Mt. Everest. Despite its compact size, Nepal holds extraordinary diversity from tropical jungles to arctic summits.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { title: "Visa Information", content: "Most nationalities receive visa on arrival at Tribhuvan Airport. 15-day ($30), 30-day ($50), 90-day ($125)." },
                { title: "Safety & Security", content: "Nepal is among Asia's safest destinations. Use licensed guides for remote trekking and carry travel insurance." },
                { title: "Travel Etiquette", content: "Remove shoes at temples, walk clockwise around stupas, dress modestly, and use your right hand when giving." },
                { title: "Emergency Numbers", content: "Police: 100 | Ambulance: 102 | Tourist Police: +977-1-4247041 | Himalayan Rescue: +977-1-4440292." },
              ].map((card) => (
                <div key={card.title} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="mb-3 text-lg font-semibold text-slate-950">{card.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: "Aarav Sharma", role: "Founder & CEO", emoji: "👨‍💼", bio: "Tech entrepreneur and avid trekker passionate about sustainable tourism." },
              { name: "Priya Tamang", role: "Lead Designer", emoji: "👩‍🎨", bio: "UX/UI designer bringing Nepal's culture to a beautiful travel experience." },
              { name: "Bikash Gurung", role: "AI Engineer", emoji: "👨‍💻", bio: "Building the intelligent recommendation engine for Nepal travel." },
              { name: "Sunita Rai", role: "Content & Research", emoji: "👩‍🔬", bio: "Travel writer documenting Nepal's hidden gems and cultural treasures." },
              { name: "Dipak Thapa", role: "Province Coordinator", emoji: "🗺️", bio: "Former trekking guide with 15+ years of experience across Nepal." },
              { name: "Rima Shrestha", role: "Community Manager", emoji: "🤝", bio: "Bringing local homestays and guides into the Paila network." },
            ].map((member) => (
              <article key={member.name} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 text-center">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#2D5A8E]">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "future" && (
          <div className="space-y-5">
            {[
              { emoji: "🏨", title: "Integrated Booking System", eta: "Q2 2026", desc: "Book hotels, homestays, and guided treks with real-time availability." },
              { emoji: "🗺️", title: "Offline Province Maps", eta: "Q3 2026", desc: "Download detailed offline maps for remote trekking regions." },
              { emoji: "🥽", title: "AR Cultural Guide", eta: "Q4 2026", desc: "Point your camera at monuments to see historical info and translations." },
              { emoji: "🤖", title: "Full AI Chatbot", eta: "Q1 2027", desc: "A 24/7 travel companion with weather alerts and personalized advice." },
              { emoji: "⭐", title: "Community Reviews", eta: "Q2 2027", desc: "Verified traveler reviews and local tips from real visitors." },
              { emoji: "📡", title: "Live Trail Status", eta: "Q3 2027", desc: "Real-time trail conditions and crowd levels for major trekking routes." },
            ].map((item) => (
              <article key={item.title} className="flex gap-5 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="text-4xl">{item.emoji}</div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{item.eta}</span>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a href="mailto:hello@pailanepal.com" className="rounded-3xl border border-slate-200 p-5 text-sm transition hover:bg-slate-50">
              <div className="mb-3 flex items-center gap-2 text-slate-900"><Mail size={16} /> Email</div>
              hello@pailanepal.com
            </a>
            <a href="tel:+97714256909" className="rounded-3xl border border-slate-200 p-5 text-sm transition hover:bg-slate-50">
              <div className="mb-3 flex items-center gap-2 text-slate-900"><Phone size={16} /> Phone</div>
              +977-1-4256909
            </a>
            <a href="#" className="rounded-3xl border border-slate-200 p-5 text-sm transition hover:bg-slate-50">
              <div className="mb-3 flex items-center gap-2 text-slate-900"><Globe size={16} /> Website</div>
              pailanepal.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
