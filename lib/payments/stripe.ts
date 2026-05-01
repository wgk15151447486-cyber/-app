import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeInstance) return stripeInstance;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY environment variable. Set it in .env.local to enable payments."
    );
  }

  stripeInstance = new Stripe(key, {
    apiVersion: "2026-04-22.dahlia",
  });

  return stripeInstance;
}
