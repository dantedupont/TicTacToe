import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import Results from './components/Results'
import MenuScreen from './components/MenuScreen'
import { initialGameState } from './game/game'
import { move } from './game/game'
import { GameMode } from './game/game'
import { computerChoice } from './game/game'


const App = () => {

  const [game, setGame] = useState(initialGameState('menu'))
  const [computerThinking, setComputerThinking] = useState(false)

  function cellClick(cellIndex: number) {
    if(computerThinking === false){
      setGame(prev => move(prev, cellIndex))
      // returns nothing
    }
  }

  function rematch(mode: GameMode){
    setGame(initialGameState(mode))
  }

  useEffect(() => {
    if(game.GameMode === 'PvC'){
      if(game.Player === 'O'){
        setComputerThinking(true)
        const timer = setTimeout(() => {
          setGame(prev => move(prev, computerChoice(prev)));
          setComputerThinking(false)
          }, 800)
        return () => clearTimeout(timer)
      }
    }
  }, [game])

  return (
    <div className={game.GameEnd ? "game-end" : "game"}>
      {game.GameMode === 'menu' 
        ? <MenuScreen rematch={rematch} />
        : 
      <>
        {game.GameEnd 
              ? <Results 
                  gameStatus={game.GameStatus} 
                  rematch={rematch} 
                  gameMode={game.GameMode}
                /> 
              : null
        }
        <Board 
          board={game.Board} 
          cellClick={cellClick}
        />
      </>
      }
    </div>
  )
}

export default App
