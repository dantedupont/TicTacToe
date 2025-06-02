import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import Results from './components/Results'
import MenuScreen from './components/MenuScreen'
import { initialGameState } from './game/game'
import { move } from './game/game'


const App = () => {

  const [game, setGame] = useState(initialGameState)

  function cellClick(cellIndex: number) {
    setGame(prev => move(prev, cellIndex))
    // returns nothing
  }

  return (
    <div className={game.GameEnd ? "game-end" : "game"}>
      <>
        {game.GameEnd 
              ? <Results 
                  gameStatus={game.GameStatus} 
                  //rematch={rematch} 
                  //gameMode={gameMode}
                  //setGameMode={setGameMode}
                /> 
              : null
        }
        <Board 
          board={game.Board} 
          cellClick={cellClick}
        />
      </>
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
