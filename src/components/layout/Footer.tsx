import { ArrowRight, Phone } from "lucide-react";

const footerLinks = [
  { title: "Explore", links: ["All Destinations", "By Province", "By Experience", "Hidden Gems", "Trending Now"] },
  { title: "Plan", links: ["AI Trip Planner", "Best Seasons", "Visa Guide", "Budget Tips", "Emergency Info"] },
  { title: "Support", links: ["Contact Us", "FAQ", "Safety Tips", "Emergency Numbers", "Feedback"] },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8200D] to-[#C0392B] text-white shadow-lg shadow-[#A8200D]/20">
                <span className="text-xl">⛰️</span>
              </div>
              <div>
                <div className="font-semibold">पाइला</div>
                <div className="text-xs uppercase tracking-[0.28em] text-white/50">Paila Nepal Tourism</div>
              </div>
            </div>
            <p className="text-sm leading-6 text-white/70">
              Your gateway to Nepal's sacred mountains, ancient temples, and vibrant culture across all 7 provinces.
            </p>
            <div className="mt-6 flex gap-3 text-lg">
              {['📘', '📸', '🐦', '▶️'].map((icon) => (
                <span key={icon} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 transition hover:bg-white/20">
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Paila Nepal Tourism. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>Emergency: +977-1-4211020</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
