-- ============================================================
-- PAILA (पाइला) — Sample Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- ============================================================
-- LANGUAGES
-- ============================================================
INSERT INTO languages (code, name, native_name, is_active) VALUES
    ('en', 'English',    'English',   true),
    ('ne', 'Nepali',     'नेपाली',     true),
    ('hi', 'Hindi',      'हिन्दी',      true),
    ('zh', 'Chinese',    '中文',       false),
    ('ja', 'Japanese',   '日本語',     false),
    ('ko', 'Korean',     '한국어',     false),
    ('de', 'German',     'Deutsch',   false),
    ('fr', 'French',     'Français',  false);

-- ============================================================
-- REGIONS (Provinces of Nepal)
-- ============================================================
INSERT INTO regions (id, name, slug, description) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Koshi',          'koshi',          'Eastern Nepal — gateway to Kanchenjunga'),
    ('a0000000-0000-0000-0000-000000000002', 'Madhesh',        'madhesh',        'Southern plains, Terai region'),
    ('a0000000-0000-0000-0000-000000000003', 'Bagmati',        'bagmati',        'Central Nepal — home to Kathmandu Valley'),
    ('a0000000-0000-0000-0000-000000000004', 'Gandaki',        'gandaki',        'Central-west — Pokhara and Annapurna region'),
    ('a0000000-0000-0000-0000-000000000005', 'Lumbini',        'lumbini',        'Birthplace of Lord Buddha'),
    ('a0000000-0000-0000-0000-000000000006', 'Karnali',        'karnali',        'Remote western highlands'),
    ('a0000000-0000-0000-0000-000000000007', 'Sudurpashchim',  'sudurpashchim',  'Far-western Nepal');

-- ============================================================
-- DISTRICTS (key tourist districts)
-- ============================================================
INSERT INTO districts (id, region_id, name, slug) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'Kathmandu',  'kathmandu'),
    ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'Lalitpur',   'lalitpur'),
    ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Bhaktapur',  'bhaktapur'),
    ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'Kaski',      'kaski'),
    ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', 'Chitwan',    'chitwan'),
    ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000005', 'Rupandehi',  'rupandehi'),
    ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'Solukhumbu', 'solukhumbu'),
    ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000004', 'Mustang',    'mustang');

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (id, name, slug, icon, display_order) VALUES
    ('c0000000-0000-0000-0000-000000000001', 'Attraction',  'attraction',  '🏛️', 1),
    ('c0000000-0000-0000-0000-000000000002', 'Hotel',       'hotel',       '🏨', 2),
    ('c0000000-0000-0000-0000-000000000003', 'Restaurant',  'restaurant',  '🍽️', 3),
    ('c0000000-0000-0000-0000-000000000004', 'Trekking',    'trekking',    '🥾', 4),
    ('c0000000-0000-0000-0000-000000000005', 'Temple',      'temple',      '🛕', 5),
    ('c0000000-0000-0000-0000-000000000006', 'Market',      'market',      '🛍️', 6);

-- ============================================================
-- PLACES
-- ============================================================

-- Attractions
INSERT INTO places (id, category_id, district_id, name, slug, description, address, latitude, longitude, price_level, is_verified, is_active) VALUES
    ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001',
     'Pashupatinath Temple', 'pashupatinath-temple',
     'Sacred Hindu temple dedicated to Lord Shiva, UNESCO World Heritage Site. One of the most important Shiva temples in the world.',
     'Pashupati Nath Road, Kathmandu', 27.7107, 85.3485, 1, true, true),

    ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001',
     'Boudhanath Stupa', 'boudhanath-stupa',
     'One of the largest spherical stupas in Nepal and the world, UNESCO World Heritage Site. A center of Tibetan Buddhism.',
     'Boudha, Kathmandu', 27.7215, 85.3620, 1, true, true),

    ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001',
     'Swayambhunath (Monkey Temple)', 'swayambhunath',
     'Ancient religious hilltop complex with a stupa, monasteries, and shrines. UNESCO World Heritage Site.',
     'Swayambhu, Kathmandu', 27.7149, 85.2903, 1, true, true),

    ('d0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003',
     'Bhaktapur Durbar Square', 'bhaktapur-durbar-square',
     'A stunning collection of pagoda-style and shikhara-style temples. UNESCO World Heritage Site of Newari architecture.',
     'Durbar Square, Bhaktapur', 27.6722, 85.4279, 2, true, true),

    ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004',
     'Phewa Lake', 'phewa-lake',
     'A freshwater lake in the south of the Pokhara Valley, with spectacular views of Machhapuchhre (Fishtail) and the Annapurna range.',
     'Lakeside, Pokhara', 28.2096, 83.9563, 1, true, true),

    ('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000007',
     'Everest Base Camp Trek', 'everest-base-camp-trek',
     'The legendary trek to the base of the world''s highest mountain. A bucket-list adventure through Sherpa villages.',
     'Lukla to Everest Base Camp, Solukhumbu', 28.0025, 86.8528, 3, true, true);

