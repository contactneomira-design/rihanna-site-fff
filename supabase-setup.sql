-- =============================================================================
-- RIHANA DREAMS CARS — database setup (run ONCE in Supabase)
-- Supabase dashboard -> SQL Editor -> New query -> paste all -> Run
-- Safe to run twice: it never deletes or duplicates anything.
-- =============================================================================

-- 1) Tables ------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "Car" (
  "id"           TEXT         NOT NULL,
  "slug"         TEXT         NOT NULL,
  "name"         TEXT         NOT NULL,
  "brand"        TEXT         NOT NULL DEFAULT '',
  "category"     TEXT         NOT NULL,
  "pricePerDay"  INTEGER      NOT NULL DEFAULT 0,
  "image"        TEXT         NOT NULL,
  "images"       TEXT[]       NOT NULL DEFAULT ARRAY[]::TEXT[],
  "seats"        INTEGER      NOT NULL DEFAULT 5,
  "transmission" TEXT         NOT NULL DEFAULT 'Manual',
  "fuel"         TEXT         NOT NULL DEFAULT 'Petrol',
  "blurb"        TEXT         NOT NULL DEFAULT '',
  "features"     TEXT[]       NOT NULL DEFAULT ARRAY[]::TEXT[],
  "tags"         TEXT[]       NOT NULL DEFAULT ARRAY[]::TEXT[],
  "available"    BOOLEAN      NOT NULL DEFAULT true,
  "sortOrder"    INTEGER      NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Car_slug_key" ON "Car"("slug");

CREATE TABLE IF NOT EXISTS "CarImage" (
  "id"        TEXT         NOT NULL,
  "mime"      TEXT         NOT NULL,
  "data"      BYTEA        NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Booking" (
  "id"        TEXT         NOT NULL,
  "carName"   TEXT         NOT NULL,
  "fullName"  TEXT         NOT NULL,
  "phone"     TEXT         NOT NULL,
  "startDate" TIMESTAMP(3) NOT NULL,
  "endDate"   TIMESTAMP(3) NOT NULL,
  "status"    TEXT         NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Contact" (
  "id"        TEXT         NOT NULL,
  "name"      TEXT         NOT NULL,
  "phone"     TEXT         NOT NULL,
  "message"   TEXT         NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- 2) Security: nobody can read these tables through Supabase's public API.
--    (The website connects with the database password, which is not affected.)
ALTER TABLE "Car"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CarImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Contact"  ENABLE ROW LEVEL SECURITY;

-- 3) Current fleet (the 11 cars of the website) -----------------------------

INSERT INTO "Car"
  ("id", "slug", "name", "category", "image", "images", "seats", "transmission", "fuel", "blurb", "features", "tags", "available", "sortOrder")
