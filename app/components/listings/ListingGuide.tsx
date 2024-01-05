"use client";

import { SafeGuide } from "@/app/types";
import Heading from "../Heading";

interface ListingGuideProps {
	guides: SafeGuide[] | null | undefined;
}

const ListingGuide: React.FC<ListingGuideProps> = ({ guides }) => {
	return (
		<div className="flex flex-col gap-5">
			<Heading title="Tour Guide" />
			{guides?.map((guide) => (
				<Heading
					key={guide.id}
					title={guide.title}
					subtitle={guide.description}
				/>
			))}
		</div>
	);
};

export default ListingGuide;
