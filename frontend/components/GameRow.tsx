interface Game {
	id: number;
	name: string;
	genre: string;
	genreId: number;
	price: number;
	releaseDate: string;
}

interface GameRowProps {
	game: Game;
	onEdit: () => void;
	onDelete: (id: number) => void;
}

export function GameRow({ game, onEdit, onDelete }: GameRowProps) {
	return (
		<tr className="hover:bg-gray-50">
			<td className="py-2 px-4 border-b">{game.id}</td>
			<td className="py-2 px-4 border-b">{game.name}</td>
			<td className="py-2 px-4 border-b">{game.genre}</td>
			<td className="py-2 px-4 border-b">${game.price.toFixed(2)}</td>
			<td className="py-2 px-4 border-b">{game.releaseDate}</td>
			<td className="py-2 px-4 border-b">
				<button
					className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
					onClick={onEdit}
				>
					Edit
				</button>
				<button
					className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
					onClick={() => onDelete(game.id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}
