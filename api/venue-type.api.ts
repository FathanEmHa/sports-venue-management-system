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