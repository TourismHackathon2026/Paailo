import { LayoutShell } from "@/components/layout-shell";

export default function HotelsPage() {
  return (
    <LayoutShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Hotels</p>
        <h1 className="mt-3 text-3xl font-semibold">Stay comfortably in Nepal</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This placeholder page will later show curated lodging options and booking-friendly cards.
        </p>
      </section>
    </LayoutShell>
  );
}
