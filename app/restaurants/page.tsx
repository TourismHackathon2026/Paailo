import { ChefHat, MapPin, Soup, UtensilsCrossed, Wheat } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";

const restaurants = [
  {
    name: "Krishnarpan",
    province: "Bagmati",
    location: "Dwarika's, Kathmandu",
    cuisine: "Newari tasting menu",
    rating: 4.9,
    description: "A refined journey through local ingredients, heritage recipes, and long-form tasting menus.",
  },
  {
    name: "OR2K Cafe",
    province: "Bagmati",
    location: "Thamel, Kathmandu",
    cuisine: "Vegetarian and Middle Eastern",
    rating: 4.7,
    description: "A relaxed traveler favorite for mezze, salads, and a dependable place to recharge.",
  },
  {
    name: "Bhojan Griha",
    province: "Bagmati",
    location: "Dillibazar, Kathmandu",
    cuisine: "Traditional Nepali",
    rating: 4.8,
    description: "Wood-carved dining rooms and classic dishes that make the heritage experience feel complete.",
  },
  {
    name: "Moondance Restaurant",
    province: "Gandaki",
    location: "Lakeside, Pokhara",
    cuisine: "International comfort food",
    rating: 4.6,
    description: "An easy lakeside stop for travelers mixing local sightseeing with familiar comfort plates.",
  },
];

export default function RestaurantsPage() {
  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Restaurants</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0a3d62] sm:text-4xl">Taste the best of Nepal</h1>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              A dining showcase for local flavors, heritage meals, and traveler-friendly favorites across the major routes.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9a63a]/30 bg-[#fff8e6] px-3 py-1 text-sm font-medium text-[#7a4e2f]">
            <ChefHat size={16} /> Local plates
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
            <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,_#0a3d62,_#2f6f4f)] p-6 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-[#f3c96b]">Food lens</p>
              <h2 className="mt-3 text-2xl font-semibold">Eat like a traveler, but plan like a local</h2>
              <p className="mt-3 text-sm leading-7 text-slate-100">
                From fine dining in Kathmandu to easy lakefront meals in Pokhara, the dining layer helps travelers fit food into every itinerary.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Local spice", icon: Soup },
                { label: "Shared plates", icon: UtensilsCrossed },
                { label: "Grain-first", icon: Wheat },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#f8fbfd] p-4 text-[#0a3d62]">
                  <item.icon size={16} className="text-[#2f6f4f]" />
                  <p className="mt-3 text-sm font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {restaurants.map((restaurant) => (
              <article key={restaurant.name} className="overflow-hidden rounded-[1.5rem] border border-[#0f4c81]/10 bg-white shadow-sm">
                <div className="h-36 bg-[linear-gradient(135deg,_rgba(47,111,79,0.95),_rgba(10,61,98,0.8))]" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 text-sm text-[#6b7280]">
                    <span className="rounded-full bg-[#eef7f1] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6f4f]">{restaurant.province}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#d97706]">★ {restaurant.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#0a3d62]">{restaurant.name}</h3>
                  <p className="mt-1 text-sm text-[#6b7280]">{restaurant.location}</p>
                  <p className="mt-1 text-sm font-medium text-[#2f6f4f]">{restaurant.cuisine}</p>
                  <p className="mt-3 text-sm leading-7 text-[#4b5563]">{restaurant.description}</p>
                  <div className="mt-5 flex items-end justify-between border-t border-[#e5e7eb] pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#94a3b8]">Good for</p>
                      <p className="text-sm font-semibold text-[#0a3d62]">Lunch, dinner, and plan breaks</p>
                    </div>
                    <button type="button" className="rounded-2xl bg-[#0f4c81] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#0a3d62]">
                      Open menu
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
