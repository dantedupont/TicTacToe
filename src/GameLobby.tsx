import { Link, useLoaderData } from "react-router"
import type { Game } from "./game/game"
import { useState } from "react"

const GameLobby = () => {
    const { games: initialGames } = useLoaderData<{ games: Game[]}>()

    const [games, setGames] = useState<Game[]>(initialGames)

    return(
        <div>
            <h2>GameLobby</h2>
            Super Cool List of Games
            {games.map(game => (
                <div key={game.id}>
                        <Link to={`/game/${game.id}`}>{game.id}</Link>
                </div>
            ))}
        </div>
    )
}

export default GameLobby