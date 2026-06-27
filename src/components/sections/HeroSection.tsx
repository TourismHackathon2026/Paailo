import { Bot, MapPin, Search } from "lucide-react";
import { IMG, experienceCategories } from "@/lib/data";

type HeroSectionProps = {
  onSearchClick: () => void;
};

export function HeroSection({ onSearchClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-cover bg-center text-white" style={{ backgroundImage: `url(${IMG.hero})` }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,18,30,0.65)_0%,rgba(8,18,30,0.28)_60%,rgba(247,244,237,0.94)_100%)]" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-5 py-28 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#A8200D]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] shadow-lg shadow-black/20">
          <MapPin size={14} /> Discover Nepal — 7 Provinces · 200+ Destinations
        </div>

        <div className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Every Step is a <span className="text-[#FFD08A]">Sacred Journey</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-8 text-white/85 md:text-lg">
            From the roof of the world to ancient temple valleys — Nepal awaits your footsteps.
          </p>
        </div>

        <button
          type="button"
          onClick={onSearchClick}
          className="mt-10 flex w-full max-w-xl items-center justify-between gap-4 rounded-3xl bg-white p-4 text-left text-slate-900 shadow-2xl shadow-slate-950/10 transition hover:-translate-y-0.5 md:px-6"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B3A2D] to-[#2D5A8E] text-white">
            <Bot size={20} />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Click to start your journey</div>
            <div className="text-sm font-semibold text-slate-900">Tell me what you are looking for in Nepal</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8200D] to-[#C0392B] text-white">
            <Search size={16} />
          </div>
        </button>

        <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-4 text-center text-sm md:grid-cols-4">
          {[
            { value: "7", label: "Provinces" },
            { value: "200+", label: "Destinations" },
            { value: "8", label: "World Records" },
            { value: "125+", label: "Ethnic Groups" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-semibold">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[-2rem] flex justify-between px-5 md:bottom-[-5rem]">
        <div className="hidden w-40 overflow-hidden rounded-3xl shadow-2xl shadow-slate-950/20 md:block" style={{ transform: "rotate(-4deg) translateY(-20px)" }}>
          <img src={IMG.temple} alt="Pashupatinath Temple" className="h-full w-full object-cover" />
        </div>
        <div className="hidden w-48 overflow-hidden rounded-3xl shadow-2xl shadow-slate-950/20 lg:block" style={{ transform: "rotate(3deg) translateY(-10px)" }}>
          <img src={IMG.pokhara} alt="Phewa Lake" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 md:pb-24">
        <div className="grid gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur-md shadow-slate-950/5 md:grid-cols-4 md:p-6">
          {experienceCategories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className="flex flex-col items-center gap-3 rounded-3xl bg-white/10 px-5 py-6 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white/20"
              style={{ color: cat.color }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-xl">{cat.icon}</div>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
