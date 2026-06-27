import { LayoutShell } from "@/components/layout-shell";

export default function ExplorePage() {
  return (
    <LayoutShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Explore</p>
        <h1 className="mt-3 text-3xl font-semibold">Discover Nepal’s next favorite stop</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This placeholder screen will soon host interactive travel inspiration and destination discovery.
        </p>
      </section>
    </LayoutShell>
  );
}
