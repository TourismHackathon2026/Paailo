-- ============================================================
-- PAILA (पाइला) — AI-Powered Tourism Companion for Nepal
-- PostgreSQL Database Schema (Supabase-compatible)
-- Version: 1.0.0 | Created: 2026-06-27
-- ============================================================

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================================
-- UTILITY: updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE profiles (
    id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url  TEXT,
    nationality TEXT,
    preferred_language TEXT DEFAULT 'en',
    created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 2. REGIONS (Provinces of Nepal)
-- ============================================================
CREATE TABLE regions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL UNIQUE,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_regions_slug ON regions(slug);

-- ============================================================
-- 3. DISTRICTS
-- ============================================================
CREATE TABLE districts (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_id   UUID NOT NULL REFERENCES regions(id) ON DELETE RESTRICT,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (region_id, name)
);

CREATE INDEX idx_districts_region_id ON districts(region_id);
CREATE INDEX idx_districts_slug ON districts(slug);

-- ============================================================
-- 4. CATEGORIES
-- ============================================================
CREATE TABLE categories (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          TEXT NOT NULL UNIQUE,
    slug          TEXT NOT NULL UNIQUE,
    icon          TEXT,
    display_order SMALLINT DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- 5. PLACES (unified: attractions, hotels, restaurants)
-- ============================================================
CREATE TABLE places (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    district_id     UUID NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    description     TEXT,
    address         TEXT,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    location        GEOGRAPHY(POINT, 4326),
    phone           TEXT,
    email           TEXT,
    website         TEXT,
    price_level     SMALLINT CHECK (price_level BETWEEN 1 AND 4),
    cover_image_url TEXT,
    is_verified     BOOLEAN DEFAULT FALSE,
    is_active       BOOLEAN DEFAULT TRUE,
    avg_rating      NUMERIC(2,1) DEFAULT 0.0,
    review_count    INTEGER DEFAULT 0,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_places_category_id ON places(category_id);
CREATE INDEX idx_places_district_id ON places(district_id);
CREATE INDEX idx_places_slug ON places(slug);
CREATE INDEX idx_places_location ON places USING GIST(location);
CREATE INDEX idx_places_avg_rating ON places(avg_rating DESC);
CREATE INDEX idx_places_active ON places(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_places_metadata ON places USING GIN(metadata);

CREATE TRIGGER trg_places_updated_at
    BEFORE UPDATE ON places
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-sync location from lat/lng
CREATE OR REPLACE FUNCTION sync_place_location()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
        NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::GEOGRAPHY;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_places_sync_location
    BEFORE INSERT OR UPDATE OF latitude, longitude ON places
    FOR EACH ROW EXECUTE FUNCTION sync_place_location();

-- ============================================================
-- 6. HOTEL_DETAILS
-- ============================================================
CREATE TABLE hotel_details (
    place_id            UUID PRIMARY KEY REFERENCES places(id) ON DELETE CASCADE,
    hotel_type          TEXT NOT NULL CHECK (hotel_type IN ('hotel','homestay','resort','lodge','guesthouse')),
    star_rating         SMALLINT CHECK (star_rating BETWEEN 1 AND 5),
    price_per_night_min NUMERIC(10,2),
    price_per_night_max NUMERIC(10,2),
    currency            TEXT DEFAULT 'NPR',
    check_in_time       TIME,
    check_out_time      TIME,
    total_rooms         INTEGER,
    amenities           JSONB DEFAULT '[]',
    booking_url         TEXT,
    created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
    CHECK (price_per_night_max >= price_per_night_min)
);

CREATE TRIGGER trg_hotel_details_updated_at
    BEFORE UPDATE ON hotel_details
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 7. RESTAURANT_DETAILS
-- ============================================================
CREATE TABLE restaurant_details (
    place_id        UUID PRIMARY KEY REFERENCES places(id) ON DELETE CASCADE,
    cuisine_types   TEXT[] DEFAULT '{}',
    dietary_options TEXT[] DEFAULT '{}',
    avg_cost_for_two NUMERIC(10,2),
    currency        TEXT DEFAULT 'NPR',
    has_delivery    BOOLEAN DEFAULT FALSE,
    has_dine_in     BOOLEAN DEFAULT TRUE,
    has_takeout     BOOLEAN DEFAULT FALSE,
    reservation_url TEXT,
    created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER trg_restaurant_details_updated_at
    BEFORE UPDATE ON restaurant_details
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 8. PLACE_HOURS
-- ============================================================
CREATE TABLE place_hours (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id    UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    open_time   TIME,
    close_time  TIME,
    is_closed   BOOLEAN DEFAULT FALSE,
    UNIQUE (place_id, day_of_week)
);

CREATE INDEX idx_place_hours_place_id ON place_hours(place_id);

-- ============================================================
-- 9. FOODS
-- ============================================================
CREATE TABLE foods (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name              TEXT NOT NULL UNIQUE,
    slug              TEXT NOT NULL UNIQUE,
    description       TEXT,
    image_url         TEXT,
    is_vegetarian     BOOLEAN DEFAULT FALSE,
    is_vegan          BOOLEAN DEFAULT FALSE,
    origin_district_id UUID REFERENCES districts(id) ON DELETE SET NULL,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_foods_slug ON foods(slug);

-- ============================================================
-- 10. RESTAURANT_FOODS (junction)
-- ============================================================
CREATE TABLE restaurant_foods (
    place_id    UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    food_id     UUID NOT NULL REFERENCES foods(id) ON DELETE CASCADE,
    price       NUMERIC(10,2),
    is_specialty BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (place_id, food_id)
);

CREATE INDEX idx_restaurant_foods_food_id ON restaurant_foods(food_id);

-- ============================================================
-- 11. TAGS
-- ============================================================
CREATE TABLE tags (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name       TEXT NOT NULL UNIQUE,
    slug       TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- 12. PLACE_TAGS (junction)
-- ============================================================
CREATE TABLE place_tags (
    place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    tag_id   UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (place_id, tag_id)
);

CREATE INDEX idx_place_tags_tag_id ON place_tags(tag_id);

-- ============================================================
-- 13. MEDIA
-- ============================================================
CREATE TABLE media (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id      UUID REFERENCES places(id) ON DELETE CASCADE,
    food_id       UUID REFERENCES foods(id) ON DELETE CASCADE,
    uploaded_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
    url           TEXT NOT NULL,
    media_type    TEXT NOT NULL CHECK (media_type IN ('image','video')),
    caption       TEXT,
    display_order SMALLINT DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    CHECK (num_nonnulls(place_id, food_id) = 1)
);

CREATE INDEX idx_media_place_id ON media(place_id) WHERE place_id IS NOT NULL;
CREATE INDEX idx_media_food_id ON media(food_id) WHERE food_id IS NOT NULL;

-- ============================================================
-- 14. REVIEWS
-- ============================================================
CREATE TABLE reviews (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id   UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating     SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title      TEXT,
    body       TEXT,
    visit_date DATE,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (place_id, user_id)
);

CREATE INDEX idx_reviews_place_id ON reviews(place_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(place_id, rating);

CREATE TRIGGER trg_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger: keep places.avg_rating & review_count in sync
CREATE OR REPLACE FUNCTION refresh_place_rating()
RETURNS TRIGGER AS $$
DECLARE
    target_place_id UUID;
BEGIN
    target_place_id = COALESCE(NEW.place_id, OLD.place_id);
    UPDATE places SET
        avg_rating   = COALESCE((SELECT ROUND(AVG(rating)::NUMERIC, 1) FROM reviews WHERE place_id = target_place_id), 0),
        review_count = (SELECT COUNT(*) FROM reviews WHERE place_id = target_place_id)
    WHERE id = target_place_id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_refresh_place_rating
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION refresh_place_rating();

-- ============================================================
-- 15. FAVORITES
-- ============================================================
CREATE TABLE favorites (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    place_id   UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (user_id, place_id)
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_place_id ON favorites(place_id);

-- ============================================================
-- 16. ITINERARIES
-- ============================================================
CREATE TABLE itineraries (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title        TEXT NOT NULL,
    description  TEXT,
    start_date   DATE,
    end_date     DATE,
    budget_min   NUMERIC(12,2),
    budget_max   NUMERIC(12,2),
    currency     TEXT DEFAULT 'NPR',
    travel_style TEXT CHECK (travel_style IN ('budget','moderate','luxury','adventure','cultural')),
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_prompt    TEXT,
    status       TEXT DEFAULT 'draft' CHECK (status IN ('draft','active','completed','archived')),
    is_public    BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
    CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

CREATE INDEX idx_itineraries_user_id ON itineraries(user_id);
CREATE INDEX idx_itineraries_status ON itineraries(status);

CREATE TRIGGER trg_itineraries_updated_at
    BEFORE UPDATE ON itineraries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 17. ITINERARY_ITEMS
-- ============================================================
CREATE TABLE itinerary_items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itinerary_id    UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
    place_id        UUID REFERENCES places(id) ON DELETE SET NULL,
    day_number      SMALLINT NOT NULL,
    position        SMALLINT NOT NULL,
    custom_title    TEXT,
    custom_note     TEXT,
    start_time      TIME,
    end_time        TIME,
    duration_minutes INTEGER,
    transport_mode  TEXT CHECK (transport_mode IN ('walk','taxi','bus','flight','drive','bike')),
    transport_note  TEXT,
    created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (itinerary_id, day_number, position)
);

CREATE INDEX idx_itinerary_items_itinerary_id ON itinerary_items(itinerary_id);

-- ============================================================
-- 18. EMERGENCY_CATEGORIES
-- ============================================================
CREATE TABLE emergency_categories (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          TEXT NOT NULL UNIQUE,
    icon          TEXT,
    display_order SMALLINT DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- 19. EMERGENCY_SERVICES
-- ============================================================
CREATE TABLE emergency_services (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id   UUID NOT NULL REFERENCES emergency_categories(id) ON DELETE RESTRICT,
    district_id   UUID REFERENCES districts(id) ON DELETE SET NULL,
    name          TEXT NOT NULL,
    phone         TEXT NOT NULL,
    alt_phone     TEXT,
    address       TEXT,
    latitude      DOUBLE PRECISION,
    longitude     DOUBLE PRECISION,
    is_nationwide BOOLEAN DEFAULT FALSE,
    is_24_hours   BOOLEAN DEFAULT FALSE,
    notes         TEXT,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_emergency_services_category_id ON emergency_services(category_id);
CREATE INDEX idx_emergency_services_district_id ON emergency_services(district_id);

CREATE TRIGGER trg_emergency_services_updated_at
    BEFORE UPDATE ON emergency_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 20. LANGUAGES (reference table for i18n)
-- ============================================================
CREATE TABLE languages (
    code       TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    native_name TEXT,
    is_active  BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 21. TRANSLATIONS (future multilingual support)
-- ============================================================
CREATE TABLE translations (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name    TEXT NOT NULL,
    record_id     UUID NOT NULL,
    field_name    TEXT NOT NULL,
    language_code TEXT NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
    value         TEXT NOT NULL,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (table_name, record_id, field_name, language_code)
);

CREATE INDEX idx_translations_lookup
    ON translations(table_name, record_id, language_code);

CREATE TRIGGER trg_translations_updated_at
    BEFORE UPDATE ON translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
