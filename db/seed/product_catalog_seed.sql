-- Seed data for product_catalog
-- Run this after 007_create_product_catalog migration is applied.

-- ============================================================
-- Bedding
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('bedding', 'Hotel-White Cotton Sheet Set', '600-thread-count Egyptian cotton sheet set with deep pockets. Includes flat sheet, fitted sheet, and two pillowcases.', '{hotel,premium,luxury}', '{bedroom,hotel_room}', '{short_term_rental,hotel_operation}', 'White', 'Egyptian cotton', 'Queen', 89.00, 'USD', 'LuxLinens', 'https://example.com/products/hotel-white-sheets', 'https://placehold.co/600x400/fafafa/333?text=White+Sheet+Set', 'US'),
('bedding', 'Performance Microfiber Duvet Cover', 'Stain-resistant, machine-washable duvet cover with hidden zipper. Quick-dry fabric ideal for high-turnover rentals.', '{durable,easy_clean,rental_friendly}', '{bedroom,studio,entire_home}', '{short_term_rental,hotel_operation}', 'White', 'Performance microfiber', 'Queen', 42.00, 'USD', 'RentalReady', 'https://example.com/products/microfiber-duvet', 'https://placehold.co/600x400/f0f0f0/333?text=Duvet+Cover', 'US'),
('bedding', 'Bamboo Blend Sheet Set', 'Silky-soft bamboo-cotton blend sheets with moisture-wicking and hypoallergenic properties. Four-piece set.', '{eco_friendly,premium,nordic}', '{bedroom,living_room}', '{personal_use,short_term_rental}', 'Sage', 'Bamboo-cotton blend', 'Queen', 65.00, 'USD', 'EcoRest', 'https://example.com/products/bamboo-sheets', 'https://placehold.co/600x400/e8f0e0/333?text=Bamboo+Sheets', 'US');

-- ============================================================
-- Curtains
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('curtains', 'Sheer White Window Panels (2-Pack)', 'Floor-length sheer curtain panels that diffuse natural light beautifully. Rod-pocket top, machine washable.', '{airbnb,photo_friendly,instagram_ready}', '{bedroom,living_room,studio}', '{short_term_rental,personal_use}', 'White', 'Polyester blend', '52"W x 84"L', 38.00, 'USD', 'WindowDress', 'https://example.com/products/sheer-white-panels', 'https://placehold.co/600x400/fafafa/333?text=Sheer+Curtains', 'US'),
('curtains', 'Velvet Blackout Curtains', 'Floor-to-ceiling cotton velvet curtains with thermal blackout lining. Grommet top, energy-efficient.', '{premium,cozy,hotel_style}', '{bedroom,hotel_room}', '{short_term_rental,hotel_operation}', 'Charcoal', 'Cotton velvet', '52"W x 96"L (2 panels)', 72.00, 'USD', 'WindowDress', 'https://example.com/products/velvet-blackout', 'https://placehold.co/600x400/3a3a3a/eee?text=Blackout+Curtains', 'US'),
('curtains', 'Linen-Blend Privacy Curtains', 'Light-filtering linen-blend curtains with a relaxed drape. Perfect for creating a warm, casual atmosphere.', '{nordic,wabi_sabi,cream}', '{bedroom,living_room,studio}', '{personal_use,short_term_rental}', 'Natural linen', 'Linen-cotton blend', '52"W x 84"L', 55.00, 'USD', 'WindowDress', 'https://example.com/products/linen-curtains', 'https://placehold.co/600x400/e8dcc8/333?text=Linen+Curtains', 'US');

-- ============================================================
-- Rugs
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('rugs', 'Wool-Blend Area Rug', 'Hand-tufted wool-viscose blend rug with subtle geometric pattern. Soft underfoot, anchors the room visually.', '{premium,cozy,hotel_style}', '{bedroom,living_room,studio}', '{short_term_rental,personal_use}', 'Ivory / Grey', 'Wool-viscose blend', '5'' x 8''', 199.00, 'USD', 'FloorCraft', 'https://example.com/products/wool-area-rug', 'https://placehold.co/600x400/ddd/333?text=Wool+Rug', 'US'),
('rugs', 'Indoor/Outdoor Washable Rug', 'Flat-weave polypropylene rug rated for indoor/outdoor use. Hose-cleanable between guests, stain-resistant.', '{durable,easy_clean,rental_friendly}', '{bedroom,living_room,entire_home}', '{short_term_rental,hotel_operation}', 'Charcoal / Cream', 'Polypropylene', '5'' x 7''', 85.00, 'USD', 'FloorCraft', 'https://example.com/products/washable-rug', 'https://placehold.co/600x400/ccc/333?text=Washable+Rug', 'US'),
('rugs', 'Jute Braided Area Rug', 'Natural jute fiber braided rug with a warm, organic texture. Non-slip backing included.', '{eco_friendly,wabi_sabi,minimalist}', '{bedroom,living_room,studio}', '{personal_use}', 'Natural jute', 'Jute', '4'' x 6''', 65.00, 'USD', 'FloorCraft', 'https://example.com/products/jute-rug', 'https://placehold.co/600x400/c4a97d/333?text=Jute+Rug', 'US');

