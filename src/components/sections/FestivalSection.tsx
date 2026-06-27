import type { Festival } from "@/types";
import { Calendar, ArrowRight } from "lucide-react";

type FestivalSectionProps = {
  festivals: Festival[];
};

export function FestivalSection({ festivals }: FestivalSectionProps) {
  return (
    <section className="py-16 px-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
              Upcoming Festivals
            </h2>
            <p className="mt-2 text-sm text-slate-500">Plan your visit around Nepal's vibrant celebrations.</p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D5A8E] transition hover:text-[#17332d]">
            View Calendar <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {festivals.map((festival) => (
            <article key={festival.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img src={festival.img} alt={festival.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {festival.province}
                </p>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#A8200D]">
                  <Calendar size={12} />
                  {festival.date}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {festival.name}
                </h3>
                <p className="text-sm leading-6 text-slate-500">{festival.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
