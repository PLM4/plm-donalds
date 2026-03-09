"use server";

import Stripe from "stripe";
import { CartProduct } from "../contexts/cart";
import { headers } from "next/headers";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cpf";
import { db } from "@/lib/prisma";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  consumptionMethod: ConsumptionMethod;
  cpf: string;
}

export const CreateStripeCheckout = async ({
  orderId,
  products,
  slug,
  consumptionMethod,
  cpf
}: CreateStripeCheckoutInput) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not defined");
  }

  const reqHeaders = await headers();

  const origin = reqHeaders.get("origin") as string;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.id),
      },
    },
  });

  const searchParams = new URLSearchParams()
  searchParams.set("cpf", removeCpfPunctuation(cpf))
  searchParams.set("consumptionMethod", consumptionMethod)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    metadata: {
      orderId: orderId,
    },
    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount: productsWithPrices.find(p => p.id === product.id)!.price * 100,
      },
      quantity: product.quantity,
    })),
  });

  return { sessionId: session.id };
};