-- ============================================================
-- Lighting
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('lighting', 'Dimmable Ceramic Table Lamp', 'Glazed ceramic base with linen shade and warm dimmable LED bulb. Touch-control with three brightness levels.', '{premium,cozy,hotel_style}', '{bedroom,living_room,hotel_room}', '{short_term_rental,personal_use}', 'Matte cream', 'Ceramic / linen', '22" tall', 58.00, 'USD', 'LumeLight', 'https://example.com/products/ceramic-table-lamp', 'https://placehold.co/600x400/f5f0e8/333?text=Table+Lamp', 'US'),
('lighting', 'Flush-Mount LED Ceiling Light', 'Low-profile 3000K warm LED ceiling fixture with 50,000-hour lifespan. Dimmable, no bulb replacement needed.', '{durable,easy_clean,rental_friendly}', '{bedroom,living_room,entire_home}', '{short_term_rental,hotel_operation}', 'White / Brushed nickel', 'Metal / acrylic', '14" diameter', 42.00, 'USD', 'LumeLight', 'https://example.com/products/flush-mount-led', 'https://placehold.co/600x400/eee/333?text=Ceiling+Light', 'US'),
('lighting', 'Layered Floor Lamp with Reading Arm', 'Adjustable floor lamp with warm LED bulb and a separate articulated reading arm. Brushed nickel finish.', '{photo_friendly,instagram_ready,airbnb}', '{bedroom,living_room,studio}', '{short_term_rental,personal_use}', 'Brushed nickel / Warm wood', 'Metal', '65" tall', 79.00, 'USD', 'LumeLight', 'https://example.com/products/floor-lamp', 'https://placehold.co/600x400/ddd/333?text=Floor+Lamp', 'US');

-- ============================================================
-- Wall Art
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('wall_art', 'Abstract Canvas Triptych Set', 'Neutral-toned abstract triptych on gallery-wrapped canvas. Ready to hang with pre-installed hardware.', '{modern,airbnb,photo_friendly}', '{bedroom,living_room,hotel_room}', '{short_term_rental,hotel_operation}', 'Beige / Terracotta / Charcoal', 'Canvas / wood frame', '16"x20" each', 55.00, 'USD', 'ArtWall', 'https://example.com/products/abstract-triptych', 'https://placehold.co/600x400/e8d5b7/333?text=Triptych', 'US'),
('wall_art', 'Macrame Wall Hanging', 'Handcrafted cotton macrame wall hanging with wooden dowel. Bohemian touch for empty wall spaces.', '{wabi_sabi,cozy,budget_friendly}', '{bedroom,living_room,studio}', '{personal_use,short_term_rental}', 'Natural cotton', 'Cotton / wood', '24"W x 36"L', 32.00, 'USD', 'ArtWall', 'https://example.com/products/macrame-hanging', 'https://placehold.co/600x400/f5ecd7/333?text=Macrame', 'US');

-- ============================================================
-- Plants
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('plants', 'Faux Olive Tree in Planter', 'Realistic 5-foot faux olive tree in a minimalist terracotta-look planter. Zero maintenance required.', '{airbnb,photo_friendly,modern}', '{bedroom,living_room,studio}', '{short_term_rental,personal_use}', 'Green / Terracotta', 'Silk / plastic / ceramic pot', '5'' tall', 68.00, 'USD', 'GreenRoom', 'https://example.com/products/faux-olive-tree', 'https://placehold.co/600x400/d4e8c4/333?text=Olive+Tree', 'US'),
('plants', 'Faux Fiddle Leaf Fig', 'Tall artificial fiddle leaf fig with realistic trunk and lush leaves. UV-resistant for sunlit rooms.', '{instagram_ready,hotel_style,premium}', '{bedroom,living_room,hotel_room}', '{short_term_rental,hotel_operation}', 'Green', 'Silk / plastic', '6'' tall', 89.00, 'USD', 'GreenRoom', 'https://example.com/products/faux-fiddle-fig', 'https://placehold.co/600x400/a8d8a0/333?text=Fiddle+Fig', 'US');

