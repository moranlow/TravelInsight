// @ts-nocheck
"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import useLocation from "@/app/hooks/useLocation";

const Map = dynamic(() => import("../Map"), {
	ssr: false,
});

interface ListingInfoProps {
	user: SafeUser;
	description: string;
	highlights: string;
	startpoint: string;
	tourInformation: string;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
	locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	user,
	description,
	startpoint,
	highlights,
	tourInformation,
	category,
	locationValue,
}) => {
	const { getCoordinatesByValue } = useLocation();
	const coordinates = getCoordinatesByValue(locationValue);
	const defaultPosition = [51.505, -0.09];
	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div
					className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
				>
					<div>Created by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category?.label}
					description={category?.description}
				/>
			)}
			<hr />
			<div
				className="
      text-xl text-neutral-800 font-bold"
			>
				Description
			</div>
			<div
				className="
      text-lg font-light text-neutral-500"
			>
				{description}
			</div>
			<hr />
			<div
				className="
      text-xl text-neutral-800 font-bold"
			>
				Start Point
			</div>
			<div
				className="
      text-lg font-light text-neutral-500"
			>
				{startpoint}
			</div>
			<hr />
			<div
				className="
      text-xl text-neutral-800 font-bold"
			>
				Highlights
			</div>
			<div
				className="
      text-lg font-light text-neutral-500"
			>
				{highlights}
			</div>
			<hr />
			<div
				className="
      text-xl text-neutral-800 font-bold"
			>
				Tour Information
			</div>
			<div
				className="
      text-lg font-light text-neutral-500"
			>
				{tourInformation}
			</div>
			<hr />
			<Map center={coordinates ? coordinates : defaultPosition} />
		</div>
	);
};

export default ListingInfo;
