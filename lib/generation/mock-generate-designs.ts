import type { SupabaseClient } from "@supabase/supabase-js";

interface MockContext {
  supabase: SupabaseClient;
  projectId: string;
  userId: string;
  jobId: string;
}

export async function mockGenerateDesigns(ctx: MockContext) {
  const { supabase, projectId, userId, jobId } = ctx;

  // Remove old generation data for this project so repeated clicks don't create duplicates.
  await supabase.from("shopping_items").delete().eq("project_id", projectId);
  await supabase.from("design_variants").delete().eq("project_id", projectId);
  await supabase.from("room_analyses").delete().eq("project_id", projectId);

  // --- 1. Room Analysis ---
  const { data: analysis } = await supabase
    .from("room_analyses")
    .insert({
      project_id: projectId,
      user_id: userId,
      room_summary:
        "A well-proportioned room with good natural light. The existing layout leaves significant opportunity for styling improvements that will elevate the space for short-term rental guests.",
      detected_room_type: "bedroom",
      detected_existing_items: [
        {
          name: "Bed frame",
          category: "furniture",
          confidence: 0.95,
          position: "center",
          condition: "good",
        },
        {
          name: "Window",
          category: "architectural",
          confidence: 0.98,
          position: "left wall",
          condition: "good",
        },
        {
          name: "Empty wall space",
          category: "spatial",
          confidence: 0.9,
          position: "right wall",
          condition: "bare",
        },
      ],
      detected_problems: [
        {
          issue: "Bare walls",
          severity: "medium",
          description:
            "Empty walls make the room feel unfinished in listing photos.",
        },
        {
          issue: "Single light source",
          severity: "medium",
          description:
            "Only overhead lighting — adding layered lighting will dramatically improve photo quality and guest comfort.",
        },
        {
          issue: "No decorative accents",
          severity: "low",
          description:
            "The room lacks personality. A few curated decor items will help it stand out in search results.",
        },
      ],
      lighting_analysis:
        "Single overhead ceiling light. Recommend adding at least two additional light sources (bedside lamp + floor lamp or LED strip) for layered, photo-friendly lighting.",
      color_analysis:
        "Neutral walls provide a versatile base. Recommend warm accent colors through bedding, curtains, and decor to create a welcoming atmosphere that photographs well.",
      layout_analysis:
        "Current layout is functional but could benefit from better-defined zones. Consider adding a small seating or luggage area if space permits, and ensure the bed is the focal point from the entry.",
      improvement_opportunities: [
        {
          area: "Lighting",
          suggestion:
            "Add layered lighting: bedside table lamp, floor lamp, and warm LED strip behind headboard.",
          impact: "high",
        },
        {
          area: "Wall decor",
          suggestion:
            "Hang art above bed and on facing wall to add visual interest for photos.",
          impact: "high",
        },
        {
          area: "Bedding",
          suggestion:
            "Upgrade to crisp white bedding with a few accent pillows for a hotel-quality look.",
          impact: "high",
        },
        {
          area: "Window treatment",
          suggestion:
            "Add curtains to frame the window and soften natural light for better photos.",
          impact: "medium",
        },
      ],
    })
    .select("id")
    .single();

  // --- 2. Design Variants ---

  const variants = [
    {
      variant_type: "ai_recommended" as const,
      title: "Photo-Friendly Airbnb Style",
      subtitle: "Designed to wow in listing photos",
      design_summary:
        "A photogenic setup optimized for Airbnb listing photography. Layered lighting, accent wall art, coordinated bedding and curtains, and Instagram-worthy vignettes that help your listing stand out in search results and justify higher nightly rates.",
      why_it_works:
        "Listings with professional-looking photos consistently earn higher click-through rates and more bookings. Every element is chosen to photograph beautifully across different lighting conditions, creating a cohesive look that guests find irresistible.",
      style_tags: ["airbnb", "photo_friendly", "modern", "instagram_ready"],
      estimated_budget_min: 600,
      estimated_budget_max: 1500,
      currency: "USD",
      difficulty_level: "medium",
      maintenance_level: "Medium — washable fabrics, wipe-clean surfaces",
      best_for: [
        "Airbnb hosts",
        "Listing photo optimization",
        "Modern aesthetic",
        "Mid-range to premium listings",
      ],
      image_url: "https://placehold.co/600x400/1a1a2e/e0e0e0?text=Photo-Friendly+Style",
      generation_status: "completed" as const,
      is_locked: true,
      shopping_items: [
        {
          category: "curtains" as const,
          name: "Sheer White Curtain Panels (Set of 2)",
          description:
            "Floor-length sheer panels that diffuse natural light beautifully for photos.",
          reason:
            "Soft, diffused light eliminates harsh shadows in listing photos.",
          recommended_size: '52"W x 84"L',
          recommended_color: "White",
          material: "Polyester blend",
          quantity: 1,
          price_min: 35,
          price_max: 60,
          priority: "essential" as const,
        },
        {
          category: "lighting" as const,
          name: "Layered Floor Lamp with Reading Light",
          description:
            "Adjustable floor lamp with warm LED bulb and separate reading arm.",
          reason:
            "Creates depth and warmth in photos; reading light adds functionality guests appreciate.",
          recommended_size: '65" tall',
          recommended_color: "Brushed nickel / warm wood",
          quantity: 1,
          price_min: 60,
          price_max: 100,
          priority: "essential" as const,
        },
        {
          category: "wall_art" as const,
          name: "Abstract Canvas Wall Art (Set of 3)",
          description:
            "Neutral-toned abstract triptych that adds visual interest without overwhelming the room.",
          reason:
            "Art above the bed is a focal point in listing photos and adds a designed feel.",
          recommended_size: '16"x20" each',
          recommended_color: "Beige / terracotta / charcoal",
          quantity: 1,
          price_min: 45,
          price_max: 80,
          priority: "recommended" as const,
        },
        {
          category: "plants" as const,
          name: "Faux Olive Tree in Decorative Pot",
          description:
            "Realistic 5-foot faux olive tree in a minimalist planter.",
          reason:
            "Greenery adds life to photos without the maintenance of real plants.",
          recommended_size: '5\' tall',
          recommended_color: "Green / terracotta pot",
          quantity: 1,
          price_min: 50,
          price_max: 90,
          priority: "recommended" as const,
        },
        {
          category: "decor" as const,
          name: "Velvet Throw Pillows (Set of 4)",
          description:
            "Plush velvet pillows in coordinating neutral and accent colors.",
          reason:
            "Pillows add texture and a premium feel to listing photos; easily swapped for seasonal refreshes.",
          recommended_size: '18"x18"',
          recommended_color: "Cream / sage / charcoal",
          material: "Velvet with feather insert",
          quantity: 1,
          price_min: 30,
          price_max: 50,
          priority: "recommended" as const,
        },
        {
          category: "decor" as const,
          name: "Decorative Tray for Nightstand",
          description:
            "Minimalist wooden tray to style with a candle and small book for photo vignettes.",
          reason:
            "Styled surfaces photograph beautifully and signal attention to detail.",
          recommended_size: '12"x8"',
          recommended_color: "Walnut",
          material: "Solid wood",
          quantity: 1,
          price_min: 15,
          price_max: 25,
          priority: "optional" as const,
        },
      ],
    },
    {
      variant_type: "alternative_a" as const,
      title: "Low-Budget Refresh",
      subtitle: "Affordable updates with maximum impact",
      design_summary:
        "A budget-conscious refresh focusing on high-impact, low-cost changes. Swap out bedding, add accent lighting, and introduce a few statement decor pieces to transform the space without major investment — ideal for hosts testing the waters or refreshing between seasons.",
      why_it_works:
        "Small changes like fresh bedding, curated lighting, and strategic decor can dramatically shift how a room feels while keeping costs under control. Guests notice the details, not the price tags.",
      style_tags: ["minimalist", "cozy", "budget_friendly"],
      estimated_budget_min: 300,
      estimated_budget_max: 800,
      currency: "USD",
      difficulty_level: "easy",
      maintenance_level: "Low — all items are washable and replaceable",
      best_for: [
        "Budget-conscious hosts",
        "Quick room refresh",
        "First-time hosts",
        "Seasonal updates",
      ],
      image_url: "https://placehold.co/600x400/2d4a3e/e0e0e0?text=Low-Budget+Refresh",
      generation_status: "completed" as const,
      is_locked: true,
      shopping_items: [
        {
          category: "bedding" as const,
          name: "White Cotton Duvet Cover Set",
          description:
            "Crisp white duvet cover with envelope closure, includes two pillow shams.",
          reason:
            "White bedding is the #1 budget upgrade — it reads as clean, hotel-quality in photos.",
          recommended_size: "Queen",
          recommended_color: "White",
          material: "100% cotton percale",
          quantity: 1,
          price_min: 30,
          price_max: 60,
          priority: "essential" as const,
        },
        {
          category: "lighting" as const,
          name: "Warm LED Strip Light",
          description:
            "Adhesive-backed warm white LED strip for indirect ambient lighting behind headboard.",
          reason:
            "Indirect lighting adds a premium glow for under $25 — huge photo impact per dollar.",
          recommended_size: '10 ft length',
          recommended_color: "Warm white (2700K)",
          quantity: 1,
          price_min: 12,
          price_max: 22,
          priority: "essential" as const,
        },
        {
          category: "decor" as const,
          name: "Textured Throw Blanket",
          description:
            "Chunky knit or woven throw blanket to drape at the foot of the bed.",
          reason:
            "A textured throw adds coziness in photos and is a highly mentioned amenity in guest reviews.",
          recommended_size: '50"x70"',
          recommended_color: "Oatmeal or light grey",
          material: "Cotton / acrylic blend",
          quantity: 1,
          price_min: 20,
          price_max: 35,
          priority: "recommended" as const,
        },
        {
          category: "wall_art" as const,
          name: "Macrame Wall Hanging",
          description:
            "Handmade-style macrame wall hanging for a boho touch above bed or on an empty wall.",
          reason:
            "Fills empty wall space with texture at a fraction of framed art cost.",
          recommended_size: '24"W x 36"L',
          recommended_color: "Natural cotton",
          quantity: 1,
          price_min: 25,
          price_max: 40,
          priority: "recommended" as const,
        },
        {
          category: "storage" as const,
          name: "Under-Bed Storage Organizer (Set of 2)",
          description:
            "Zip-top fabric storage bins that slide under the bed for extra linens or guest supplies.",
          reason:
            "Keeps the room clutter-free for photos and provides practical storage between guests.",
          recommended_size: '30"x18"x6"',
          recommended_color: "Grey",
          material: "Non-woven fabric",
          quantity: 1,
          price_min: 20,
          price_max: 30,
          priority: "optional" as const,
        },
        {
          category: "decor" as const,
          name: "Decorative Throw Pillow Covers (Set of 4)",
          description:
            "Coordinated cotton-linen pillow covers with hidden zipper, inserts sold separately.",
          reason:
            "Swapping pillow covers is the cheapest way to change a room's color scheme.",
          recommended_size: '18"x18"',
          recommended_color: "Linen / terracotta / olive mix",
          material: "Cotton-linen blend",
          quantity: 1,
          price_min: 12,
          price_max: 20,
          priority: "essential" as const,
        },
      ],
    },
    {
      variant_type: "alternative_b" as const,
      title: "Cozy Premium Stay",
      subtitle: "Warm, inviting luxury for discerning guests",
      design_summary:
        "A cozy yet elevated design featuring premium textures and warm lighting. Layered rugs, high-quality bedding, soft curtains, and carefully chosen decor create a space that feels like a boutique hotel — perfect for hosts targeting couples and business travelers willing to pay a premium.",
      why_it_works:
        "Premium touches signal quality to guests and justify higher nightly rates. The warm, layered aesthetic appeals to couples and business travelers looking for comfort and willing to pay more for a memorable stay.",
      style_tags: ["premium", "cozy", "hotel_style", "warm"],
      estimated_budget_min: 1000,
      estimated_budget_max: 2500,
      currency: "USD",
      difficulty_level: "medium",
      maintenance_level: "Medium-High — premium materials need careful cleaning",
      best_for: [
        "Couples",
        "Business travelers",
        "Premium listings",
        "Boutique hotel feel",
      ],
      image_url: "https://placehold.co/600x400/4a2c2a/e0e0e0?text=Cozy+Premium+Stay",
      generation_status: "completed" as const,
      is_locked: true,
      shopping_items: [
        {
          category: "bedding" as const,
          name: "Egyptian Cotton Sheet Set",
          description:
            "600-thread-count Egyptian cotton sheet set with deep pockets, includes flat sheet, fitted sheet, and two pillowcases.",
          reason:
            "Luxury sheets are the #1 amenity that makes guests mention comfort in reviews.",
          recommended_size: "Queen",
          recommended_color: "Ivory",
          material: "100% Egyptian cotton",
          quantity: 1,
          price_min: 80,
          price_max: 150,
          priority: "essential" as const,
        },
        {
          category: "rugs" as const,
          name: "Wool Blend Area Rug",
          description:
            "Hand-tufted wool-blend rug with subtle pattern, placed under the bed extending toward the room center.",
          reason:
            "A quality rug anchors the room visually and feels luxurious underfoot — guests notice immediately.",
          recommended_size: '5\'x8\'',
          recommended_color: "Ivory / grey geometric",
          material: "Wool / viscose blend",
          quantity: 1,
          price_min: 150,
          price_max: 300,
          priority: "essential" as const,
        },
        {
          category: "lighting" as const,
          name: "Dimmable Ceramic Table Lamp",
          description:
            "Glazed ceramic base table lamp with linen shade and dimmable warm LED bulb.",
          reason:
            "Dimmable bedside lighting lets guests set the mood — a premium hotel touch.",
          recommended_size: '22" tall',
          recommended_color: "Matte cream / oatmeal linen shade",
          material: "Ceramic / linen",
          quantity: 2,
          price_min: 45,
          price_max: 80,
          priority: "recommended" as const,
        },
        {
          category: "curtains" as const,
          name: "Velvet Blackout Curtains",
          description:
            "Floor-to-ceiling velvet curtains with thermal blackout lining and grommet top.",
          reason:
            "Blackout curtains are a top-requested amenity for guest comfort and sleep quality.",
          recommended_size: '52"W x 96"L (2 panels)',
          recommended_color: "Charcoal or warm taupe",
          material: "Cotton velvet with thermal lining",
          quantity: 1,
          price_min: 60,
          price_max: 120,
          priority: "essential" as const,
        },
        {
          category: "decor" as const,
          name: "Scented Soy Candle Set (Set of 3)",
          description:
            "Luxury soy candles in amber glass jars — linen, vanilla, and cedarwood scents.",
          reason:
            "A subtle signature scent creates a memorable sensory experience that guests associate with quality.",
          recommended_size: '8 oz each',
          recommended_color: "Amber glass",
          material: "Soy wax",
          quantity: 1,
          price_min: 25,
          price_max: 45,
          priority: "optional" as const,
        },
        {
          category: "small_furniture" as const,
          name: "Upholstered Storage Ottoman",
          description:
            "Button-tufted ottoman with hinged lid and interior storage compartment for extra linens.",
          reason:
            "Adds seating and hidden storage while enhancing the premium look at the foot of the bed.",
          recommended_size: '30"W x 18"D x 18"H',
          recommended_color: "Dusty blue or charcoal",
          material: "Linen upholstery / solid wood frame",
          quantity: 1,
          price_min: 80,
          price_max: 150,
          priority: "recommended" as const,
        },
      ],
    },
    {
      variant_type: "alternative_a" as const,
      title: "Durable & Easy-Clean Setup",
      subtitle: "Built for high-turnover rental operation",
      design_summary:
        "A practical, durable setup designed for hosts managing frequent turnovers. Stain-resistant fabrics, easy-to-clean surfaces, solid wood furniture, and machine-washable everything. Every piece is selected to withstand heavy use while still looking put-together in listing photos.",
      why_it_works:
        "High-turnover rentals need furnishings that survive frequent use and are quick to clean between guests. Durable doesn't mean ugly — these pieces are selected for both resilience and a clean, modern aesthetic that guests appreciate.",
      style_tags: ["durable", "easy_clean", "rental_friendly", "practical"],
      estimated_budget_min: 800,
      estimated_budget_max: 2000,
      currency: "USD",
      difficulty_level: "easy",
      maintenance_level: "Very low — everything machine-washable or wipe-clean",
      best_for: [
        "High-turnover rentals",
        "Property managers",
        "Practical hosts",
        "Pet-friendly listings",
      ],
      image_url: "https://placehold.co/600x400/3a4a5a/e0e0e0?text=Durable+Setup",
      generation_status: "completed" as const,
      is_locked: true,
      shopping_items: [
        {
          category: "bedding" as const,
          name: "Stain-Resistant Microfiber Duvet Cover",
          description:
            "Performance microfiber duvet cover with stain-resistant coating, machine washable and quick-dry.",
          reason:
            "Handles spills and frequent washing without fading — essential for high turnover.",
          recommended_size: "Queen",
          recommended_color: "White",
          material: "Performance microfiber",
          quantity: 2,
          price_min: 35,
          price_max: 55,
          priority: "essential" as const,
        },
        {
          category: "rugs" as const,
          name: "Indoor/Outdoor Washable Area Rug",
          description:
            "Flat-weave polypropylene rug rated for indoor/outdoor use — hose it down between guests if needed.",
          reason:
            "Can be deep-cleaned in minutes, surviving mud, spills, and pet accidents.",
          recommended_size: '5\'x7\'',
          recommended_color: "Charcoal / cream pattern",
          material: "Polypropylene",
          quantity: 1,
          price_min: 60,
          price_max: 120,
          priority: "essential" as const,
        },
        {
          category: "storage" as const,
          name: "Heavy-Duty Metal Luggage Rack",
          description:
            "Foldable luggage rack with nylon straps, holds up to 100 lbs.",
          reason:
            "Guests use luggage racks instead of beds/sofas, reducing wear on soft furnishings.",
          recommended_size: '27"x18"x24"',
          recommended_color: "Black / silver",
          material: "Powder-coated steel",
          quantity: 1,
          price_min: 35,
          price_max: 60,
          priority: "recommended" as const,
        },
        {
          category: "lighting" as const,
          name: "Flush Mount LED Ceiling Light",
          description:
            "Low-profile LED ceiling fixture with 3000K warm light, dimmable, 50,000-hour lifespan.",
          reason:
            "No bulbs to replace, no dust-trapping shades — set and forget for years.",
          recommended_size: '14" diameter',
          recommended_color: "White / brushed nickel",
          quantity: 1,
          price_min: 30,
          price_max: 50,
          priority: "essential" as const,
        },
        {
          category: "small_furniture" as const,
          name: "Solid Wood Nightstand with Drawer",
          description:
            "Rubberwood nightstand with sealed finish, one drawer, and open shelf — withstands scratches and cleans easily.",
          reason:
            "Solid wood survives years of guest use while laminate alternatives chip and peel.",
          recommended_size: '18"W x 16"D x 24"H',
          recommended_color: "Walnut or natural finish",
          material: "Rubberwood with polyurethane seal",
          quantity: 2,
          price_min: 70,
          price_max: 130,
          priority: "recommended" as const,
        },
        {
          category: "decor" as const,
          name: "Machine-Washable Throw Pillow Covers",
          description:
            "Performance fabric pillow covers with hidden zipper — bleach-safe and dryer-friendly.",
          reason:
            "Guests will stain pillows. These come clean every time without replacement.",
          recommended_size: '18"x18"',
          recommended_color: "Charcoal / navy mix",
          material: "Solution-dyed acrylic",
          quantity: 1,
          price_min: 15,
          price_max: 25,
          priority: "recommended" as const,
        },
      ],
    },
  ];

  const variantIds: string[] = [];

  for (const { shopping_items, ...variant } of variants) {
    const { data: created } = await supabase
      .from("design_variants")
      .insert({
        ...variant,
        project_id: projectId,
        user_id: userId,
      })
      .select("id")
      .single();

    if (!created) continue;
    variantIds.push(created.id);

    // Insert shopping items for this variant
    await supabase.from("shopping_items").insert(
      shopping_items.map((item) => ({
        ...item,
        design_variant_id: created.id,
        project_id: projectId,
        user_id: userId,
      }))
    );
  }

  // --- 3. Update project status ---
  await supabase
    .from("projects")
    .update({ status: "completed", updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", userId);

  // --- 4. Mark generation job as completed ---
  await supabase
    .from("generation_jobs")
    .update({
      status: "completed",
      progress: 100,
      completed_at: new Date().toISOString(),
      output_payload: {
        room_analysis_id: analysis?.id,
        variant_count: variantIds.length,
        variant_ids: variantIds,
        total_shopping_items: variants.reduce(
          (sum, v) => sum + v.shopping_items.length,
          0
        ),
      },
    })
    .eq("id", jobId);

  return { variantIds, analysisId: analysis?.id };
}