VALUES
  ('seed-dacia-jogger', 'dacia-jogger', 'Dacia Jogger', 'family', '/images/cars/dacia-jogger.jpg', ARRAY['/cars/family/dacia-jogger-1.jpg', '/cars/family/dacia-jogger-2.jpg', '/cars/family/dacia-jogger-3.jpg', '/cars/family/dacia-jogger-4.jpg', '/cars/family/dacia-jogger-5.jpg'], 7, 'Manual', 'Petrol', '7 seats, one big family, zero stress.', ARRAY['7 Seats', 'Roof Rails', 'Full Insurance'], ARRAY['7 Seats', 'Family', 'Spacious'], true, 10),
  ('seed-dacia-sandero-stepway', 'dacia-sandero-stepway', 'Dacia Sandero Stepway', 'atlas', '/images/cars/dacia-sandero.jpg', ARRAY['/cars/atlas/dacia-sandero-stepway-1.jpg', '/cars/atlas/dacia-sandero-stepway-2.jpg', '/cars/atlas/dacia-sandero-stepway-3.jpg', '/cars/atlas/dacia-sandero-stepway-4.jpg', '/cars/atlas/dacia-sandero-stepway-5.jpg'], 5, 'Manual', 'Petrol', 'Raised, rugged, ready for the open road.', ARRAY['Raised Suspension', 'Economy', 'Full Insurance'], ARRAY['5 Seats', 'City & Road', 'Efficient'], true, 20),
  ('seed-peugeot-208', 'peugeot-208', 'Peugeot 208', 'belbala', '/images/cars/peugeot-208.jpg', ARRAY['/images/gallery/peugeot-208/1.jpg', '/images/gallery/peugeot-208/2.jpg', '/images/gallery/peugeot-208/3.jpg', '/images/gallery/peugeot-208/4.jpg', '/images/gallery/peugeot-208/5.jpg'], 5, 'Automatic', 'Petrol', 'Sharp lines, smooth ride, city to coast.', ARRAY['Apple CarPlay', 'City Perfect', 'Full Insurance'], ARRAY['5 Seats', 'Compact', 'French Chic'], true, 30),
  ('seed-vw-tiguan', 'vw-tiguan', 'Volkswagen Tiguan', 'atlas', '/images/cars/vw-tiguan.jpg', ARRAY['/cars/atlas/vw-tiguan-1.jpg', '/cars/atlas/vw-tiguan-2.jpg', '/cars/atlas/vw-tiguan-3.jpg', '/cars/atlas/vw-tiguan-4.jpg', '/cars/atlas/vw-tiguan-5.jpg', '/cars/atlas/vw-tiguan-6.jpg', '/cars/atlas/vw-tiguan-7.jpg'], 5, 'Automatic', 'Diesel', 'German precision with room to spare.', ARRAY['Panoramic Roof', 'AWD Available', 'Full Insurance'], ARRAY['5 Seats', 'SUV', 'Panoramic Roof'], true, 40),
  ('seed-hyundai-tucson', 'hyundai-tucson', 'Hyundai Tucson', 'atlas', '/images/cars/hyundai-tucson.jpg', ARRAY['/cars/atlas/hyundai-tucson-1.jpg', '/cars/atlas/hyundai-tucson-2.jpg', '/cars/atlas/hyundai-tucson-3.jpg', '/cars/atlas/hyundai-tucson-4.jpg', '/cars/atlas/hyundai-tucson-5.jpg'], 5, 'Automatic', 'Diesel', 'Bold design, calm on every kind of road.', ARRAY['Adaptive Cruise', 'Spacious Boot', 'Full Insurance'], ARRAY['5 Seats', 'SUV', 'Confident'], true, 50),
  ('seed-dacia-logan-green', 'dacia-logan-green', 'Dacia Logan Green', 'family', '/images/cars/dacia-logan.jpg', ARRAY['/cars/family/dacia-logan-green-1.jpg', '/cars/family/dacia-logan-green-2.jpg', '/cars/family/dacia-logan-green-3.jpg', '/cars/family/dacia-logan-green-4.jpg', '/cars/family/dacia-logan-green-5.jpg', '/cars/family/dacia-logan-green-6.jpg', '/cars/family/dacia-logan-green-7.jpg', '/cars/family/dacia-logan-green-8.jpg'], 5, 'Manual', 'Petrol', 'The workhorse that never lets you down.', ARRAY['Long Haul Ready', 'Economy', 'Full Insurance'], ARRAY['5 Seats', 'Reliable', 'Long Haul'], true, 60),
  ('seed-dacia-logan-blanc', 'dacia-logan-blanc', 'Dacia Logan Blanc', 'family', '/images/cars/dacia-logan-blanche.jpg', ARRAY['/cars/family/dacia-logan-blanc-1.jpg', '/cars/family/dacia-logan-blanc-2.jpg', '/cars/family/dacia-logan-blanc-3.jpg', '/cars/family/dacia-logan-blanc-4.jpg', '/cars/family/dacia-logan-blanc-5.jpg'], 5, 'Manual', 'Petrol', 'Clean, simple, built for the long tarmac south.', ARRAY['Desert Tested', 'Economy', 'Full Insurance'], ARRAY['5 Seats', 'Fresh', 'Desert Roads'], true, 70),
  ('seed-renault-talian', 'renault-talian', 'Renault Taliant', 'family', '/images/cars/renault-taliant.jpg', ARRAY['/cars/family/renault-talian-1.jpg', '/cars/family/renault-talian-2.jpg', '/cars/family/renault-talian-3.jpg', '/cars/family/renault-talian-4.jpg', '/cars/family/renault-talian-5.jpg', '/cars/family/renault-talian-6.jpg', '/cars/family/renault-talian-7.jpg', '/cars/family/renault-talian-8.jpg'], 5, 'Automatic', 'Petrol', 'Renault’s newest, tuned for distance.', ARRAY['Latest Model', 'Comfort Seats', 'Full Insurance'], ARRAY['5 Seats', 'Modern', 'Border to Border'], true, 80),
  ('seed-range-rover-evoque', 'range-rover-evoque', 'Range Rover Evoque', 'atlas', '/images/cars/range-rover-evoque.jpg', ARRAY['/cars/atlas/range-rover-evoque-1.jpg', '/cars/atlas/range-rover-evoque-2.jpg', '/cars/atlas/range-rover-evoque-3.jpg', '/cars/atlas/range-rover-evoque-4.jpg', '/cars/atlas/range-rover-evoque-5.jpg', '/cars/atlas/range-rover-evoque-6.jpg', '/cars/atlas/range-rover-evoque-7.jpg'], 5, 'Automatic', 'Diesel', 'Refined power for switchbacks and snow.', ARRAY['All-Terrain', 'Premium Sound', 'Full Insurance'], ARRAY['5 Seats', 'Luxury SUV', 'All-Terrain'], true, 90),
  ('seed-porsche-macan', 'porsche-macan', 'Porsche Macan', 'belbala', '/images/cars/porsche-macan.jpg', ARRAY['/images/gallery/porsche-macan/1.jpg', '/images/gallery/porsche-macan/2.jpg', '/images/gallery/porsche-macan/3.jpg', '/images/gallery/porsche-macan/4.jpg', '/images/gallery/porsche-macan/5.jpg', '/images/gallery/porsche-macan/6.jpg', '/images/gallery/porsche-macan/7.jpg'], 5, 'Automatic', 'Petrol', 'A sports car’s soul in an SUV’s body.', ARRAY['Sport Mode', 'Panoramic Roof', 'Full Insurance'], ARRAY['5 Seats', 'Performance', 'Signature'], true, 100),
  ('seed-vw-golf-r', 'vw-golf-r', 'Volkswagen Golf R', 'belbala', '/images/cars/vw-golf-r.jpg', ARRAY['/images/gallery/vw-golf-r/1.jpg', '/images/gallery/vw-golf-r/2.jpg', '/images/gallery/vw-golf-r/3.jpg', '/images/gallery/vw-golf-r/4.jpg', '/images/gallery/vw-golf-r/5.jpg'], 5, 'Automatic', 'Petrol', 'All-wheel drive thrill for the mountain roads.', ARRAY['4Motion AWD', 'Sport Seats', 'Full Insurance'], ARRAY['5 Seats', 'AWD', 'Driver’s Car'], true, 110)
ON CONFLICT ("slug") DO NOTHING;
