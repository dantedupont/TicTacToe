import { Link, useLoaderData } from "react-router"
import type { Game } from "../game/game"
import { useState, useEffect } from "react"
import { TicTacToeApiClient } from '../api'

const api = new TicTacToeApiClient

const GameLobby = () => {
    const { games: initialGames } = useLoaderData<{ games: Game[]}>()
    const [games, setGames] = useState<Game[]>(initialGames)

    useEffect(() => {
        setGames(initialGames)
    }, [initialGames])

    return(
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Game Lobby</h2>
                <Link 
                    to={'/game/menu'}
                    className="block w-full bg-neutral-400 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-150 ease-in-out"
                >
                    Start New Game
                </Link>
                {games.map(game => (
                    <div key={game.id}>
                            <Link 
                                to={`/game/${game.id}`}
                                className="block p-4 hover:bg-gray-50"
                            >
                                <div className="flex justify-center items-center">
                                    <span className="text-lg font-medium text-gray-700">
                                        Unfinished Game: {game.id.slice(-2)}
                                    </span>
                                </div>
                            </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameLobby