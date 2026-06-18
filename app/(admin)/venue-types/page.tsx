import VenueTypeManagement from "@/components/admin/venue-types/venue-type-management";

import {
	getVenueTypes,
} from "@/api/venue-type.api";

export default async function VenueTypesPage() {
	const venueTypes =
		await getVenueTypes();

	return (
		<VenueTypeManagement
			data={venueTypes}
		/>
	);
}