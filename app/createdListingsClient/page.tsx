import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import CreatedListingsClient from "../createdListings/CreatedListingsClient";
import getCreatedListings from "../actions/getCreatedListings";

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
