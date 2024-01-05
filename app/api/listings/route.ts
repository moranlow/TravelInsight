import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();
	const {
		country,
		state,
		city,
		title,
		category,
		imageSrc,
		description,
		price,
		highlights,
		startPoint,
		information,
		tourGuide,
	} = body;

	const listing = await prisma.listing.create({
		data: {
			country: country.label,
			state: state.label,
			city: city.label,
			title,
			imageSrc,
			description,
			highlights,
			startPoint,
			category,
			information,
			price: parseInt(price, 10),
			userId: currentUser.id,
			tourGuide: {
				create: tourGuide.map((tour: any) => ({
					title: tour.tourPartTitle,
					description: tour.tourPartDescription,
					userId: currentUser.id,
				})),
			},
		},
	});

	return NextResponse.json(listing);
}
