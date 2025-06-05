import { GameMode } from '../game/game'

type ResultsProps = {
    gameEnd: String,
    rematch: (gameMode: GameMode) => void,
    gameMode: GameMode
}

const Results = ({ gameEnd, rematch, gameMode } : ResultsProps) => {

    return(
        <div className="game-results">
            <h1>{gameEnd}</h1>
            <button onClick={() => rematch('menu')}>Menu</button>
            <button onClick={() => rematch(gameMode)}>Rematch</button>
        </div>
    )
}

export default Results

