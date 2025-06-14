import { useState, useEffect } from "react"
import { useLoaderData, useNavigate } from "react-router"
import { io } from "socket.io-client"

import Board from './Board'
import Results from './Results'
import Notification from "./Notification"


import { GameMode, computerChoice, type Game } from '../game/game'
import { TicTacToeApiClient } from '../api'
import { GAME_UPDATED, USER_JOINED } from "../../constants"

import '../GameView.css'



const api = new TicTacToeApiClient

const GameView = () => {

  const { game: initialGame } = useLoaderData<{ game: Game}>()

  const [game, setGame] = useState<Game>(initialGame)
  const [computerThinking, setComputerThinking] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  
  async function cellClick(cellIndex: number){
    console.log(game);
    
    if(computerThinking){
      return
    }
    const newGame = await api.makeGameMove(game!.id, cellIndex)
    setGame(newGame)
  }

  async function rematch(mode: GameMode){
    const newGame = await api.createGame(mode)
    setGame(newGame)
    navigate(`/game/${newGame.id}`)
  }

  useEffect(() => {
    const socket = io('https://tictactoe-production-784f.up.railway.app', {
      transports: ['websocket'],
      autoConnect: true
    });
    
    socket.on("connect", () => {
      console.log("connected to socket");
      socket.emit("join-game", game.id);
      
      socket.on(USER_JOINED, (userId: string) => {
        console.log(`user ${userId} joined`);
        setMessage(`user ${userId} joined`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      socket.on(GAME_UPDATED, (game: Game) => {
        console.log("game updated", game);
        setGame(game)
      })
      socket.on("user-left", (userId: string) => {
        setMessage(`${userId} has left the room`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    })

    return () => {
      socket.emit("leaving-game", { gameId: game.id, userId: socket.id })
      socket.disconnect()
    }
  }, [game.id])

  useEffect(() => {
    if(game.GameMode === 'PvC' && !game.GameEnd){
      if(game.Player === 'O'){
        setComputerThinking(true)
        const timer = setTimeout(async () => {
          const newGame = await api.makeGameMove(game!.id, computerChoice(game))
          setGame(newGame);
          setComputerThinking(false)
          }, 800)
        return () => clearTimeout(timer)
      }
    }
  }, [game])

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
                      gameEnd={game.GameEnd} 
                      rematch={rematch} 
                      gameMode={game.GameMode}
                      gameId={game.id}
                      /> 
                  : null
              }
              <Notification message={message}/>
              <Board 
              board={game.Board} 
              cellClick={cellClick}
              />
              {game.GameMode === 'PvP' ? 
                <h2 className="text-2xl font-semibold text-gray-800 mt-6 text-center">
                Play locally or share link to play online
              </h2>
              :
              null  
              }
          </>
      </div>
  )
}

export default GameView