-- ============================================================
-- Storage
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('storage', 'Under-Bed Storage Organizer (2-Pack)', 'Zip-top fabric storage bins with clear window. Slide under bed for extra linens or guest supplies.', '{budget_friendly,minimalist,practical}', '{bedroom,studio}', '{short_term_rental,personal_use}', 'Grey', 'Non-woven fabric', '30"x18"x6"', 24.00, 'USD', 'StoreSmart', 'https://example.com/products/under-bed-storage', 'https://placehold.co/600x400/ccc/333?text=Storage+Bins', 'US'),
('storage', 'Heavy-Duty Metal Luggage Rack', 'Foldable luggage rack with nylon straps, holds up to 100 lbs. Guest-ready design.', '{durable,rental_friendly,practical}', '{bedroom,hotel_room,entire_home}', '{short_term_rental,hotel_operation}', 'Black / Silver', 'Powder-coated steel / nylon', '27"x18"x24"', 45.00, 'USD', 'StoreSmart', 'https://example.com/products/luggage-rack', 'https://placehold.co/600x400/444/eee?text=Luggage+Rack', 'US');

-- ============================================================
-- Small Furniture
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('small_furniture', 'Solid Wood Nightstand with Drawer', 'Rubberwood nightstand with sealed finish, one drawer, and open shelf. Scratch-resistant, easy to clean.', '{durable,rental_friendly,practical}', '{bedroom,hotel_room}', '{short_term_rental,hotel_operation}', 'Walnut', 'Rubberwood', '18"W x 16"D x 24"H', 95.00, 'USD', 'FurniCo', 'https://example.com/products/wood-nightstand', 'https://placehold.co/600x400/8b6f47/eee?text=Nightstand', 'US'),
('small_furniture', 'Upholstered Storage Ottoman', 'Button-tufted ottoman with hinged lid and interior storage compartment. Doubles as seating and linen storage.', '{premium,cozy,hotel_style}', '{bedroom,living_room}', '{short_term_rental,personal_use}', 'Dusty blue', 'Linen upholstery / solid wood', '30"W x 18"D x 18"H', 110.00, 'USD', 'FurniCo', 'https://example.com/products/storage-ottoman', 'https://placehold.co/600x400/7b8fae/eee?text=Ottoman', 'US'),
('small_furniture', 'Compact Writing Desk', 'Wall-mounted fold-down desk in white oak finish. Saves floor space while providing a functional workspace.', '{modern,airbnb,business_travel_friendly}', '{bedroom,studio,hotel_room}', '{short_term_rental,personal_use}', 'White oak', 'Engineered wood / steel bracket', '32"W x 20"D', 78.00, 'USD', 'FurniCo', 'https://example.com/products/compact-desk', 'https://placehold.co/600x400/e8dcc8/333?text=Writing+Desk', 'US');

-- ============================================================
-- Decor
-- ============================================================
insert into public.product_catalog (category, name, description, style_tags, suitable_room_types, suitable_purposes, color, material, size_text, price, currency, supplier_name, product_url, image_url, country)
values
('decor', 'Velvet Throw Pillows (Set of 4)', 'Plush velvet pillows in coordinating neutral and accent colors. Feather-filled inserts included.', '{photo_friendly,premium,cozy}', '{bedroom,living_room,hotel_room}', '{short_term_rental,personal_use}', 'Cream / Sage / Charcoal', 'Velvet / feather insert', '18"x18"', 36.00, 'USD', 'DecorVibe', 'https://example.com/products/velvet-pillows', 'https://placehold.co/600x400/d4c8b0/333?text=Velvet+Pillows', 'US'),
('decor', 'Scented Soy Candle Set (3-Pack)', 'Luxury soy candles in amber glass jars. Scents: linen, vanilla, and cedarwood. 40-hour burn time each.', '{premium,cozy,hotel_style}', '{bedroom,living_room,hotel_room}', '{short_term_rental,personal_use}', 'Amber glass', 'Soy wax / glass', '8 oz each', 28.00, 'USD', 'DecorVibe', 'https://example.com/products/soy-candles', 'https://placehold.co/600x400/f5a623/fff?text=Soy+Candles', 'US'),
('decor', 'Minimalist Wooden Tray', 'Solid mango wood tray with handles. Perfect for styling nightstands or coffee stations.', '{minimalist,wabi_sabi,cozy}', '{bedroom,living_room,hotel_room}', '{short_term_rental,personal_use}', 'Natural wood', 'Mango wood', '12"x8"', 18.00, 'USD', 'DecorVibe', 'https://example.com/products/wooden-tray', 'https://placehold.co/600x400/c4956a/fff?text=Wooden+Tray', 'US'),
('decor', 'Textured Knit Throw Blanket', 'Chunky knit cotton-blend throw blanket. Ideal draped at the foot of the bed for that cozy listing photo.', '{cozy,photo_friendly,airbnb}', '{bedroom,living_room,studio}', '{short_term_rental,personal_use}', 'Oatmeal', 'Cotton-acrylic blend', '50"x70"', 28.00, 'USD', 'DecorVibe', 'https://example.com/products/knit-throw', 'https://placehold.co/600x400/e8dcc8/333?text=Knit+Throw', 'US');