-- Hotels
INSERT INTO places (id, category_id, district_id, name, slug, description, address, latitude, longitude, price_level, is_verified, is_active) VALUES
    ('d0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
     'Hotel Yak & Yeti', 'hotel-yak-and-yeti',
     'A heritage luxury hotel in a restored Rana palace, offering world-class hospitality in the heart of Kathmandu.',
     'Durbar Marg, Kathmandu', 27.7132, 85.3171, 4, true, true),

    ('d0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004',
     'Fish Tail Lodge', 'fish-tail-lodge',
     'Iconic lakeside lodge accessible only by raft, with panoramic views of Machhapuchhre.',
     'Lakeside, Pokhara', 28.2020, 83.9560, 3, true, true),

    ('d0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003',
     'Cozy Homestay Bhaktapur', 'cozy-homestay-bhaktapur',
     'An authentic Newari homestay experience in the heart of Bhaktapur, with traditional courtyard and home-cooked meals.',
     'Suryamadhi, Bhaktapur', 27.6730, 85.4280, 1, true, true);

-- Restaurants
INSERT INTO places (id, category_id, district_id, name, slug, description, address, latitude, longitude, price_level, is_verified, is_active) VALUES
    ('d0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001',
     'Bhojan Griha', 'bhojan-griha',
     'Fine Nepali dining in a restored 150-year-old Newari house with cultural performances.',
     'Dillibazar, Kathmandu', 27.7062, 85.3250, 3, true, true),

    ('d0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002',
     'Honacha', 'honacha',
     'Authentic Newari cuisine in a traditional setting in Patan. Known for the best Newari Khaja set.',
     'Mangal Bazar, Lalitpur', 27.6727, 85.3258, 2, true, true),

    ('d0000000-0000-0000-0000-000000000022', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000004',
     'Moondance Restaurant', 'moondance-restaurant',
     'Lakeside restaurant with stunning mountain views, serving Nepali, Indian, and continental cuisine.',
     'Lakeside, Pokhara', 28.2100, 83.9570, 2, true, true);

-- ============================================================
-- HOTEL_DETAILS
-- ============================================================
INSERT INTO hotel_details (place_id, hotel_type, star_rating, price_per_night_min, price_per_night_max, currency, check_in_time, check_out_time, total_rooms, amenities, booking_url) VALUES
    ('d0000000-0000-0000-0000-000000000010', 'hotel',     5, 15000, 85000, 'NPR', '14:00', '12:00', 270,
     '["wifi","pool","spa","gym","restaurant","bar","parking","airport_shuttle"]', 'https://yakandyeti.com'),
    ('d0000000-0000-0000-0000-000000000011', 'lodge',     4, 8000,  25000, 'NPR', '14:00', '11:00', 68,
     '["wifi","restaurant","bar","garden","lake_view"]', 'https://fishtail-lodge.com'),
    ('d0000000-0000-0000-0000-000000000012', 'homestay',  NULL, 1500, 3000, 'NPR', '13:00', '11:00', 4,
     '["wifi","breakfast_included","courtyard","cultural_experience"]', NULL);

-- ============================================================
-- RESTAURANT_DETAILS
-- ============================================================
INSERT INTO restaurant_details (place_id, cuisine_types, dietary_options, avg_cost_for_two, currency, has_delivery, has_dine_in, has_takeout) VALUES
    ('d0000000-0000-0000-0000-000000000020', '{nepali,newari}',     '{vegetarian}',          3000, 'NPR', false, true, false),
    ('d0000000-0000-0000-0000-000000000021', '{newari}',            '{vegetarian,vegan}',    1200, 'NPR', false, true, true),
    ('d0000000-0000-0000-0000-000000000022', '{nepali,indian,continental}', '{vegetarian,vegan}', 1800, 'NPR', true,  true, true);

