import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Board from './components/Board'
import Results from './components/Results'
import MenuScreen from './components/MenuScreen'
import { initialGameState } from './game/game'
import { move } from './game/game'
import { GameMode } from './game/game'
import { computerChoice } from './game/game'
import { TicTacToeApiClient } from './api'
import{ type Game } from './game/game'


const App = () => {
  const api = useMemo(() => new TicTacToeApiClient(), [])
  const [computerThinking, setComputerThinking] = useState(false)

 //old code: const [game, setGame] = useState(initialGameState('menu'))

  const [game, setGame] = useState<Game | undefined>()
  async function initializeGame() {
    const initialState = await api.createGame()
    setGame(initialState)
  }
  useEffect(() => {
    initializeGame()
  }, [])

  async function cellClick(cellIndex: number){
    if(computerThinking === false){
      const newGame = await api.makeGameMove(game!.id, cellIndex)
      setGame(newGame)
    }
  }

  // function cellClick(cellIndex: number) {
  //   if(computerThinking === false){
  //     setGame(prev => move(prev, cellIndex))
  //     // returns nothing
  //   }
  // }

  function rematch(mode: GameMode){
    setGame(initialGameState(mode))
  }

  //computer logic:
  // useEffect(() => {
  //   if(game.GameMode === 'PvC'){
  //     if(game.Player === 'O'){
  //       setComputerThinking(true)
  //       const timer = setTimeout(() => {
  //         setGame(prev => move(prev, computerChoice(prev)));
  //         setComputerThinking(false)
  //         }, 800)
  //       return () => clearTimeout(timer)
  //     }
  //   }
  // }, [game])

  if (!game) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={game.GameEnd ? "game-end" : "game"}>
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
    </div>
  )
}

export default App
