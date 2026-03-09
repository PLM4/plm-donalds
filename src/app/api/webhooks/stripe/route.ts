import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe client is not initialized");
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
    throw new Error("Stripe webhook secret is not initialized");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  const signature = request.headers.get("stripe-signature");
  const text = await request.text();

  if (!signature) {
    return NextResponse.error();
  }

  const event = stripe.webhooks.constructEvent(text, signature, webhookSecret);

  const paymentSuccessful = event.type === "checkout.session.completed";
  const paymentFailed = event.type === "charge.failed"

  if (paymentSuccessful) {
    const orderId = event.data.object.metadata?.orderId;
    if (!orderId) {
      console.error("Order ID not found in webhook metadata");
      return NextResponse.json({
        received: true,
      });
    }
    const order = await db.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: "PAYMENT_CONFIRMED",
      },
      include: {
        restaurant: {
          select: {
            slug: true
          }
        }
      }
    });
    revalidatePath(`/${order.restaurant.slug}/orders`)
  } else if (paymentFailed) {
    const orderId = event.data.object.metadata?.orderId;
    if (!orderId) {
      console.error("Order ID not found in webhook metadata");
      return NextResponse.json({
        received: true,
      });
    }
    const order = await db.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: "PAYMENT_FAILED",
      },
      include: {
        restaurant: {
          select: {
            slug: true
          }
        }
      }
    });
    revalidatePath(`/${order.restaurant.slug}/orders`)
  }
  return NextResponse.json({
    received: true,
  });
}
