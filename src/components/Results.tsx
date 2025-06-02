import { GameMode } from '../game/game'

type ResultsProps = {
    gameStatus: String,
    rematch: (gameMode: GameMode) => void,
    gameMode: GameMode
}

const Results = ({ gameStatus, rematch, gameMode } : ResultsProps) => {

    return(
        <div className="game-results">
            <h1>{gameStatus}</h1>
            <button onClick={() => rematch('menu')}>Menu</button>
            <button onClick={() => rematch(gameMode)}>Rematch</button>
        </div>
    )
}

export default Results

