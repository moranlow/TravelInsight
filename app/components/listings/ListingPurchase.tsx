"use client";

import Button from "../Button";

interface ListingReservationProps {
	price: number;
	onSubmit: () => void;
	disabled?: boolean;
	isPurchased: boolean | undefined;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
	price,
	onSubmit,
	disabled,
	isPurchased,
}) => {
	return (
		<div
			className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
		>
			<div
				className="
      flex flex-row items-center gap-1 p-4"
			>
				<div className="text-2xl font-semibold">$ {price}</div>
			</div>
			<hr />
			<div className="p-4">
				<Button
					disabled={isPurchased || disabled}
					label={isPurchased ? "Purchased" : "Purchase"}
					onClick={onSubmit}
				/>
			</div>
		</div>
	);
};

export default ListingReservation;
