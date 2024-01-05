import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getCreatedListings() {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return [];
		}

		if (!currentUser.creator) {
			return [];
		}

		const createdListings = await prisma.listing.findMany({
			where: {
				userId: currentUser.id,
			},
		});

		const safePurchases = createdListings.map((createdListing) => ({
			...createdListing,
			createdAt: createdListing.createdAt.toString(),
		}));

		return safePurchases;
	} catch (error: any) {
		throw new Error(error);
	}
}
