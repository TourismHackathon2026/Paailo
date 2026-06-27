import { promises as fs } from "fs";
import path from "path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

type CsvRow = Record<string, string | undefined>;

type ImportStats = {
  places: number;
  hotels: number;
  restaurants: number;
  foods: number;
  emergencyServices: number;
  skippedRows: number;
  errors: string[];
};

const DATA_DIR = path.resolve(process.cwd(), "database", "data");
const CSV_FILES = [
  { file: "Tourist_Places.csv", table: "places" as const },
  { file: "Hotels.csv", table: "hotels" as const },
  { file: "Restaurants.csv", table: "restaurants" as const },
  { file: "Foods.csv", table: "foods" as const },
  { file: "Emergency.csv", table: "emergency" as const },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running the import.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function slugify(value: string | undefined | null) {
  if (!value) return "";
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isBlank(value: string | undefined) {
  return value === undefined || value === null || String(value).trim() === "";
}

function pickValue(row: CsvRow, aliases: string[]) {
  for (const alias of aliases) {
    const value = row[alias];
    if (!isBlank(value)) return value;
  }
  return undefined;
}

function parseNumber(value: string | undefined) {
  if (isBlank(value)) return null;

  const cleaned = String(value)
    .replace(/[\$,₹€]/g, "")
    .replace(/[^0-9.-]/g, "")
    .trim();

  if (!cleaned) return null;

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseNumericRating(value: string | undefined) {
  if (isBlank(value)) return null;

  const cleaned = String(value).replace(/⭐/g, "").trim();
  const parsed = parseNumber(cleaned);
  return parsed === null ? null : Number(parsed.toFixed(1));
}

function parseBoolean(value: string | undefined) {
  if (isBlank(value)) return null;

  const normalized = String(value).trim().toLowerCase();
  if (["true", "1", "yes", "y", "t", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "n", "f", "off"].includes(normalized)) return false;
  return null;
}

function parsePriceLevel(value: string | undefined) {
  const numeric = parseNumber(value);
  if (numeric === null) return null;
  if (numeric <= 1000) return 1;
  if (numeric <= 5000) return 2;
  if (numeric <= 10000) return 3;
  return 4;
}

function parseArray(value: string | undefined) {
  if (isBlank(value)) return [];
  return String(value)
    .split(/[|,;/]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function inferRegionName(districtName: string) {
  const normalized = districtName.toLowerCase();
  if (normalized.includes("kathmandu")) return "Bagmati";
  if (normalized.includes("pokhara")) return "Gandaki";
  if (normalized.includes("lalitpur")) return "Bagmati";
  if (normalized.includes("bhaktapur")) return "Bagmati";
  if (normalized.includes("chitwan")) return "Bagmati";
  if (normalized.includes("dharan")) return "Province 1";
  if (normalized.includes("biratnagar")) return "Province 1";
  return "Unassigned Region";
}

async function readCsv(fileName: string) {
  const fullPath = path.resolve(DATA_DIR, fileName);
  const content = await fs.readFile(fullPath, "utf8");

  return parse(content, {
    columns: (header: string[]) => header.map((value) => normalizeHeader(value)),
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as CsvRow[];
}

async function upsertRow(table: string, payload: Record<string, unknown>, conflictColumn: string) {
  const { data, error } = await supabase
    .from(table)
    .upsert(payload, { onConflict: conflictColumn, ignoreDuplicates: false })
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Record<string, unknown> | null;
}

async function ensureRegion(name: string, description?: string) {
  const slug = slugify(name) || "region";

  const { data: existing, error: selectError } = await supabase.from("regions").select("id").or(`slug.eq.${slug},name.eq.${name}`).maybeSingle();
  if (selectError) {
    throw selectError;
  }
  if (existing?.id) {
    return { id: existing.id };
  }

  const payload = { name, slug, description: description ?? null };
  const { data: inserted, error: insertError } = await supabase.from("regions").insert(payload).select("id").maybeSingle();
  if (insertError) {
    if (insertError.code === "23505") {
      const { data: retryData, error: retryError } = await supabase.from("regions").select("id").or(`slug.eq.${slug},name.eq.${name}`).maybeSingle();
      if (retryError) {
        throw retryError;
      }
      if (retryData?.id) {
        return { id: retryData.id };
      }
    }
    throw insertError;
  }

  return inserted;
}

async function ensureDistrict(name: string, regionId: string) {
  if (!regionId) {
    return null;
  }

  const regionName = (await supabase.from("regions").select("name").eq("id", regionId).single()).data?.name ?? "";
  const slug = `${slugify(regionName)}-${slugify(name)}`.replace(/^-+|-+$/g, "") || slugify(name);
  const payload = { region_id: regionId, name, slug };

  const { data: existing, error: selectError } = await supabase.from("districts").select("id").eq("region_id", regionId).eq("name", name).maybeSingle();
  if (selectError) {
    throw selectError;
  }
  if (existing?.id) {
    return { id: existing.id };
  }

  const { data: inserted, error: insertError } = await supabase.from("districts").insert(payload).select("id").maybeSingle();
  if (insertError) {
    if (insertError.code === "23505") {
      const { data: retryData, error: retryError } = await supabase.from("districts").select("id").eq("region_id", regionId).eq("name", name).maybeSingle();
      if (retryError) {
        throw retryError;
      }
      if (retryData?.id) {
        return { id: retryData.id };
      }
    }
    throw insertError;
  }

  return inserted;
}

async function ensureCategory(name: string) {
  const slug = slugify(name) || "category";

  const { data: existing, error: selectError } = await supabase.from("categories").select("id").or(`slug.eq.${slug},name.eq.${name}`).maybeSingle();
  if (selectError) {
    throw selectError;
  }
  if (existing?.id) {
    return { id: existing.id };
  }

  const payload = { name, slug, icon: null, display_order: 0 };
  const { data: inserted, error: insertError } = await supabase.from("categories").insert(payload).select("id").maybeSingle();
  if (insertError) {
    if (insertError.code === "23505") {
      const { data: retryData, error: retryError } = await supabase.from("categories").select("id").or(`slug.eq.${slug},name.eq.${name}`).maybeSingle();
      if (retryError) {
        throw retryError;
      }
      if (retryData?.id) {
        return { id: retryData.id };
      }
    }
    throw insertError;
  }

  return inserted;
}

async function ensureEmergencyCategory(name: string) {
  const slug = slugify(name) || "emergency-category";
  const payload = { name, icon: null, display_order: 0 };
  return upsertRow("emergency_categories", payload, "name");
}

async function upsertPlace(payload: Record<string, unknown>) {
  return upsertRow("places", payload, "slug");
}

async function upsertFood(payload: Record<string, unknown>) {
  return upsertRow("foods", payload, "slug");
}

async function upsertHotelDetails(payload: Record<string, unknown>) {
  return upsertRow("hotel_details", payload, "place_id");
}

async function upsertRestaurantDetails(payload: Record<string, unknown>) {
  return upsertRow("restaurant_details", payload, "place_id");
}

async function upsertEmergencyService(payload: Record<string, unknown>) {
  const { data: existing, error } = await supabase
    .from("emergency_services")
    .select("id")
    .eq("name", payload.name as string)
    .eq("phone", payload.phone as string)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (existing?.id) {
    const { error: updateError } = await supabase.from("emergency_services").update(payload).eq("id", existing.id);
    if (updateError) {
      throw updateError;
    }
    return { id: existing.id };
  }

  const { data: inserted, error: insertError } = await supabase.from("emergency_services").insert(payload).select("id").maybeSingle();
  if (insertError) {
    throw insertError;
  }
  return inserted as Record<string, unknown> | null;
}

async function importTouristPlaces(stats: ImportStats) {
  const rows = await readCsv("Tourist_Places.csv");

  for (const [index, row] of rows.entries()) {
    try {
      const name = pickValue(row, ["name", "place_name", "tourist_place"]);
      if (!name) {
        stats.skippedRows += 1;
        continue;
      }

      const province = pickValue(row, ["province", "region", "province_name"]) ?? "Unassigned Region";
      const districtName = pickValue(row, ["district", "district_name"]) ?? "Unknown District";
      const categoryName = pickValue(row, ["category", "place_category", "type"]) ?? "General";
      const description = pickValue(row, ["history", "description", "details"]) ?? undefined;
      const address = [districtName, province].filter(Boolean).join(", ");
      const latitude = parseNumber(pickValue(row, ["latitude", "lat"]));
      const longitude = parseNumber(pickValue(row, ["longitude", "lng", "lon"]));
      const phone = pickValue(row, ["phone", "contact_number"]);
      const website = pickValue(row, ["website", "url"]);
      const imageUrl = pickValue(row, ["image_url", "image", "cover_image_url"]);
      const entryFee = pickValue(row, ["entry_fee", "entry_fee_usd", "fee"]);
      const bestSeason = pickValue(row, ["best_season", "season"]);
      const openingHours = pickValue(row, ["opening_hours", "opening_hours_hours"]);
      const rating = parseNumericRating(pickValue(row, ["rating", "avg_rating"]));
      const priceLevel = parsePriceLevel(entryFee);

      const region = await ensureRegion(province, `Imported from ${province}`);
      const district = await ensureDistrict(districtName, region?.id ?? "");
      const category = await ensureCategory(categoryName);

      if (!region?.id || !district?.id || !category?.id) {
        stats.skippedRows += 1;
        continue;
      }

      const slug = slugify(String(name)) || `place-${stats.places + 1}`;
      const placePayload = {
        category_id: category.id,
        district_id: district.id,
        name: String(name),
        slug,
        description: description ?? null,
        address: address || null,
        latitude,
        longitude,
        phone: phone ?? null,
        website: website ?? null,
        price_level: priceLevel,
        cover_image_url: imageUrl ?? null,
        is_verified: true,
        is_active: true,
        avg_rating: rating,
        review_count: 0,
        metadata: {
          entry_fee: entryFee ?? null,
          best_season: bestSeason ?? null,
          opening_hours: openingHours ?? null,
          source_file: "Tourist_Places.csv",
        },
      };

      const place = await upsertPlace(placePayload);
      if (!place?.id) {
        stats.skippedRows += 1;
        continue;
      }

      stats.places += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      stats.errors.push(`Places row ${index + 2}: ${message}`);
      console.error(`Failed place row ${index + 2}:`, error);
      stats.skippedRows += 1;
    }
  }
}

async function importHotels(stats: ImportStats) {
  const rows = await readCsv("Hotels.csv");
  const hotelCategory = await ensureCategory("Hotel");

  for (const [index, row] of rows.entries()) {
    try {
      const name = pickValue(row, ["name", "hotel_name"]);
      if (!name) {
        stats.skippedRows += 1;
        continue;
      }

      const placeName = pickValue(row, ["place", "location", "district", "city"]) ?? "Kathmandu";
      const regionName = inferRegionName(placeName);
      const region = await ensureRegion(regionName, `Imported from ${placeName}`);
      const district = await ensureDistrict(placeName, region?.id ?? "");

      if (!region?.id || !district?.id || !hotelCategory?.id) {
        stats.skippedRows += 1;
        continue;
      }

      const latitude = parseNumber(pickValue(row, ["latitude", "lat"]));
      const longitude = parseNumber(pickValue(row, ["longitude", "lng", "lon"]));
      const phone = pickValue(row, ["phone", "contact_number"]);
      const rating = parseNumericRating(pickValue(row, ["rating", "avg_rating"]));
      const priceRange = pickValue(row, ["price_range_usd_night", "price_range", "price_range_usd"]);
      const priceMin = parseNumber(String(priceRange).split("-")[0]?.replace(/[^0-9.]/g, ""));
      const priceMax = parseNumber(String(priceRange).split("-")[1]?.replace(/[^0-9.]/g, ""));

      const slug = slugify(String(name)) || `hotel-${stats.hotels + 1}`;
      const placePayload = {
        category_id: hotelCategory.id,
        district_id: district.id,
        name: String(name),
        slug,
        description: null,
        address: placeName,
        latitude,
        longitude,
        phone: phone ?? null,
        website: null,
        price_level: parsePriceLevel(priceRange),
        cover_image_url: null,
        is_verified: false,
        is_active: true,
        avg_rating: rating,
        review_count: 0,
        metadata: { source_file: "Hotels.csv", location: placeName },
      };

      const place = await upsertPlace(placePayload);
      if (!place?.id) {
        stats.skippedRows += 1;
        continue;
      }

      await upsertHotelDetails({
        place_id: place.id,
        hotel_type: "hotel",
        star_rating: rating ? Math.round(rating) : null,
        price_per_night_min: priceMin,
        price_per_night_max: priceMax,
        currency: "USD",
        amenities: [],
        booking_url: null,
      });

      stats.hotels += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      stats.errors.push(`Hotels row ${index + 2}: ${message}`);
      console.error(`Failed hotel row ${index + 2}:`, error);
      stats.skippedRows += 1;
    }
  }
}

async function importRestaurants(stats: ImportStats) {
  const rows = await readCsv("Restaurants.csv");
  const restaurantCategory = await ensureCategory("Restaurant");

  for (const [index, row] of rows.entries()) {
    try {
      const name = pickValue(row, ["name", "restaurant_name"]);
      if (!name) {
        stats.skippedRows += 1;
        continue;
      }

      const location = pickValue(row, ["location", "place", "district", "city"]) ?? "Kathmandu";
      const regionName = inferRegionName(location);
      const region = await ensureRegion(regionName, `Imported from ${location}`);
      const district = await ensureDistrict(location, region?.id ?? "");

      if (!region?.id || !district?.id || !restaurantCategory?.id) {
        stats.skippedRows += 1;
        continue;
      }

      const latitude = parseNumber(pickValue(row, ["latitude", "lat"]));
      const longitude = parseNumber(pickValue(row, ["longitude", "lng", "lon"]));
      const rating = parseNumericRating(pickValue(row, ["rating", "avg_rating"]));
      const cuisine = pickValue(row, ["cuisine", "cuisine_types"]);
      const specialDish = pickValue(row, ["special_dish", "special_dish_name"]);

      const slug = slugify(String(name)) || `restaurant-${stats.restaurants + 1}`;
      const placePayload = {
        category_id: restaurantCategory.id,
        district_id: district.id,
        name: String(name),
        slug,
        description: specialDish ?? null,
        address: location,
        latitude,
        longitude,
        phone: null,
        website: null,
        price_level: null,
        cover_image_url: null,
        is_verified: false,
        is_active: true,
        avg_rating: rating,
        review_count: 0,
        metadata: {
          cuisine,
          special_dish: specialDish ?? null,
          source_file: "Restaurants.csv",
        },
      };

      const place = await upsertPlace(placePayload);
      if (!place?.id) {
        stats.skippedRows += 1;
        continue;
      }

      await upsertRestaurantDetails({
        place_id: place.id,
        cuisine_types: parseArray(cuisine),
        dietary_options: [],
        avg_cost_for_two: null,
        currency: "NPR",
        has_delivery: false,
        has_dine_in: true,
        has_takeout: false,
        reservation_url: null,
      });

      stats.restaurants += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      stats.errors.push(`Restaurants row ${index + 2}: ${message}`);
      console.error(`Failed restaurant row ${index + 2}:`, error);
      stats.skippedRows += 1;
    }
  }
}

async function importFoods(stats: ImportStats) {
  const rows = await readCsv("Foods.csv");

  for (const [index, row] of rows.entries()) {
    try {
      const name = pickValue(row, ["name", "food_name"]);
      if (!name) {
        stats.skippedRows += 1;
        continue;
      }

      const origin = pickValue(row, ["origin", "origin_district", "region"]);
      const description = pickValue(row, ["description", "details"]);
      const imageUrl = pickValue(row, ["image_url", "image", "image_url"]);
      const isVegetarian = parseBoolean(pickValue(row, ["is_vegetarian", "vegetarian"]));
      const isVegan = parseBoolean(pickValue(row, ["is_vegan", "vegan"]));
      const districtName = origin && origin !== "Nationwide" ? origin : null;
      let originDistrictId: string | null = null;

      if (districtName) {
        const inferredRegion = await ensureRegion(inferRegionName(districtName), `Imported from ${districtName}`);
        const district = await ensureDistrict(districtName, inferredRegion?.id ?? "");
        originDistrictId = district?.id ?? null;
      }

      const payload = {
        name: String(name),
        slug: slugify(String(name)) || `food-${stats.foods + 1}`,
        description: description ?? null,
        image_url: imageUrl ?? null,
        is_vegetarian: isVegetarian ?? false,
        is_vegan: isVegan ?? false,
        origin_district_id: originDistrictId,
      };

      await upsertFood(payload);
      stats.foods += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      stats.errors.push(`Foods row ${index + 2}: ${message}`);
      console.error(`Failed food row ${index + 2}:`, error);
      stats.skippedRows += 1;
    }
  }
}

async function importEmergency(stats: ImportStats) {
  const rows = await readCsv("Emergency.csv");

  for (const [index, row] of rows.entries()) {
    try {
      const categoryName = pickValue(row, ["category", "service_category"]) ?? "Emergency";
      const name = pickValue(row, ["service_name", "service", "name"]);
      const phone = pickValue(row, ["contact_number", "phone", "contact"]);
      if (!name || !phone) {
        stats.skippedRows += 1;
        continue;
      }

      const category = await ensureEmergencyCategory(categoryName);
      if (!category?.id) {
        stats.skippedRows += 1;
        continue;
      }

      const notes = pickValue(row, ["notes", "details"]);
      const address = pickValue(row, ["address", "location"]);
      const isNationwide = parseBoolean(pickValue(row, ["is_nationwide", "nationwide"])) ?? String(notes ?? "").toLowerCase().includes("nationwide");
      const is24Hours = parseBoolean(pickValue(row, ["is_24_hours", "24_hours"])) ?? String(notes ?? "").toLowerCase().includes("24/7");

      await upsertEmergencyService({
        category_id: category.id,
        district_id: null,
        name: String(name),
        phone: String(phone),
        alt_phone: null,
        address: address ?? null,
        latitude: null,
        longitude: null,
        is_nationwide: isNationwide,
        is_24_hours: is24Hours,
        notes: notes ?? null,
        is_active: true,
      });

      stats.emergencyServices += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      stats.errors.push(`Emergency row ${index + 2}: ${message}`);
      console.error(`Failed emergency row ${index + 2}:`, error);
      stats.skippedRows += 1;
    }
  }
}

async function main() {
  const stats: ImportStats = {
    places: 0,
    hotels: 0,
    restaurants: 0,
    foods: 0,
    emergencyServices: 0,
    skippedRows: 0,
    errors: [],
  };

  console.log("Starting data import...");
  await importTouristPlaces(stats);
  await importHotels(stats);
  await importRestaurants(stats);
  await importFoods(stats);
  await importEmergency(stats);

  console.log("Imported:");
  console.log(`Places: ${stats.places}`);
  console.log(`Hotels: ${stats.hotels}`);
  console.log(`Restaurants: ${stats.restaurants}`);
  console.log(`Foods: ${stats.foods}`);
  console.log(`Emergency: ${stats.emergencyServices}`);
  console.log("");
  console.log(`Skipped: ${stats.skippedRows}`);
  console.log("");
  console.log("Errors:");
  if (stats.errors.length > 0) {
    for (const error of stats.errors) {
      console.log(`- ${error}`);
    }
  } else {
    console.log("None");
  }
  console.log("");
  console.log("Import Complete");
}

main().catch((error) => {
  console.error("Import failed:", error);
  process.exitCode = 1;
});
