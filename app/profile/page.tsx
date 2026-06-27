import { Bell, Globe, Heart, LogIn, Map, Settings, Ticket, UserCircle2 } from "lucide-react";
import { LayoutShell } from "@/components/layout-shell";

const savedTrips = [
  { title: "Kathmandu heritage loop", detail: "3 days · Bagmati · Saved yesterday" },
  { title: "Pokhara lakeside reset", detail: "5 days · Gandaki · Saved last week" },
  { title: "Chitwan family escape", detail: "4 days · Bagmati · Saved 2 weeks ago" },
];

const settings = [
  { icon: Globe, label: "Language", value: "English" },
  { icon: Ticket, label: "Currency", value: "USD ($)" },
  { icon: Bell, label: "Notifications", value: "Enabled" },
  { icon: Settings, label: "Preference mode", value: "Curated" },
];

export default function ProfilePage() {
  return (
    <LayoutShell>
      <section className="rounded-[2rem] border border-[#1f5b49]/15 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(241,239,232,0.92))] p-6 shadow-[0_30px_80px_rgba(15,76,129,0.08)] sm:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,_#0a3d62,_#2f6f4f)] text-2xl text-white shadow-lg">
                <UserCircle2 size={30} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#2f6f4f]">Profile</p>
                <h1 className="mt-1 text-2xl font-semibold text-[#0a3d62] sm:text-3xl">Your Paaila travel identity</h1>
                <p className="mt-1 text-sm text-[#6b7280]">Traveler preferences, saved trips, and itinerary history live here.</p>
              </div>
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0a3d62]">
              <LogIn size={16} /> Sign in
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-5 rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
              <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,_#0a3d62,_#0f4c81)] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-[#f3c96b]">Travel snapshot</p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { value: "12", label: "Saved places" },
                    { value: "4", label: "Itineraries" },
                    { value: "7", label: "Regions" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/10 p-3">
                      <p className="text-2xl font-semibold">{item.value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-200">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[#f8fbfd] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#0a3d62]">Saved trips</h2>
                  <Heart size={16} className="text-[#c2410c]" />
                </div>
                <div className="mt-4 space-y-3">
                  {savedTrips.map((trip) => (
                    <div key={trip.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
                      <p className="font-semibold text-[#0a3d62]">{trip.title}</p>
                      <p className="mt-1 text-sm text-[#6b7280]">{trip.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#0f4c81]/10 bg-white/90 p-5 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                {settings.map((setting) => (
                  <div key={setting.label} className="rounded-2xl border border-[#e5e7eb] bg-[#f8fbfd] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0a3d62]">
                      <setting.icon size={16} className="text-[#2f6f4f]" />
                      {setting.label}
                    </div>
                    <p className="mt-2 text-sm text-[#6b7280]">{setting.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-[#1f5b49]/10 bg-[#eef7f1] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2f6f4f]">Upcoming goal</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#0a3d62]">Plan a route that balances comfort and discovery</h2>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">
                  The profile screen is shaped as a lightweight control center, giving travelers one place to review saved items before heading back into planning.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c81] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0a3d62]">
                    <Map size={16} /> Open planner
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-semibold text-[#4b5563] transition hover:bg-[#f8fbfd]">
                    <Bell size={16} /> Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
