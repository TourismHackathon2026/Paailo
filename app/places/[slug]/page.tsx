import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Hotel, MapPin, Star, UtensilsCrossed } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";

const places = [
  {
    slug: "pashupatinath-temple",
    name: "Pashupatinath Temple",
    province: "Bagmati",
    location: "Kathmandu Valley",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507743617593-0a422c9bb7f5?w=1600&h=900&fit=crop&auto=format",
    description:
      "A sacred riverside complex and one of Nepal's most important pilgrimage sites, wrapped in ritual, architecture, and living tradition.",
    highlights: ["Evening aarti", "UNESCO heritage", "Riverside ceremony"],
    nearbyHotels: ["Dwarika's Heritage", "Hotel Shanker", "Hyatt Regency Kathmandu"],
    nearbyFood: ["Newari set", "Temple tea stalls", "Traditional sweets"],
    bestFor: "Religious visits, cultural storytelling, and early-morning photography",
  },
  {
    slug: "phewa-lake-pokhara",
    name: "Phewa Lake, Pokhara",
    province: "Gandaki",
    location: "Pokhara Lakeside",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?w=1600&h=900&fit=crop&auto=format",
    description:
      "A serene lakeside backdrop where mountain reflections, boat rides, and slow travel create one of Nepal's most iconic moods.",
    highlights: ["Boating", "Sarangkot sunrise", "Lakeside cafes"],
    nearbyHotels: ["Temple Tree Resort", "Hotel Barahi", "Mount Kailash Resort"],
    nearbyFood: ["Wood-fired pizza", "Momo", "Fresh coffee"],
    bestFor: "Couples, family trips, and relaxed itinerary resets",
  },
  {
    slug: "boudhanath-stupa",
    name: "Boudhanath Stupa",
    province: "Bagmati",
    location: "Kathmandu",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1648298470994-7065f521375c?w=1600&h=900&fit=crop&auto=format",
    description:
      "One of the largest spherical stupas in the world, surrounded by monasteries, prayer wheels, and an unmistakable calm energy.",
    highlights: ["Monastery visits", "Prayer circuit", "Rooftop viewpoints"],
    nearbyHotels: ["Hyatt Regency Kathmandu", "Hotel Tibet", "Hotel Mandap"],
    nearbyFood: ["Butter tea", "Tibetan noodles", "Cafe brunch"],
    bestFor: "Slow walking, meditation, and heritage-focused travel",
  },
];

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export default async function PlaceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((entry) => entry.slug === slug);

  if (!place) {
    notFound();
  }

  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c81] transition hover:text-[#0a3d62]">
            <ArrowLeft size={16} /> Back to explore
          </Link>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[1.75rem] border border-[#0f4c81]/10 bg-white shadow-sm">
              <img src={place.image} alt={place.name} className="h-80 w-full object-cover sm:h-96" />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#6b7280]">
                  <span className="rounded-full bg-[#eef7f1] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6f4f]">{place.province}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#d97706]"><Star size={14} fill="currentColor" /> {place.rating.toFixed(1)}</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={14} /> {place.location}</span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold text-[#0a3d62] sm:text-4xl">{place.name}</h1>
                <p className="mt-4 text-sm leading-7 text-[#4b5563]">{place.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {place.highlights.map((item) => (
                    <span key={item} className="rounded-full bg-[#f8fbfd] px-3 py-2 text-xs font-medium text-[#4b5563]">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
              <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,_#0a3d62,_#0f4c81)] p-5 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-[#f3c96b]">Best for</p>
                <p className="mt-3 text-xl font-semibold">{place.bestFor}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f8fbfd] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0a3d62]"><Hotel size={16} className="text-[#2f6f4f]" /> Nearby stays</div>
                  <ul className="mt-3 space-y-2 text-sm text-[#4b5563]">
                    {place.nearbyHotels.map((hotel) => (
                      <li key={hotel}>{hotel}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-[#f8fbfd] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0a3d62]"><UtensilsCrossed size={16} className="text-[#2f6f4f]" /> Nearby food</div>
                  <ul className="mt-3 space-y-2 text-sm text-[#4b5563]">
                    {place.nearbyFood.map((food) => (
                      <li key={food}>{food}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#94a3b8]">Planning tip</p>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">
                  Pair this stop with nearby accommodation and one local food experience to keep the journey balanced and easy to follow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
