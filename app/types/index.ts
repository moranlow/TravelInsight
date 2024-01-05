import { Listing, User, TourGuide } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
	createdAt: string;
};

export type SafeUser = Omit<
	User,
	"createdAt" | "updatedAt" | "emailVerified"
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

export type SafeGuide = Omit<TourGuide, "createdAt"> & {
	createdAt: string;
};
