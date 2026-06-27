import { Calendar, DollarSign, ArrowRight } from "lucide-react";
import { IMG } from "@/lib/data";

export function FeaturedSection() {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#0d2b4a] py-16 px-5 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Best Time to Visit
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { season: "Spring", months: "Mar–May", icon: "🌸", rating: "Excellent", desc: "Rhododendrons in bloom, clear mountain views, ideal for trekking." },
              { season: "Autumn", months: "Oct–Nov", icon: "🍂", rating: "Best Season", desc: "Crystal-clear skies, vibrant festivals, peak trekking season." },
              { season: "Winter", months: "Dec–Feb", icon: "❄️", rating: "Good", desc: "Peaceful valleys, budget-friendly travel, Terai wildlife experiences." },
              { season: "Monsoon", months: "Jun–Sep", icon: "🌧️", rating: "Challenging", desc: "Lush greenery and low crowds — good for low altitude destinations." },
            ].map((item) => (
              <div key={item.season} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="text-3xl">{item.icon}</div>
                <div className="mt-4 text-sm uppercase tracking-[0.24em] text-white/50">{item.season}</div>
                <div className="mt-1 text-sm text-white/70">{item.months}</div>
                <div className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white" style={{ color: item.rating === "Best Season" ? "#4ade80" : undefined }}>
                  {item.rating}
                </div>
                <p className="mt-4 text-sm leading-6 text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-slate-950/30">
          <img src={IMG.valley} alt="Annapurna Sanctuary" className="h-[420px] w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <span className="mb-4 inline-block rounded-full bg-[#FFD08A]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFD08A]">
              ✨ Featured This Week
            </span>
            <h3 className="text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Annapurna Sanctuary
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/75">
              A natural amphitheater of snow giants — the sacred Base Camp surrounded by seven peaks over 7,000m.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-4 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar size={14} />
                  <span>Oct–Nov is Peak</span>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-sm">
                <div className="flex items-center gap-2 text-white/70">
                  <DollarSign size={14} />
                  <span>$400–900/person</span>
                </div>
              </div>
            </div>
            <a href="/explore" className="mt-6 inline-flex items-center gap-2 rounded-3xl bg-gradient-to-br from-[#A8200D] to-[#C0392B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Explore Trek <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
