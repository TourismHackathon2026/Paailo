import type { Province } from "@/types";
import { Map as MapIcon } from "lucide-react";

type ProvinceSectionProps = {
  provinces: Province[];
};

export function ProvinceSection({ provinces }: ProvinceSectionProps) {
  return (
    <section className="py-16 px-5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
            Explore by Province
          </h2>
          <p className="mt-2 text-sm text-slate-500">Seven unique provinces — seven worlds to discover.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {provinces.map((province) => (
            <button key={province.id} type="button" className="group relative h-52 overflow-hidden rounded-3xl text-left shadow-lg transition hover:-translate-y-1">
              <img src={province.img} alt={province.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">Province {province.id}</p>
                <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {province.name}
                </h3>
                <p className="text-sm text-white/80">{province.nepali}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                  {province.categories.slice(0, 2).map((cat) => (
                    <span key={cat} className="rounded-full bg-white/20 px-2 py-1 text-white">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}

          <button type="button" className="flex h-52 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-300 bg-white text-slate-600 transition hover:border-slate-400 hover:text-slate-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl">
              <MapIcon size={26} />
            </div>
            <span className="font-semibold">See All Provinces</span>
          </button>
        </div>
      </div>
    </section>
  );
}
