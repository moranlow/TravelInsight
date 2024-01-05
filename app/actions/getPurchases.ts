import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getPurchases() {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return [];
		}

		const purchases = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.productIds || [])],
				},
			},
		});

		const safePurchases = purchases.map((purchase) => ({
			...purchase,
			createdAt: purchase.createdAt.toString(),
		}));

		return safePurchases;
	} catch (error: any) {
		throw new Error(error);
	}
}
