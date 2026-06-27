import { Map as MapIcon } from "lucide-react";
import type { Province } from "@/types";

type ProvinceCardProps = {
  province: Province;
};

export function ProvinceCard({ province }: ProvinceCardProps) {
  return (
    <button type="button" className="group relative h-52 overflow-hidden rounded-3xl text-left shadow-lg transition hover:-translate-y-1">
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
  );
}
