import { Link, useLoaderData, useNavigate } from "react-router"
import type { Game } from "../game/game"
import { useState } from "react"
import { TicTacToeApiClient } from '../api'

const api = new TicTacToeApiClient

const GameLobby = () => {
    const { games: initialGames } = useLoaderData<{ games: Game[]}>()
    const [games, setGames] = useState<Game[]>(initialGames)
    const navigate = useNavigate()

    async function handleNewGame() {
        const newGame = await api.createGame('menu')
        setGames([...games, newGame])
        navigate(`/game/${newGame.id}`)
    }

    return(
        <div>
            <h2 className="text-xl">GameLobby</h2>
            <button onClick={handleNewGame}>Start New Game</button>
            {games.map(game => (
                <div key={game.id}>
                        <Link to={`/game/${game.id}`}>Game: {game.id.slice(-2)}</Link>
                </div>
            ))}
        </div>
    )
}

export default GameLobby