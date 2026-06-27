import { getSupabaseClient, getSupabaseConfigMessage } from "@/lib/supabase";
import type { HotelRecord, LocalFoodRecord, PlaceRecord, RestaurantRecord } from "@/types/database";

export interface EmergencyServiceRecord {
  id: string;
  name: string;
  phone: string;
  alt_phone?: string | null;
  address?: string | null;
  notes?: string | null;
  is_nationwide?: boolean | null;
  is_24_hours?: boolean | null;
  category_name?: string | null;
  category_icon?: string | null;
}

function ensureSupabaseConfigured() {
  const message = getSupabaseConfigMessage();
  if (message) {
    throw new Error(message);
  }

  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase client could not be initialized.");
  }

  return client;
}

export async function getTouristPlaces(): Promise<PlaceRecord[]> {
  const client = ensureSupabaseConfigured();
  const { data, error } = await client
    .from("places")
    .select("id, name, slug, address, avg_rating")
    .eq("is_active", true)
    .order("avg_rating", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PlaceRecord[];
}

export async function getTouristPlaceBySlug(slug: string): Promise<PlaceRecord | null> {
  const client = ensureSupabaseConfigured();
  const { data, error } = await client
    .from("places")
    .select("id, name, slug, description, address, avg_rating, cover_image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? (data as PlaceRecord) : null;
}

export async function getHotelsByPlace(placeId: string): Promise<HotelRecord[]> {
  const client = ensureSupabaseConfigured();
  const { data, error } = await client
    .from("hotel_details")
    .select("place_id, hotel_type, star_rating, price_per_night_min, price_per_night_max, currency")
    .eq("place_id", placeId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as HotelRecord[];
}

export async function getRestaurantsByPlace(placeId: string): Promise<RestaurantRecord[]> {
  const client = ensureSupabaseConfigured();
  const { data, error } = await client
    .from("restaurant_details")
    .select("place_id, cuisine_types, avg_cost_for_two, currency, has_delivery, has_dine_in")
    .eq("place_id", placeId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as RestaurantRecord[];
}

export async function getLocalFoods(): Promise<LocalFoodRecord[]> {
  const client = ensureSupabaseConfigured();
  const { data, error } = await client
    .from("foods")
    .select("id, name, slug, description")
    .order("name", { ascending: true })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as LocalFoodRecord[];
}

function fallbackEmergencyServices(): EmergencyServiceRecord[] {
  return [
    {
      id: "fallback-police",
      name: "Police Helpline",
      phone: "100",
      category_name: "Police",
      category_icon: "shield",
      notes: "Emergency police assistance",
      is_24_hours: true,
    },
    {
      id: "fallback-hospital",
      name: "Hospital Assistance",
      phone: "102",
      category_name: "Hospital",
      category_icon: "ambulance",
      notes: "Immediate medical support",
      is_24_hours: true,
    },
    {
      id: "fallback-embassy",
      name: "Nearest Embassy",
      phone: "+977-1-421-1299",
      category_name: "Embassy",
      category_icon: "landmark",
      notes: "Consular assistance and travel help",
      is_24_hours: false,
    },
  ];
}

export async function getEmergencyServices(limit = 6): Promise<EmergencyServiceRecord[]> {
  const client = ensureSupabaseConfigured();

  try {
    const { data, error } = await client
      .from("emergency_services")
      .select("id, name, phone, alt_phone, address, notes, is_nationwide, is_24_hours, category_id")
      .eq("is_active", true)
      .order("is_24_hours", { ascending: false })
      .order("name", { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    const services = (data ?? []) as Array<{
      id: string;
      name: string;
      phone: string;
      alt_phone?: string | null;
      address?: string | null;
      notes?: string | null;
      is_nationwide?: boolean | null;
      is_24_hours?: boolean | null;
      category_id: string;
    }>;

    if (!services.length) {
      return fallbackEmergencyServices();
    }

    const categoryIds = [...new Set(services.map((service) => service.category_id).filter(Boolean))];
    const categoryMap = new Map<string, { name: string; icon: string | null }>();

    if (categoryIds.length) {
      const { data: categories, error: categoryError } = await client
        .from("emergency_categories")
        .select("id, name, icon")
        .in("id", categoryIds);

      if (!categoryError && categories) {
        for (const category of categories as Array<{ id: string; name: string; icon: string | null }>) {
          categoryMap.set(category.id, { name: category.name, icon: category.icon });
        }
      }
    }

    return services.map((service) => ({
      id: service.id,
      name: service.name,
      phone: service.phone,
      alt_phone: service.alt_phone,
      address: service.address,
      notes: service.notes,
      is_nationwide: service.is_nationwide,
      is_24_hours: service.is_24_hours,
      category_name: categoryMap.get(service.category_id)?.name ?? "Emergency",
      category_icon: categoryMap.get(service.category_id)?.icon ?? "shield",
    }));
  } catch {
    return fallbackEmergencyServices();
  }
}