-- ============================================================
-- FOODS
-- ============================================================
INSERT INTO foods (id, name, slug, description, is_vegetarian, is_vegan, origin_district_id) VALUES
    ('f0000000-0000-0000-0000-000000000001', 'Dal Bhat',    'dal-bhat',
     'The national dish of Nepal — steamed rice with lentil soup, vegetables, pickles, and often meat curry. Eaten twice daily by most Nepalis.',
     false, false, NULL),
    ('f0000000-0000-0000-0000-000000000002', 'Momo',        'momo',
     'Nepali-style steamed or fried dumplings filled with meat or vegetables, served with spicy tomato chutney.',
     false, false, 'b0000000-0000-0000-0000-000000000001'),
    ('f0000000-0000-0000-0000-000000000003', 'Sel Roti',    'sel-roti',
     'A traditional Nepali ring-shaped sweet fried bread made from rice flour, typically made during festivals like Dashain and Tihar.',
     true, true, NULL),
    ('f0000000-0000-0000-0000-000000000004', 'Chatamari',   'chatamari',
     'Often called "Newari Pizza" — a rice flour crepe topped with minced meat, egg, and vegetables.',
     false, false, 'b0000000-0000-0000-0000-000000000001'),
    ('f0000000-0000-0000-0000-000000000005', 'Newari Khaja Set', 'newari-khaja-set',
     'A traditional Newari feast platter with beaten rice, marinated meats, soybeans, pickles, and local alcohol.',
     false, false, 'b0000000-0000-0000-0000-000000000002'),
    ('f0000000-0000-0000-0000-000000000006', 'Thukpa',      'thukpa',
     'A hearty Tibetan-influenced noodle soup popular in the mountain regions of Nepal.',
     false, false, 'b0000000-0000-0000-0000-000000000007'),
    ('f0000000-0000-0000-0000-000000000007', 'Juju Dhau',   'juju-dhau',
     'The famous "King of Yogurts" from Bhaktapur — a rich, creamy, sweetened yogurt served in clay pots.',
     true, false, 'b0000000-0000-0000-0000-000000000003'),
    ('f0000000-0000-0000-0000-000000000008', 'Gundruk',     'gundruk',
     'Fermented leafy green vegetable — a staple dried food unique to Nepal, often made into soup.',
     true, true, NULL);

-- ============================================================
-- RESTAURANT_FOODS
-- ============================================================
INSERT INTO restaurant_foods (place_id, food_id, price, is_specialty) VALUES
    ('d0000000-0000-0000-0000-000000000020', 'f0000000-0000-0000-0000-000000000001', 450, false),
    ('d0000000-0000-0000-0000-000000000020', 'f0000000-0000-0000-0000-000000000005', 850, true),
    ('d0000000-0000-0000-0000-000000000020', 'f0000000-0000-0000-0000-000000000004', 350, true),
    ('d0000000-0000-0000-0000-000000000021', 'f0000000-0000-0000-0000-000000000005', 600, true),
    ('d0000000-0000-0000-0000-000000000021', 'f0000000-0000-0000-0000-000000000004', 250, true),
    ('d0000000-0000-0000-0000-000000000021', 'f0000000-0000-0000-0000-000000000007', 150, false),
    ('d0000000-0000-0000-0000-000000000022', 'f0000000-0000-0000-0000-000000000001', 500, false),
    ('d0000000-0000-0000-0000-000000000022', 'f0000000-0000-0000-0000-000000000002', 300, false),
    ('d0000000-0000-0000-0000-000000000022', 'f0000000-0000-0000-0000-000000000006', 350, false);

-- ============================================================
-- TAGS
-- ============================================================
INSERT INTO tags (id, name, slug) VALUES
    ('e0000000-0000-0000-0000-000000000001', 'UNESCO World Heritage',  'unesco'),
    ('e0000000-0000-0000-0000-000000000002', 'Family Friendly',        'family-friendly'),
    ('e0000000-0000-0000-0000-000000000003', 'Adventure',              'adventure'),
    ('e0000000-0000-0000-0000-000000000004', 'Romantic',               'romantic'),
    ('e0000000-0000-0000-0000-000000000005', 'Budget',                 'budget'),
    ('e0000000-0000-0000-0000-000000000006', 'Luxury',                 'luxury'),
    ('e0000000-0000-0000-0000-000000000007', 'Photography',            'photography'),
    ('e0000000-0000-0000-0000-000000000008', 'Spiritual',              'spiritual'),
    ('e0000000-0000-0000-0000-000000000009', 'Nightlife',              'nightlife'),
    ('e0000000-0000-0000-0000-000000000010', 'Outdoor',                'outdoor');

