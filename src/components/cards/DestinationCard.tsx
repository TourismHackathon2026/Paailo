import { ArrowRight, Heart, Star } from "lucide-react";
import type { Destination } from "@/types";

type DestinationCardProps = {
  destination: Destination;
  onAction?: () => void;
};

export function DestinationCard({ destination, onAction }: DestinationCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img src={destination.img} alt={destination.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <button className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-md transition hover:scale-110">
          <Heart size={16} className="text-rose-500" />
        </button>
        <span className="absolute left-4 top-4 rounded-full bg-[#A8200D] px-3 py-1 text-xs font-semibold text-white">
          {destination.category}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
          <Star size={12} className="text-amber-400" />
          <span className="font-semibold text-slate-900">{destination.rating}</span>
          <span>·</span>
          <span>{destination.province}</span>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
          {destination.name}
        </h3>
        <p className="mb-5 text-sm leading-6 text-slate-500">{destination.desc}</p>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">From</p>
            <p className="font-semibold text-slate-900">{destination.budget}</p>
          </div>
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#1B3A2D] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#17332d]"
          >
            View Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </article>
  );
}
