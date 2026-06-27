-- ============================================================
-- PAILA (पाइला) — Row Level Security Policies
-- Run AFTER schema.sql
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC READ: Anyone can read reference/content data
-- ============================================================
CREATE POLICY "Public read regions"        ON regions            FOR SELECT USING (true);
CREATE POLICY "Public read districts"      ON districts          FOR SELECT USING (true);
CREATE POLICY "Public read categories"     ON categories         FOR SELECT USING (true);
CREATE POLICY "Public read places"         ON places             FOR SELECT USING (is_active = true);
CREATE POLICY "Public read hotel_details"  ON hotel_details      FOR SELECT USING (true);
CREATE POLICY "Public read restaurant_details" ON restaurant_details FOR SELECT USING (true);
CREATE POLICY "Public read place_hours"    ON place_hours        FOR SELECT USING (true);
CREATE POLICY "Public read foods"          ON foods              FOR SELECT USING (true);
CREATE POLICY "Public read restaurant_foods" ON restaurant_foods FOR SELECT USING (true);
CREATE POLICY "Public read tags"           ON tags               FOR SELECT USING (true);
CREATE POLICY "Public read place_tags"     ON place_tags         FOR SELECT USING (true);
CREATE POLICY "Public read media"          ON media              FOR SELECT USING (true);
CREATE POLICY "Public read reviews"        ON reviews            FOR SELECT USING (true);
CREATE POLICY "Public read emergency_cat"  ON emergency_categories FOR SELECT USING (true);
CREATE POLICY "Public read emergency_svc"  ON emergency_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read languages"      ON languages          FOR SELECT USING (is_active = true);
CREATE POLICY "Public read translations"   ON translations       FOR SELECT USING (true);
CREATE POLICY "Public read profiles"       ON profiles           FOR SELECT USING (true);

-- ============================================================
-- PUBLIC ITINERARIES: read if public
-- ============================================================
CREATE POLICY "Public read public itineraries"
    ON itineraries FOR SELECT
    USING (is_public = true);

-- ============================================================
-- USER-OWNED: profiles
-- ============================================================
CREATE POLICY "Users update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ============================================================
-- USER-OWNED: reviews
-- ============================================================
CREATE POLICY "Users insert own reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reviews"
    ON reviews FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own reviews"
    ON reviews FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- USER-OWNED: favorites
-- ============================================================
CREATE POLICY "Users read own favorites"
    ON favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users insert own favorites"
    ON favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own favorites"
    ON favorites FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- USER-OWNED: itineraries & items
-- ============================================================
CREATE POLICY "Users read own itineraries"
    ON itineraries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users insert own itineraries"
    ON itineraries FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own itineraries"
    ON itineraries FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own itineraries"
    ON itineraries FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Users read own itinerary items"
    ON itinerary_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM itineraries
        WHERE itineraries.id = itinerary_items.itinerary_id
        AND itineraries.user_id = auth.uid()
    ));

CREATE POLICY "Users insert own itinerary items"
    ON itinerary_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM itineraries
        WHERE itineraries.id = itinerary_items.itinerary_id
        AND itineraries.user_id = auth.uid()
    ));

CREATE POLICY "Users update own itinerary items"
    ON itinerary_items FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM itineraries
        WHERE itineraries.id = itinerary_items.itinerary_id
        AND itineraries.user_id = auth.uid()
    ));

CREATE POLICY "Users delete own itinerary items"
    ON itinerary_items FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM itineraries
        WHERE itineraries.id = itinerary_items.itinerary_id
        AND itineraries.user_id = auth.uid()
    ));

-- ============================================================
-- USER-OWNED: media uploads
-- ============================================================
CREATE POLICY "Users insert own media"
    ON media FOR INSERT
    WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users delete own media"
    ON media FOR DELETE
    USING (auth.uid() = uploaded_by);
