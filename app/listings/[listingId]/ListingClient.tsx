"use client";

import { useMemo, useState } from "react";

import { SafeGuide, SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingPurchase from "@/app/components/listings/ListingPurchase";
import axios from "axios";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";
import ListingGuide from "@/app/components/listings/ListingGuide";

interface ListingClientProps {
	listing: SafeListing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
	guides?: SafeGuide[] | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
	guides,
}) => {
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const isPurchased = currentUser?.productIds.includes(listing.id);

	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category);
	}, [listing.category]);

	const onCreatePurchase = async () => {
		try {
			if (!currentUser) return loginModal.onOpen();

			setIsLoading(true);

			const response = await axios.post(`/api/listings/${listing.id}/checkout`);

			window.location.assign(response.data.url);
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container>
			<div
				className="
          max-w-screen-lg 
          mx-auto
        "
			>
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						country={listing.country}
						state={listing.state}
						city={listing.city}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div
						className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
					>
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							startpoint={listing.startPoint}
							highlights={listing.highlights}
							tourInformation={listing.information}
							locationValue={listing.city}
						/>
						<div
							className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
						>
							<ListingPurchase
								price={listing.price}
								onSubmit={onCreatePurchase}
								disabled={isLoading}
								isPurchased={isPurchased}
							/>
							{isPurchased && (
								<div
									className="
                order-first 
                mt-10 
                md:order-last 
                md:col-span-3
              "
								>
									<ListingGuide guides={guides} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
