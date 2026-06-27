import { LayoutShell } from "@/components/layout-shell";
import { HeroShowcase } from "@/components/sections/hero-showcase";
import { getSupabaseConfigMessage } from "@/lib/supabase";
import { getEmergencyServices, getLocalFoods, getTouristPlaces } from "@/services/supabase";
import type { LocalFoodRecord, PlaceRecord } from "@/types/database";
import { Ambulance, Landmark, PhoneCall, ShieldAlert } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  let places: PlaceRecord[] = [];
  let foods: LocalFoodRecord[] = [];
  let errorMessage: string | null = null;
  let emergencyServices = await getEmergencyServices(6);

  try {
    const [placesResult, foodsResult] = await Promise.all([
      getTouristPlaces(),
      getLocalFoods(),
    ]);
    places = placesResult;
    foods = foodsResult;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unable to load Paaila data.";
  }

  const configMessage = getSupabaseConfigMessage();

  return (
    <LayoutShell>
      <HeroShowcase places={places} foods={foods} configMessage={configMessage} errorMessage={errorMessage} />

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-[#1f5b49]/15 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,76,129,0.08)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Why Paaila</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#0a3d62]">Crafted for immersive, calm, and reliable travel discovery.</h2>
          <div className="mt-6 space-y-3 text-sm leading-7 text-[#4b5563]">
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fbfd] p-4">AI-curated destinations and local insights tailored to each region.</div>
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fbfd] p-4">Unified journeys for places, stays, restaurants, foods, and emergency support.</div>
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fbfd] p-4">Premium, responsive design built to feel like a polished travel companion.</div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#0f4c81]/10 bg-[linear-gradient(135deg,_#0a3d62_0%,_#0f4c81_100%)] p-6 text-white shadow-[0_20px_60px_rgba(10,61,98,0.2)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f3c96b]">Travel flow</p>
          <h2 className="mt-3 text-2xl font-semibold">Explore Nepal as a story, not a checklist.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { title: "Explore", desc: "Browse provinces, districts, and iconic sites" },
              { title: "Planner", desc: "Shape multi-day trips with local intelligence" },
              { title: "Stay", desc: "Find premium hotels and homestays" },
              { title: "Emergency", desc: "Quick access to trusted services" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-slate-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#d23b3b]/15 bg-[linear-gradient(135deg,_#fff7f7_0%,_#fef2f2_100%)] p-6 shadow-[0_20px_60px_rgba(210,59,59,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c2410c]">Emergency support</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0a3d62]">SOS, police, hospitals, and embassy contacts.</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/25 bg-[#fff7ed] px-3 py-1 text-sm font-medium text-[#9a2c00]">
            <ShieldAlert size={16} />
            Available 24/7 for urgent help
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {emergencyServices.map((service) => {
            const Icon = service.category_name?.toLowerCase().includes("hospital")
              ? Ambulance
              : service.category_name?.toLowerCase().includes("embassy")
                ? Landmark
                : ShieldAlert;

            return (
              <article key={service.id} className="rounded-[1.5rem] border border-[#f7c7c7] bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,76,129,0.06)] backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fef2f2] text-[#c2410c]">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full border border-[#fde68a] bg-[#fff7ed] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#b45309]">
                    {service.category_name ?? "Emergency"}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0a3d62]">{service.name}</h3>
                <a href={`tel:${service.phone}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c81] transition hover:text-[#0a3d62]">
                  <PhoneCall size={15} />
                  {service.phone}
                </a>
                {service.alt_phone ? <p className="mt-1 text-sm text-[#4b5563]">Alt: {service.alt_phone}</p> : null}
                {service.address ? <p className="mt-2 text-sm text-[#4b5563]">{service.address}</p> : null}
                {service.notes ? <p className="mt-2 text-sm leading-6 text-[#6b7280]">{service.notes}</p> : null}
              </article>
            );
          })}
        </div>

        <p className="mt-5 text-sm leading-7 text-[#6b7280]">
          For immediate danger, contact local authorities first and use the nearest available support point.
        </p>
      </section>
    </LayoutShell>
  );
}
