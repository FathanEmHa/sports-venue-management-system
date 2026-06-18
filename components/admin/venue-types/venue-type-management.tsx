import VenueTypeForm from "./venue-type-form";
import VenueTypeTable from "./venue-type-table";

type VenueType = {
	id: number;
	name: string;
};

type Props = {
	data: VenueType[];
};

export default function VenueTypeManagement({
	data,
}: Props) {
	return (
		<div className="space-y-6">
			<VenueTypeForm />

			<VenueTypeTable
				data={data}
			/>
		</div>
	);
}