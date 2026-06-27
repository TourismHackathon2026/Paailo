"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, LogIn, Mountain } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Provinces", href: "/provinces" },
  { label: "AI Planner", href: "/planner" },
  { label: "Map", href: "/map" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl text-white shadow-black/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:flex-nowrap">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A8200D] to-[#C0392B] text-white shadow-lg shadow-[#A8200D]/20">
              <Mountain size={18} />
            </div>
            <div className="text-left">
              <div className="text-base font-semibold">पाइला</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/50">Paila Nepal</div>
            </div>
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:flex"
          >
            <Search size={14} /> Search
          </Link>
          <Link
            href="/login"
            className="hidden rounded-full bg-gradient-to-br from-[#A8200D] to-[#C0392B] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex"
          >
            <LogIn size={14} className="inline-block" /> Login
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white transition hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="rounded-2xl px-4 py-3 text-base font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
