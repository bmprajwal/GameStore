"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { GamesTable } from "@/components/GamesTable";
import { AddEditGameForm } from "@/components/AddEditGameForm";

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

export default function GamesPage() {
	const [games, setGames] = useState<Game[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const [gamesResponse, genresResponse] = await Promise.all([
					axios.get("http://localhost:5002/games"),
					axios.get("http://localhost:5002/genres"),
				]);
				setGames(gamesResponse.data);
				setGenres(genresResponse.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError("Failed to load data. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const addGame = async (newGame: Omit<Game, "id" | "genre">) => {
		try {
			const response = await axios.post(
				"http://localhost:5002/games",
				newGame
			);
			const addedGame = response.data;
			setGames([
				...games,
				{
					...addedGame,
					genre:
						genres.find((g) => g.id === addedGame.genreId)?.name ||
						"Unknown",
				},
			]);
		} catch (error) {
			console.error("Error adding game:", error);
			setError("Failed to add game. Please try again.");
		}
	};

	const updateGame = async (updatedGame: Game) => {
		try {
			const response = await axios.put(
				`http://localhost:5002/games/${updatedGame.id}`,
				{
					name: updatedGame.name,
					genreId: updatedGame.genreId,
					price: updatedGame.price,
					releaseDate: updatedGame.releaseDate,
				}
			);
			const updated = response.data;
			setGames(
				games.map((game) =>
					game.id === updated.id
						? {
								...updated,
								genre:
									genres.find((g) => g.id === updated.genreId)
										?.name || "Unknown",
						  }
						: game
				)
			);
		} catch (error) {
			console.error("Error updating game:", error);
			setError("Failed to update game. Please try again.");
		}
	};

	const deleteGame = async (id: number) => {
		try {
			await axios.delete(`http://localhost:5002/games/${id}`);
			setGames(games.filter((game) => game.id !== id));
		} catch (error) {
			console.error("Error deleting game:", error);
			setError("Failed to delete game. Please try again.");
		}
	};

	if (isLoading) return <div className="text-center mt-8">Loading...</div>;
	if (error)
		return <div className="text-center mt-8 text-red-500">{error}</div>;

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<h1 className="text-2xl font-bold mb-4">Games Store</h1>
			<GamesTable
				games={games}
				genres={genres}
				onUpdateGame={updateGame}
				onDeleteGame={deleteGame}
			/>
			<AddEditGameForm genres={genres} onSave={addGame} />
		</div>
	);
}
