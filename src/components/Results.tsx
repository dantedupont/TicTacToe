type ResultsProps = {
    gameStatus: String,
    
}

const Results = ({ gameStatus, /*rematch, setGameMode, gameMode*/ } : ResultsProps) => {

    return(
        <div className="game-results">
            <h1>{gameStatus}</h1>
            
        </div>
    )
}

export default Results

// Code Hold
// <button onClick={() => setGameMode('menu')}>Menu</button>
// <button onClick={() => rematch(gameMode)}>Rematch</button>