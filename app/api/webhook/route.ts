import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/app/libs/stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error: any) {
		return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const userId = session?.metadata?.userId;
	const productId = session?.metadata?.productId;

	if (event.type === "checkout.session.completed") {
		if (!userId || !productId)
			return new NextResponse("Webhook Error: Missing Metadata", {
				status: 400,
			});

		const user = await prisma?.user.findUnique({
			where: {
				id: userId,
			},
		});

		let productIds = [...(user!.productIds || [])];

		productIds.push(productId);

		const updatedUser = await prisma?.user.update({
			where: {
				id: userId,
			},
			data: {
				productIds,
			},
		});

		return NextResponse.json(updatedUser);
	} else {
		return new NextResponse(
			`Webhook Error: Unhandled event type ${event.type}`,
			{ status: 200 }
		);
	}
}
