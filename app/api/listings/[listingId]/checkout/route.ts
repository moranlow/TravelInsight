import Stripe from "stripe";
import { stripe } from "@/app/libs/stripe";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { listingId: string } }
) {
	try {
		const user = await getCurrentUser();

		if (!user) return new NextResponse("Unauthorized", { status: 401 });

		const listing = await prisma?.listing.findUnique({
			where: {
				id: params.listingId,
			},
		});

		if (!listing) return new NextResponse("Listing Not Found", { status: 404 });

		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
			{
				quantity: 1,
				price_data: {
					currency: "USD",
					product_data: {
						name: listing.title,
						description: listing.description,
					},
					unit_amount: Math.round(listing.price * 100),
				},
			},
		];

		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}?success=1`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}?cancel=1`,
			metadata: {
				productId: listing.id,
				userId: user.id,
			},
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.log("[LISTING_ID_CHECKOUT]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
