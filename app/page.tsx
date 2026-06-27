import Link from "next/link";
import { ArrowRight, Compass, Sparkles, MapPinned } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";
import { Button } from "@/components/ui/button";

export default function HomePage() {
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
        </div>
      </section>
    </LayoutShell>
  );
}
