import api from "@/lib/axios";

export async function venueType(
	data: VenueTypeInput
) {
	const response =
		await api.post(
			"/venues/venue-types",
			data
		);

	return response.data;
}

export async function getVenueTypes() {
	const response =
		await api.get(
			"/venues/venue-types"
		);

	return response.data.data;
}