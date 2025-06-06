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
        <div>
            <h2 className="text-xl">GameLobby</h2>
            <Link to={'/game/menu'}>Start New Game</Link>
            {games.map(game => (
                <div key={game.id}>
                        <Link to={`/game/${game.id}`}>Game: {game.id.slice(-2)}</Link>
                </div>
            ))}
        </div>
    )
}

export default GameLobby