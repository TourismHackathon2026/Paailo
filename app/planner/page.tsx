import { LayoutShell } from "@/components/layout-shell";

export default function PlannerPage() {
  return (
    <LayoutShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">AI Trip Planner</p>
        <h1 className="mt-3 text-3xl font-semibold">Plan smarter with Paaila AI</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This screen is reserved for conversational itinerary generation and trip planning flows.
        </p>
      </section>
    </LayoutShell>
  );
}
