import { LayoutShell } from "@/components/layout-shell";
import { ExploreShowcase } from "@/components/sections/explore-showcase";
import { getTouristPlaces } from "@/services/supabase";
import type { PlaceRecord } from "@/types/database";

export const revalidate = 60;

export default async function ExplorePage() {
  let places: PlaceRecord[] = [];

  try {
    places = await getTouristPlaces();
  } catch {
    places = [];
  }

  return (
    <LayoutShell>
      <ExploreShowcase places={places} />
    </LayoutShell>
  );
}
