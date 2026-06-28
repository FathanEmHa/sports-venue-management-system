import api from "@/lib/axios";
import { VenueTypeInput } from "@/validators/admin/venue-type.validator";

export async function createVenueType(data: VenueTypeInput) {
	const response = await api.post("/venues/venue-types", data);

	return response.data;
}

export async function updateVenueType(id: number, data: VenueTypeInput) {
	const response = await api.put(`/venues/venue-types/${id}`, data);

	return response.data;
}

export async function deleteVenueType(id: number) {
	const response = await api.delete(`/venues/venue-types/${id}`);

	return response.data;
}