-- ============================================================
-- PLACE_TAGS
-- ============================================================
INSERT INTO place_tags (place_id, tag_id) VALUES
    ('d0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001'),
    ('d0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000008'),
    ('d0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001'),
    ('d0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000007'),
    ('d0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001'),
    ('d0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002'),
    ('d0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001'),
    ('d0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000007'),
    ('d0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000004'),
    ('d0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000010'),
    ('d0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000003'),
    ('d0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000010'),
    ('d0000000-0000-0000-0000-000000000010', 'e0000000-0000-0000-0000-000000000006'),
    ('d0000000-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000005');

-- ============================================================
-- EMERGENCY_CATEGORIES
-- ============================================================
INSERT INTO emergency_categories (id, name, icon, display_order) VALUES
    ('ec000000-0000-0000-0000-000000000001', 'Police',       '🚔', 1),
    ('ec000000-0000-0000-0000-000000000002', 'Hospital',     '🏥', 2),
    ('ec000000-0000-0000-0000-000000000003', 'Fire',         '🚒', 3),
    ('ec000000-0000-0000-0000-000000000004', 'Ambulance',    '🚑', 4),
    ('ec000000-0000-0000-0000-000000000005', 'Rescue',       '⛑️', 5),
    ('ec000000-0000-0000-0000-000000000006', 'Embassy',      '🏛️', 6),
    ('ec000000-0000-0000-0000-000000000007', 'Tourist Help', 'ℹ️', 7);

-- ============================================================
-- EMERGENCY_SERVICES
-- ============================================================
INSERT INTO emergency_services (category_id, district_id, name, phone, alt_phone, is_nationwide, is_24_hours, notes) VALUES
    ('ec000000-0000-0000-0000-000000000001', NULL,
     'Nepal Police Emergency',        '100',  '01-4261945', true,  true, 'National emergency number'),
    ('ec000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001',
     'Tourist Police Kathmandu',      '01-4247041', '1144', false, true, 'Dedicated tourist assistance'),
    ('ec000000-0000-0000-0000-000000000004', NULL,
     'Ambulance Service',             '102',  NULL,         true,  true, 'National ambulance number'),
    ('ec000000-0000-0000-0000-000000000003', NULL,
     'Fire Brigade',                  '101',  NULL,         true,  true, 'National fire emergency number'),
    ('ec000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
     'Tribhuvan University Teaching Hospital', '01-4412707', '01-4412303', false, true, 'Major government hospital in Kathmandu'),
    ('ec000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
     'CIWEC Hospital',                '01-4424111', NULL,   false, true, 'Recommended for tourists — English-speaking doctors'),
    ('ec000000-0000-0000-0000-000000000005', NULL,
     'Nepal Mountain Rescue',         '01-4480856', NULL,   true,  true, 'Helicopter rescue coordination'),
    ('ec000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001',
     'Nepal Tourism Board',           '01-4256909', '1188', false, false, 'Tourist information and assistance');

-- ============================================================
-- SAMPLE TRANSLATIONS (demonstrating multilingual support)
-- ============================================================
INSERT INTO translations (table_name, record_id, field_name, language_code, value) VALUES
    ('places', 'd0000000-0000-0000-0000-000000000001', 'name', 'ne', 'पशुपतिनाथ मन्दिर'),
    ('places', 'd0000000-0000-0000-0000-000000000001', 'description', 'ne', 'भगवान शिवलाई समर्पित पवित्र हिन्दू मन्दिर, युनेस्को विश्व सम्पदा स्थल।'),
    ('places', 'd0000000-0000-0000-0000-000000000002', 'name', 'ne', 'बौद्धनाथ स्तूप'),
    ('foods',  'f0000000-0000-0000-0000-000000000001', 'name', 'ne', 'दालभात'),
    ('foods',  'f0000000-0000-0000-0000-000000000002', 'name', 'ne', 'मम'),
    ('foods',  'f0000000-0000-0000-0000-000000000003', 'name', 'ne', 'सेलरोटी');

-- ============================================================
-- PLACE_HOURS (sample for Bhojan Griha)
-- ============================================================
INSERT INTO place_hours (place_id, day_of_week, open_time, close_time, is_closed) VALUES
    ('d0000000-0000-0000-0000-000000000020', 0, '11:00', '22:00', false),
    ('d0000000-0000-0000-0000-000000000020', 1, '11:00', '22:00', false),
    ('d0000000-0000-0000-0000-000000000020', 2, '11:00', '22:00', false),
    ('d0000000-0000-0000-0000-000000000020', 3, '11:00', '22:00', false),
    ('d0000000-0000-0000-0000-000000000020', 4, '11:00', '22:00', false),
    ('d0000000-0000-0000-0000-000000000020', 5, '11:00', '23:00', false),
    ('d0000000-0000-0000-0000-000000000020', 6, '11:00', '22:00', false);
