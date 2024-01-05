import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
	userId?: string;
	country?: string;
	category?: string;
	price?: number;
}

export default async function getListings(params: IListingsParams) {
	try {
		const { userId, country, category, price } = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (category) {
			query.category = category;
		}

		if (country) {
			query.country = country;
		}

		if (price) {
			query.price = {
				lte: +price,
			};
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: "desc",
			},
		});

		const safeListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));

		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
}
