import type { TravelTip } from "@/types";

type TipsSectionProps = {
  tips: TravelTip[];
};

export function TipsSection({ tips }: TipsSectionProps) {
  return (
    <section className="bg-slate-50 py-16 px-5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-slate-950" style={{ fontFamily: "'Playfair Display', serif" }}>
            Travel Smart
          </h2>
          <p className="mt-2 text-sm text-slate-500">Essential knowledge for an unforgettable Nepal journey.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <article key={tip.title} className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">{tip.icon}</div>
              <h3 className="mb-3 text-lg font-semibold text-slate-950" style={{ color: tip.color }}>
                {tip.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">{tip.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
