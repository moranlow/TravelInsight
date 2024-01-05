import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
	listingId?: string;
}

export default async function getGuides(params: IParams) {
	try {
		const user = await getCurrentUser();
		const { listingId } = params;

		if (user?.productIds.includes(listingId!)) {
			const guides = await prisma.tourGuide.findMany({
				where: {
					listingId: listingId,
				},
				orderBy: {
					createdAt: "desc",
				},
			});

			const safeGuides = guides.map((guide) => ({
				...guide,
				createdAt: guide.createdAt.toISOString(),
			}));
			return safeGuides;
		} else {
			return null;
		}
	} catch (error: any) {
		throw new Error(error);
	}
}
