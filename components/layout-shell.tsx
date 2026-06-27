"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Compass, MapPinned, MessageSquareMore, Hotel, UtensilsCrossed, UserCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/explore", label: "Explore", icon: MapPinned },
  { href: "/planner", label: "Planner", icon: MessageSquareMore },
  { href: "/hotels", label: "Hotels", icon: Hotel },
  { href: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,_#f8f7f0_0%,_#f4efe6_100%)] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#2f6f4f]/10 blur-3xl" />
        <div className="absolute bottom-[-3rem] right-[-4rem] h-72 w-72 rounded-full bg-[#d9a63a]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col lg:flex-row">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:shrink-0"
        >
          <div className="m-4 rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_25px_80px_rgba(15,76,129,0.12)] backdrop-blur-xl lg:m-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-3 rounded-[1.25rem] border border-[#2f6f4f]/15 bg-[#0f4c81] px-3 py-3 text-white shadow-[0_0_28px_rgba(255,255,255,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-inner">
                <Image src="/paaila-logo.png" alt="Paaila" width={44} height={44} className="h-10 w-10 rounded-xl object-contain" priority />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">Paaila</p>
                <p className="text-xs text-slate-200">AI travel for Nepal</p>
              </div>
            </motion.div>

            <nav className="mt-6 space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

                return (
                  <Link key={href} href={href} className="relative block">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0f4c81]/95 to-[#2f6f4f]/90 shadow-[0_10px_25px_rgba(15,76,129,0.16)]"
                      />
                    )}
                    <span className={`relative flex items-center justify-between rounded-2xl px-4 py-3 transition ${isActive ? "text-white" : "text-[#1f2937] hover:bg-[#f5f7fa]"}`}>
                      <span className="flex items-center gap-3">
                        <span className={`rounded-xl p-2 ${isActive ? "bg-white/20" : "bg-[#eef4f8]"}`}>
                          <Icon size={16} />
                        </span>
                        <span className="font-medium">{label}</span>
                      </span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-[#d9a63a] shadow-[0_0_10px_#d9a63a]" />}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-[1.25rem] border border-[#d9a63a]/20 bg-[#fff8e6] p-4 text-sm text-[#7a4e2f]">
              <p className="font-semibold">Ready for your next Himalayan route?</p>
              <p className="mt-1 text-[#5b4637]">
                Plan treks, explore provinces, and discover local stories in one calm flow.
              </p>
            </div>
          </div>
        </motion.aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
