import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import Results from './components/Results'
import MenuScreen from './components/MenuScreen'

type Player = 'x' | 'o'
type GameEnd = 'x' | 'o' | 'tie'


function gameMessage(gameEnd: GameEnd): string | undefined {
  switch (gameEnd) {
    case 'x':
      return "Player X wins!";
    case 'o':
      return "Player O wins!";
    case 'tie':
      return "It's a tie!";
    default:
      return undefined;
  }
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

type Cell = Player | null

type Game = {
  board: Cell[],
  currentPlayer: Player,
  endState: GameEnd | undefined,
}

function move(game: Game, cellIndex: number): Game {
  // calculate next game:
  const nextGame = structuredClone(game)
  if (nextGame.board[cellIndex]) return nextGame

  nextGame.board[cellIndex] = game.currentPlayer
  nextGame.endState = calculateEndState(nextGame)
  return nextGame
}

const App = () => {

  const [game, setGame] = useState<Game>(initialGameState)

  const handleClick = (cellIndex: number) => {
    setGame(prev => move(prev, cellIndex))
  }

  if (game.endState) {
    return (<div>
      Game is over!!
    </div>)
  }


  function checkForWin(squares, playerMark): number | null {
    for (const line of lines) {
      let playerCount = 0
      let possibleWinningSpot: number | null = null

      for (const index of line) {
        if (squares[index] === playerMark) {
          playerCount++
        }
        if (squares[index] === null) {
          possibleWinningSpot = index
        }
      }

      if (playerCount === 2 && possibleWinningSpot !== null) {
        return possibleWinningSpot;
      }
    }
    return null;
  }

  function computerMove(squares) {
    const corners = [0, 2, 6, 8]
    const sides = [1, 3, 5, 7]
    //First priority choice is to win the game if possible
    const firstChoice = checkForWin(squares, 'O')

    if (firstChoice !== null) {
      squareClick(firstChoice)
      return;
    }
    //Second priority choice is to prevent the player from winning the game if possible
    const secondChoice = checkForWin(squares, 'X')
    if (secondChoice !== null) {
      squareClick(secondChoice)
      return;
    }
    //Third priority is to take center square since it will result in a draw rather than a loss
    if (squares[4] === null) {
      squareClick(4)
      return;
    }
    //Fourth priority is to take a corner, to increase chances of getting 3 in a row
    let cornerChoices: number[] = []

    for (const index of corners) {
      if (squares[index] === null)
        cornerChoices.push(index)
    }

    if (cornerChoices.length > 0) {
      squareClick(cornerChoices[Math.floor(Math.random() * cornerChoices.length)])
      return;
    }
    //Finally, take a side square if nothing else is available
    let sideChoices: number[] = []

    for (const index of sides) {
      if (squares[index] === null)
        sideChoices.push(index)
    }
    if (sideChoices.length > 0) {
      squareClick(sideChoices[Math.floor(Math.random() * sideChoices.length)])
      return;
    }
  }

  useEffect(() => {
    if (gameMode === 'vsComputer') {
      if (playerOneTurn === false && gameEnd === false) {
        setIsWaitingForComputer(true);
        const timer = setTimeout(() => {
          computerMove(squares);
          setIsWaitingForComputer(false)
        }, 800);
        return () => clearTimeout(timer)
      } else {
        setIsWaitingForComputer(false)
      }
    }
  }, [playerOneTurn, squares, gameEnd, gameMode])

  function checkEnd(squares) {
    for (const line of lines) {
      let a = line[0]
      let b = line[1]
      let c = line[2]

      if (squares[a] === squares[b] && squares[b] === squares[c] && squares[a] !== null) {
        setGameStatus(`${squares[a]} Wins!`)
        setGameEnd(true)
        return true;
      }
    }

    if (squares.every((square) => square !== null)) {
      setGameStatus('Tie!')
      setGameEnd(true)
      return true;
    } else {
      return false;
    }
  }

  function squareClick(i) {
    if (isWaitingForComputer) {
      return;
    }
    if (squares[i] || checkEnd(squares)) {
      return; //prevents a filled square from being changed again
    }

    const nextSquares = squares.slice();

    if (playerOneTurn) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    checkEnd(nextSquares)

    setPlayerOneTurn(prevTurn => !prevTurn);
  }

  function rematch(mode) {
    setSquares(Array(9).fill(null));
    setPlayerOneTurn(true);
    setGameEnd(false);
    setGameStatus(null);
    setIsWaitingForComputer(false);
    setGameMode(`${mode}`)
  }

  return (
    <div className={gameEnd ? "game-end" : "game"}>
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
    </div>
  )
}

export default App
