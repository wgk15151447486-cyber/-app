import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProject } from "@/lib/projects/get-project";
import { getStripe } from "@/lib/payments/stripe";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { projectId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { projectId } = body;
  if (!projectId || typeof projectId !== "string") {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 }
    );
  }

  // Verify project ownership
  let project;
  try {
    project = await getProject(projectId);
  } catch {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  // Already paid
  if (project.is_paid) {
    return NextResponse.json(
      { error: "This project is already unlocked." },
      { status: 400 }
    );
  }

  const priceId = process.env.STRIPE_SINGLE_PROJECT_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          "Missing STRIPE_SINGLE_PROJECT_PRICE_ID environment variable. Set it in .env.local to enable payments.",
      },
      { status: 500 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user.id,
      project_id: projectId,
      product_type: "single_project_unlock",
    },
    success_url: `${appUrl}/projects/${projectId}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/projects/${projectId}/payment-cancelled`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
