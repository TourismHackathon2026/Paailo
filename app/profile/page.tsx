import { LayoutShell } from "@/components/layout-shell";

export default function ProfilePage() {
  return (
    <LayoutShell>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Profile</p>
        <h1 className="mt-3 text-3xl font-semibold">Your Paaila travel identity</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Personalized traveler preferences, saved memories, and itinerary history will appear here.
        </p>
      </section>
    </LayoutShell>
  );
}
