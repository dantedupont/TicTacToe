const Results = ({ gameStatus, rematch, setGameMode, gameMode }) => {
    return(
        <div className="game-results">
            <h1>{gameStatus}</h1>
            <button onClick={() => setGameMode('menu')}>Menu</button>
            <button onClick={() => rematch(gameMode)}>Rematch</button>
        </div>
    )
}

export default Results