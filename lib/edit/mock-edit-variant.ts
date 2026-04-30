/**
 * Mock-edit a variant's design_summary based on the user's instruction.
 * Returns a modified design summary string. No real AI involved.
 */

const QUICK_RESPONSES: Record<string, string> = {
  "保留原来的床":
    "keep the existing bed as the focal point. Work around it with complementary furniture and decor that enhances its style while maintaining a cohesive look.",
  "换成更便宜的方案":
    "swap to more budget-friendly alternatives. Opt for affordable yet stylish items — microfiber bedding instead of cotton, polypropylene rugs instead of wool, and LED strip lights instead of statement fixtures — reducing the overall budget by approximately 30% without sacrificing aesthetic appeal.",
  "改成奶油风":
    "adopt a warm cream-toned palette throughout. Use ivory bedding, oatmeal throws, beige linen curtains, and cream ceramic accents. Layer tone-on-tone neutrals to create a soft, inviting, Pinterest-worthy aesthetic that photographs beautifully.",
  "减少装饰品":
    "strip back to essentials only. Remove excess decorative items and keep surfaces clean and uncluttered. Focus on a few high-quality statement pieces — one piece of wall art, one plant, and minimal bedside styling — for a calm, minimalist look that is easy to maintain between guests.",
  "增加拍照感":
    "maximize photo-readiness for listing platforms. Add layered warm lighting at multiple heights, a statement headboard or feature wall, crisp white bedding with accent pillows, and one Instagram-worthy vignette (styled tray with candle + small plant on nightstand). Every angle should frame well for wide-angle listing photos.",
  "更容易清洁":
    "prioritize easy-clean, durable materials throughout. Use performance microfiber bedding (stain-resistant, machine-washable), indoor/outdoor washable rugs, wipe-clean surfaces, and minimal open shelving that collects dust. Every item should survive frequent turnovers with minimal effort.",
  "更适合情侣入住":
    "optimize for couples. Add dual nightstands with matching reading lamps, a cozy throw blanket for two, warm dimmable lighting, blackout curtains for late mornings, and romantic touches like a scented candle and curated coffee station. Focus on comfort and intimacy that encourages longer stays and higher ratings.",
  "更适合商务出差":
    "optimize for business travelers. Add a dedicated workspace with a compact desk and ergonomic chair, task lighting, accessible power outlets near the bed and desk, a luggage rack, blackout curtains for jet lag recovery, and fast WiFi mentioned in the listing description. Keep the aesthetic clean and professional.",
};

export function mockEditSummary(
  currentSummary: string,
  instruction: string
): string {
  // Check for exact quick-suggestion match
  const quickResponse = QUICK_RESPONSES[instruction];
  if (quickResponse) {
    return (
      currentSummary +
      " " +
      quickResponse
    );
  }

  // Free-text instruction: weave it into a generic response
  return (
    currentSummary +
    " Additionally, based on your request to \"" +
    instruction +
    "\", we have adjusted the design to better match your preferences. " +
    "The updated approach incorporates your feedback while maintaining a cohesive and functional layout suitable for short-term rental use."
  );
}

export function buildMockPrompt(
  currentSummary: string,
  instruction: string
): string {
  return `You are an interior design AI. Given the current design summary:\n\n"${currentSummary}"\n\nApply this edit instruction: "${instruction}". Return the updated design summary.`;
}
