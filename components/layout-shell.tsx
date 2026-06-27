import Link from "next/link";
import { Compass, MapPinned, MessageSquareMore, Hotel, UtensilsCrossed, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/explore", label: "Explore", icon: MapPinned },
  { href: "/planner", label: "Planner", icon: MessageSquareMore },
  { href: "/hotels", label: "Hotels", icon: Hotel },
  { href: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Paaila
          </Link>
          <nav className="hidden gap-2 md:flex">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href} className="flex items-center gap-2">
                  <Icon size={16} />
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">{children}</main>
    </div>
  );
}
