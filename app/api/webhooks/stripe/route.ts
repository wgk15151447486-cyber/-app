import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/payments/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      {
        error:
          "Missing STRIPE_WEBHOOK_SECRET environment variable. Set it in .env.local.",
      },
      { status: 500 }
    );
  }

  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { user_id, project_id, product_type } =
      session.metadata ?? {};

    if (!user_id || !project_id || !product_type) {
      return NextResponse.json(
        { error: "Missing required metadata (user_id, project_id, product_type)" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Idempotency check: skip if this payment was already recorded
    const { data: existing } = await supabase
      .from("payments")
      .select("id")
      .eq("provider_payment_id", session.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ received: true, status: "already_processed" });
    }

    const amount = session.amount_total != null ? session.amount_total / 100 : 0;
    const currency = session.currency ?? "usd";
    const now = new Date().toISOString();

    // Insert payment record
    const { error: insertError } = await supabase.from("payments").insert({
      user_id,
      project_id,
      provider: "stripe",
      provider_payment_id: session.id,
      product_type,
      amount,
      currency: currency.toUpperCase(),
      status: "paid",
      paid_at: now,
    });

    if (insertError) {
      return NextResponse.json(
        { error: `Failed to insert payment: ${insertError.message}` },
        { status: 500 }
      );
    }

    // Update project to paid
    await supabase
      .from("projects")
      .update({ is_paid: true, paid_at: now })
      .eq("id", project_id)
      .eq("user_id", user_id);

    return NextResponse.json({ received: true, status: "processed" });
  }

  // Acknowledge other events
  return NextResponse.json({ received: true });
}
