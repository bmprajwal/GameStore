"use client";

import { useState } from "react";

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

interface AddEditGameFormProps {
	game?: Game;
	genres: Genre[];
	onSave: (game: Omit<Game, "id" | "genre">) => void;
	onCancel?: () => void;
}

export function AddEditGameForm({
	game,
	genres,
	onSave,
	onCancel,
}: AddEditGameFormProps) {
	const [formData, setFormData] = useState<Omit<Game, "id" | "genre">>({
		name: game?.name || "",
		genreId: game?.genreId || genres[0]?.id || 0,
		price: game?.price || 0,
		releaseDate: game?.releaseDate || "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		if (!game) {
			setFormData({
				name: "",
				genreId: genres[0]?.id || 0,
				price: 0,
				releaseDate: "",
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg my-5 shadow-md"
		>
			<h2 className="text-xl font-semibold mb-4">
				{game ? "Edit Game" : "Add New Game"}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<input
					className="border rounded px-3 py-2"
					placeholder="Name"
					value={formData.name}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
					required
				/>
				<select
					className="border rounded px-3 py-2"
					value={formData.genreId}
					onChange={(e) =>
						setFormData({
							...formData,
							genreId: parseInt(e.target.value),
						})
					}
					required
				>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.id}>
							{genre.name}
						</option>
					))}
				</select>
				<input
					className="border rounded px-3 py-2"
					type="number"
					step="0.01"
					placeholder="Price"
					value={formData.price}
					onChange={(e) =>
						setFormData({
							...formData,
							price: parseFloat(e.target.value),
						})
					}
					required
				/>
				<input
					className="border rounded px-3 py-2"
					type="date"
					placeholder="Release Date"
					value={formData.releaseDate}
					onChange={(e) =>
						setFormData({
							...formData,
							releaseDate: e.target.value,
						})
					}
					required
				/>
			</div>
			<div className="mt-4">
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
				>
					{game ? "Update Game" : "Add Game"}
				</button>
				{onCancel && (
					<button
						type="button"
						className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
						onClick={onCancel}
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}
