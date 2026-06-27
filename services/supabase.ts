import { getSupabaseClient, getSupabaseConfigMessage } from "@/lib/supabase";
import type { HotelRecord, LocalFoodRecord, PlaceRecord, RestaurantRecord } from "@/types/database";

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
