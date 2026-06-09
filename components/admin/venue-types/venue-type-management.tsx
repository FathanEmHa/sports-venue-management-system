import VenueTypeForm from "./venue-type-form";
import VenueTypeTable from "./venue-type-table";

export default function VenueTypeManagement() {
	return (
		<div className="space-y-8">
			<VenueTypeForm />

			<VenueTypeTable
				data={[
					{
						id: 1,
						name: "Futsal",
					},
					{
						id: 2,
						name: "Basketball",
					},
				]}
			/>
		</div>
	);
}