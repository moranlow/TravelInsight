"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingCardProps {
	data: SafeListing;
	currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
	const router = useRouter();
	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div
					className="
                aspect-square 
                w-full 
                relative 
                overflow-hidden 
                rounded-xl
              "
				>
					<Image
						fill
						className="
                  object-cover 
                  h-full 
                  w-full 
                  group-hover:scale-110 
                  transition
                "
						src={data.imageSrc}
						alt="Listing"
					/>
					<div
						className="
                absolute
                top-3
                right-3
              "
					>
						<HeartButton
							listingId={data.id}
							currentUser={currentUser}
						/>
					</div>
				</div>
				<div className="font-semibold text-xl">{data.title}</div>
				<div className="font-semibold text-lg">
					{data.country}, {data.city}, {data.state}
				</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {data.price}</div>
				</div>
			</div>
		</div>
	);
};

export default ListingCard;
