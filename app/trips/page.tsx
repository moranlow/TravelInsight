import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getPurchases from "@/app/actions/getPurchases";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
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

	const purchases = await getPurchases();

	if (purchases.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No trips found"
					subtitle="Looks like you havent purchased any guides."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<TripsClient
				purchases={purchases}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default TripsPage;
