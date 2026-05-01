import { jsPDF } from "jspdf";
import type { Project } from "@/types/project";
import type { DesignVariant } from "@/types/design";
import type { ShoppingItem } from "@/types/shopping";

interface PdfInput {
  project: Project;
  variants: DesignVariant[];
  shoppingItems: ShoppingItem[];
}

const roomTypeLabels: Record<string, string> = {
  bedroom: "Bedroom",
  living_room: "Living Room",
  studio: "Studio",
  entire_home: "Entire Home",
  hotel_room: "Hotel Room",
  other: "Other",
};

const purposeLabels: Record<string, string> = {
  personal_use: "Personal Use",
  long_term_rental: "Long-term Rental",
  short_term_rental: "Short-term Rental",
  hotel_operation: "Hotel Operation",
};

export async function generateProjectPdf(input: PdfInput): Promise<Buffer> {
  const { project, variants, shoppingItems } = input;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  function checkPageBreak(needed: number) {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  // Title
  doc.setFontSize(22);
  doc.text(project.title, margin, y);
  y += 10;

  // Subtitle
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(
    `${roomTypeLabels[project.room_type] ?? project.room_type}  •  ${purposeLabels[project.purpose] ?? project.purpose}`,
    margin,
    y
  );
  y += 12;

  // Budget line
  doc.setFontSize(11);
  doc.setTextColor(60);
  const budgetText =
    project.budget_type === "custom" &&
    project.budget_min != null &&
    project.budget_max != null
      ? `Budget: $${project.budget_min} – $${project.budget_max} ${project.currency}`
      : `Budget: ${project.budget_type}`;
  doc.text(budgetText, margin, y);
  y += 8;

  // Location
  if (project.location_city || project.location_country) {
    const location = [project.location_city, project.location_country]
      .filter(Boolean)
      .join(", ");
    doc.text(`Location: ${location}`, margin, y);
    y += 8;
  }

  // Variant images — embed the first variant's image if available
  const variantWithImage = variants.find((v) => v.image_url);
  if (variantWithImage?.image_url) {
    try {
      const imgRes = await fetch(variantWithImage.image_url);
      if (imgRes.ok) {
        const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
        const base64 = imgBuffer.toString("base64");
        const mime = imgRes.headers.get("content-type") ?? "image/png";
        const dataUri = `data:${mime};base64,${base64}`;

        checkPageBreak(80);
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = 60;
        doc.addImage(dataUri, "PNG", margin, y, imgWidth, imgHeight);
        y += imgHeight + 6;
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(variantWithImage.title, margin, y);
        y += 10;
      }
    } catch {
      // Image fetch failed — continue without it
    }
  }

  // Variants section
  checkPageBreak(20);
  y += 4;
  doc.setFontSize(16);
  doc.setTextColor(30);
  doc.text("Design Variants", margin, y);
  y += 8;

  for (const variant of variants) {
    checkPageBreak(50);

    // Variant title
    doc.setFontSize(13);
    doc.setTextColor(30);
    doc.text(variant.title, margin, y);
    y += 7;

    // Design summary (wrap text)
    if (variant.design_summary) {
      doc.setFontSize(9);
      doc.setTextColor(80);
      const lines = doc.splitTextToSize(variant.design_summary, pageWidth - margin * 2);
      for (const line of lines) {
        checkPageBreak(5);
        doc.text(line, margin, y);
        y += 4.5;
      }
      y += 2;
    }

    // Why it works
    if (variant.why_it_works) {
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(`Why it works: ${variant.why_it_works}`, margin, y, {
        maxWidth: pageWidth - margin * 2,
      });
      y += 5;
    }

    // Style tags
    if (variant.style_tags.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(`Styles: ${variant.style_tags.join(", ")}`, margin, y, {
        maxWidth: pageWidth - margin * 2,
      });
      y += 4;
    }

    y += 4;
  }

  // Shopping list section
  if (shoppingItems.length > 0) {
    checkPageBreak(30);
    y += 2;
    doc.setFontSize(16);
    doc.setTextColor(30);
    doc.text("Shopping List", margin, y);
    y += 8;

    // Table header
    doc.setFontSize(9);
    doc.setTextColor(50);
    const col1 = margin;
    const col2 = margin + 60;
    const col3 = margin + 110;
    const col4 = margin + 140;

    doc.text("Item", col1, y);
    doc.text("Category", col2, y);
    doc.text("Priority", col3, y);
    doc.text("Price", col4, y);
    y += 5;

    // Separator
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;

    for (const item of shoppingItems) {
      checkPageBreak(5);
      doc.setFontSize(8);
      doc.setTextColor(60);
      doc.text(item.name, col1, y, { maxWidth: 55 });
      doc.text(item.category, col2, y);
      doc.text(item.priority, col3, y);

      const price =
        item.price_min != null && item.price_max != null
          ? `$${item.price_min}–$${item.price_max}`
          : item.price_min != null
            ? `$${item.price_min}+`
            : "—";
      doc.text(price, col4, y);
      y += 4.5;
    }

    // Totals
    y += 2;
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    const totalMin = shoppingItems.reduce(
      (sum, item) => sum + (item.price_min ?? 0),
      0
    );
    const totalMax = shoppingItems.reduce(
      (sum, item) => sum + (item.price_max ?? 0),
      0
    );
    doc.setFontSize(9);
    doc.setTextColor(30);
    doc.text(
      `Total: $${totalMin} – $${totalMax} (${shoppingItems.length} items)`,
      margin,
      y
    );
  }

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text(
      `RoomReady AI • Export • Page ${i}/${pageCount}`,
      margin,
      doc.internal.pageSize.getHeight() - 10
    );
  }

  return Buffer.from(doc.output("arraybuffer"));
}
