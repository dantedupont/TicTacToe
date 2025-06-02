export type Player = 'X' | 'O'
export type GamEnd = 'X' | 'O' | 'tie'
export type Cell = Player | null
export type GameEnd = true | false
export type Board = Cell[]

export type Game = {
    Board: Board,
    Player: Player,
    GameEnd: GameEnd
}

export function initialGameState() : Game {
    const newGame: Game = {
        Board: Array(9).fill(null),
        Player: 'X',
        GameEnd: false
    }
    return newGame
}
  
function move(Game: Game, Player: Player){

}
  
  /*
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameStatus, setGameStatus] = useState(null);
  const [isWaitingForComputer, setIsWaitingForComputer] = useState(false); //prevent clicks while it's the computer's turn
  const [gameMode, setGameMode] = useState('menu');

  const squares: number[] = Array(9).fill(null)

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  function checkForWin(squares: number[], playerMark: string){
    for(const line of lines){
      let playerCount = 0
      let emptySpot = null

      for(const index of line){
        if(squares[index] === playerMark){
          playerCount++
        } 
        if(squares[index] === null){
          emptySpot = index
        }
      }

      if(playerCount === 2 && emptySpot !== null){
        return emptySpot;
      } 
    }
    return null;
  }

  function computerMove(squares) {
    const corners = [0,2,6,8]
    const sides = [1,3,5,7]
    //First priority choice is to win the game if possible
    const firstChoice = checkForWin(squares, 'O')

    if(firstChoice !== null){
      squareClick(firstChoice)
      return;
    }
    //Second priority choice is to prevent the player from winning the game if possible
    const secondChoice = checkForWin(squares, 'X')
    if(secondChoice !== null){
      squareClick(secondChoice)
      return;
    }
    //Third priority is to take center square since it will result in a draw rather than a loss
    if(squares[4] === null){
      squareClick(4)
      return;
    } 
    //Fourth priority is to take a corner, to increase chances of getting 3 in a row
    let cornerChoices = []

    for(const index of corners){
      if(squares[index] === null)
        cornerChoices.push(index)
    }
    
    if(cornerChoices.length > 0){
      squareClick(cornerChoices[Math.floor(Math.random()*cornerChoices.length)])
      return;
    }
    //Finally, take a side square if nothing else is available
    let sideChoices = []

    for(const index of sides){
      if(squares[index] === null)
        sideChoices.push(index)
    }
    if(sideChoices.length > 0){
      squareClick(sideChoices[Math.floor(Math.random()*sideChoices.length)])
      return;
    }
  }

  useEffect(() => {
    if(gameMode === 'vsComputer'){
      if(playerOneTurn === false && gameEnd === false){
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

  function checkEnd(squares){
    for(const line of lines){
      let a = line[0]
      let b = line[1]
      let c = line[2]
  
      if(squares[a] === squares[b] && squares[b] === squares[c] && squares[a] !== null){
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

  function squareClick(i){
    if(isWaitingForComputer){
      return;
    }
    if(squares[i] || checkEnd(squares)){
        return; //prevents a filled square from being changed again
    }

    const nextSquares = squares.slice();

    if(playerOneTurn){
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
    */