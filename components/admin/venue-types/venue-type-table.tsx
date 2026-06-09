type VenueType = {
	id: number;
	name: string;
};

type Props = {
	data: VenueType[];
};

export default function VenueTypeTable({
	data,
}: Props) {
	return (
		<table className="w-full border">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
				</tr>
			</thead>

			<tbody>
				{data.map((item) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>
							{item.name}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}