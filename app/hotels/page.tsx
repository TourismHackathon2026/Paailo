import { BedDouble, Landmark, MapPin, Star, Waves } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";

const hotels = [
  {
    name: "Temple Tree Resort & Spa",
    province: "Gandaki",
    location: "Lakeside, Pokhara",
    price: "$120-240",
    rating: 4.9,
    description: "A calm lakeside stay with mountain views, spa rooms, and sunset terraces.",
    amenities: ["Lake view", "Spa", "Airport pickup"],
  },
  {
    name: "Dwarika's Heritage",
    province: "Bagmati",
    location: "Battisputali, Kathmandu",
    price: "$180-390",
    rating: 5.0,
    description: "Crafted courtyards, carved woodwork, and an elevated stay that feels deeply Nepali.",
    amenities: ["Heritage suites", "Fine dining", "Private guides"],
  },
  {
    name: "Tiger Tops Jungle Lodge",
    province: "Bagmati",
    location: "Chitwan",
    price: "$150-280",
    rating: 4.8,
    description: "Safari-ready lodging with early wildlife drives and riverside dinners.",
    amenities: ["Safari access", "Riverside deck", "Nature guide"],
  },
  {
    name: "Himalayan Front Hotel",
    province: "Koshi",
    location: "Ilam",
    price: "$75-150",
    rating: 4.7,
    description: "A polished hill stay with tea-garden views and a slower east-nepal rhythm.",
    amenities: ["Tea views", "Family rooms", "Local breakfast"],
  },
];

export default function HotelsPage() {
  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Hotels</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0a3d62] sm:text-4xl">Stay comfortably across Nepal</h1>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              A mock lodging gallery built to keep the UI grounded in premium travel planning while backend booking work stays pending.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9a63a]/30 bg-[#fff8e6] px-3 py-1 text-sm font-medium text-[#7a4e2f]">
            <BedDouble size={16} /> Curated stays
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
            <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,_#0a3d62,_#0f4c81)] p-6 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-[#f3c96b]">Stay smarter</p>
              <h2 className="mt-3 text-2xl font-semibold">Match your route with the right stay</h2>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                Filter by province, view style, or trip mood to find lodges that fit both the scenery and the pace of your journey.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Mountain view", icon: Waves },
                { label: "City comfort", icon: Landmark },
                { label: "Quick access", icon: MapPin },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#f8fbfd] p-4 text-[#0a3d62]">
                  <item.icon size={16} className="text-[#2f6f4f]" />
                  <p className="mt-3 text-sm font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {hotels.map((hotel) => (
              <article key={hotel.name} className="overflow-hidden rounded-[1.5rem] border border-[#0f4c81]/10 bg-white shadow-sm">
                <div className="h-36 bg-[linear-gradient(135deg,_rgba(10,61,98,0.92),_rgba(47,111,79,0.75))]" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 text-sm text-[#6b7280]">
                    <span className="rounded-full bg-[#eef7f1] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6f4f]">{hotel.province}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#d97706]"><Star size={14} fill="currentColor" /> {hotel.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#0a3d62]">{hotel.name}</h3>
                  <p className="mt-1 text-sm text-[#6b7280]">{hotel.location}</p>
                  <p className="mt-3 text-sm leading-7 text-[#4b5563]">{hotel.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <span key={amenity} className="rounded-full bg-[#f8fbfd] px-3 py-2 text-xs font-medium text-[#4b5563]">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-end justify-between border-t border-[#e5e7eb] pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#94a3b8]">From</p>
                      <p className="text-lg font-semibold text-[#0a3d62]">{hotel.price}</p>
                    </div>
                    <button type="button" className="rounded-2xl bg-[#0f4c81] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#0a3d62]">
                      View stay
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
