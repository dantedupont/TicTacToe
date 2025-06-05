import { useState, useEffect } from "react"
import { useLoaderData } from "react-router"
import Board from './components/Board'
import Results from './components/Results'
import './GameView.css'
import MenuScreen from './components/MenuScreen'
import { initialGameState } from './game/game'
import { move } from './game/game'
import { GameMode } from './game/game'
import { computerChoice } from './game/game'
import { TicTacToeApiClient } from './api'
import{ type Game } from './game/game'

const api = new TicTacToeApiClient

const GameView = () => {

    const [computerThinking, setComputerThinking] = useState(false)

    const { game: initialGame } = useLoaderData<{ game: Game}>()

    const [game, setGame] = useState<Game | undefined>(initialGame)
  
    async function cellClick(cellIndex: number){
      if(computerThinking === false){
        const newGame = await api.makeGameMove(game!.id, cellIndex)
        setGame(newGame)
      }
    }
  
    async function rematch(mode: GameMode){
      const newGame = await api.createGame()
      setGame(newGame)
    }
  
    if (!game) {
      return (
        <div>Loading...</div>
      )
    }


    return (
        <div className={game.GameEnd === 'true' ? "game-end" : "game"}>
            <>
                {game.GameEnd === 'true'
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

export default GameView