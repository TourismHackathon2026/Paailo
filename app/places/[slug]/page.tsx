import { LayoutShell } from "@/components/layout-shell";

export default function PlaceDetailsPage() {
  return (
    <LayoutShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Place Details</p>
        <h1 className="mt-3 text-3xl font-semibold">Place profile placeholder</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Route-ready details view for attractions, cultural sites, and scenic destinations.
        </p>
      </section>
    </LayoutShell>
  );
}
