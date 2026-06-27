import Link from "next/link";
import { ArrowRight, Compass, Sparkles, MapPinned } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";
import { Button } from "@/components/ui/button";
import { getSupabaseConfigMessage } from "@/lib/supabase";
import { getLocalFoods, getTouristPlaces } from "@/services/supabase";
import type { LocalFoodRecord, PlaceRecord } from "@/types/database";

export const revalidate = 60;

export default async function HomePage() {
  let places: PlaceRecord[] = [];
  let foods: LocalFoodRecord[] = [];
  let errorMessage: string | null = null;

  try {
    const [placesResult, foodsResult] = await Promise.all([
      getTouristPlaces(),
      getLocalFoods(),
    ]);
    places = placesResult;
    foods = foodsResult;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unable to load Paaila data.";
  }

  const configMessage = getSupabaseConfigMessage();

  return (
    <LayoutShell>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
            <Sparkles size={16} />
            AI Tourism Companion for Nepal
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Discover Nepal with Paaila.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            A clean, scalable foundation for a government-ready travel assistant that helps visitors explore, plan, and experience Nepal beautifully.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/explore">
                Start exploring <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/planner">Try planner</Link>
            </Button>
          </div>

          {(configMessage || errorMessage) && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {configMessage ?? errorMessage}
            </div>
          )}

          {!configMessage && !errorMessage && places.length === 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No tourist places are available from Supabase yet.
            </div>
          )}

          {!configMessage && !errorMessage && places.length > 0 && (
            <div className="mt-8 space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Live tourist places
              </h2>
              <ul className="space-y-3">
                {places.map((place) => (
                  <li key={place.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{place.name}</p>
                        <p className="text-sm text-slate-600">{place.address ?? "Nepal"}</p>
                      </div>
                      <span className="text-sm text-sky-700">
                        {place.avg_rating?.toFixed(1) ?? "0.0"} ★
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
          <div className="flex items-center gap-2 text-sky-300">
            <Compass size={20} />
            <span className="text-sm font-medium uppercase tracking-[0.2em]">What’s included</span>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <MapPinned size={16} className="mt-0.5" />
              Explore pages and destination placeholders
            </li>
            <li className="flex items-start gap-3">
              <MapPinned size={16} className="mt-0.5" />
              AI trip planning routes and project structure
            </li>
            <li className="flex items-start gap-3">
              <MapPinned size={16} className="mt-0.5" />
              Supabase, form, mapping, and UI foundations set up
            </li>
          </ul>

          {!configMessage && !errorMessage && foods.length > 0 && (
            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Local foods
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {foods.slice(0, 3).map((food) => (
                  <li key={food.id} className="flex items-center justify-between gap-3">
                    <span>{food.name}</span>
                    <span className="text-slate-400">{food.slug}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </LayoutShell>
  );
}
