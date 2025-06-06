import { GameMode } from '../game/game'
import { Link } from "react-router"

type ResultsProps = {
    gameEnd: String,
    rematch: (gameMode: GameMode) => void,
    gameMode: GameMode
}

const Results = ({ gameEnd, rematch, gameMode } : ResultsProps) => {

    return(
        <div className="game-results">
            <h1>{gameEnd}</h1>
            <button><Link to={'/game/menu'}>Menu</Link></button>
            <button onClick={() => rematch(gameMode)}>Rematch</button>
        </div>
    )
}

export default Results

