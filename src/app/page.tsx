"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { ProvinceSection } from "@/components/sections/ProvinceSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { FestivalSection } from "@/components/sections/FestivalSection";
import { TipsSection } from "@/components/sections/TipsSection";
import { destinations, festivals, provinces, travelTips } from "@/lib/data";

export default function HomePage() {
  const handleSearch = () => {
    window.location.href = "/explore";
  };

  return (
    <main className="relative overflow-hidden">
      <HeroSection onSearchClick={handleSearch} />
      <PopularDestinations destinations={destinations} />
      <ProvinceSection provinces={provinces} />
      <FeaturedSection />
      <FestivalSection festivals={festivals} />
      <TipsSection tips={travelTips} />
    </main>
  );
}
