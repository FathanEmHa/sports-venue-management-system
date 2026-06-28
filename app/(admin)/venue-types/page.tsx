import VenueTypeManagement from "@/components/admin/venue-types/venue-type-management";
import { getVenueTypesService } from "@/services/admin/venue-type.service";

export default async function VenueTypesPage() {
	const venueTypes = await getVenueTypesService();

	return <VenueTypeManagement data={venueTypes} />;
}