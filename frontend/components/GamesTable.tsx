import { useState } from "react";
import { GameRow } from "./GameRow";
import { AddEditGameForm } from "./AddEditGameForm";

interface Game {
	id: number;
	name: string;
	genre: string;
	genreId: number;
	price: number;
	releaseDate: string;
}

interface Genre {
	id: number;
	name: string;
}

interface GamesTableProps {
	games: Game[];
	genres: Genre[];
	onUpdateGame: (game: Game) => void;
	onDeleteGame: (id: number) => void;
}

export function GamesTable({
	games,
	genres,
	onUpdateGame,
	onDeleteGame,
}: GamesTableProps) {
	const [editingGame, setEditingGame] = useState<Game | null>(null);

	return (
		<div>
			<table className="min-w-full bg-white border border-gray-300 mb-4">
				<thead>
					<tr className="bg-gray-100">
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">Name</th>
						<th className="py-2 px-4 border-b">Genre</th>
						<th className="py-2 px-4 border-b">Price</th>
						<th className="py-2 px-4 border-b">Release Date</th>
						<th className="py-2 px-4 border-b">Actions</th>
					</tr>
				</thead>
				<tbody>
					{games.map((game) => (
						<GameRow
							key={game.id}
							game={game}
							onEdit={() => setEditingGame(game)}
							onDelete={onDeleteGame}
						/>
					))}
				</tbody>
			</table>
			{editingGame && (
				<AddEditGameForm
					game={editingGame}
					genres={genres}
					onSave={(updatedGame) => {
						const completeGame = { ...editingGame, ...updatedGame } as Game;
						onUpdateGame(completeGame);
						setEditingGame(null);
					}}
					onCancel={() => setEditingGame(null)}
				/>
			)}
		</div>
	);
}
