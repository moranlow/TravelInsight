"use client";

import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface CreatedLisitngsClientProps {
	createdListings: SafeListing[];
	currentUser?: SafeUser | null;
}

const TripsClient: React.FC<CreatedLisitngsClientProps> = ({
	createdListings,
	currentUser,
}) => {
	const router = useRouter();

	return (
		<Container>
			<Heading
				title="Created Listings"
				subtitle="Keep it up!"
			/>
			<div
				className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
			>
				{createdListings.map((createdListing: any) => (
					<ListingCard
						key={createdListing.id}
						data={createdListing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default TripsClient;
