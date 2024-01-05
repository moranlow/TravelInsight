import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";

import getCreatedListings from "../actions/getCreatedListings";
import CreatedListingsClient from "./CreatedListingsClient";

const CreatedToursPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState
					title="Unauthorized"
					subtitle="Please login"
				/>
			</ClientOnly>
		);
	}

	const createdListings = await getCreatedListings();

	if (createdListings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="You don't have any Guide!"
					subtitle="Looks like you havent created any guides."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<CreatedListingsClient
				createdListings={createdListings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default CreatedToursPage;
