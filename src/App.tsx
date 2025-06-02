import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import Results from './components/Results'
import MenuScreen from './components/MenuScreen'
import { initialGameState } from './game/game'


const App = () => {

  const [game, setGame] = useState(initialGameState)

  return (
    <div className={game.GameEnd ? "game-end" : "game"}>
      <Board 
              board={game.Board} 
              //squareClick={squareClick}
      />
    </div>
  )
}

export default App

/*
old code:
 {gameMode === 'menu' 
        ? <MenuScreen rematch={rematch} />
        : 
          <>
            {gameEnd 
              ? <Results 
                  gameStatus={gameStatus} 
                  rematch={rematch} 
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                /> 
              : null
            }
            <Board 
              squares={squares} 
              squareClick={squareClick}
            />
          </>
      }
*/
