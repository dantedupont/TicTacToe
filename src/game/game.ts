export type Player = 'X' | 'O'
export type Cell = Player | null
export type GameEnd = true | false
export type Board = Cell[] 
export type GameMode = 'menu' | 'PvP' | 'PvC'

export type Game = {
    id: string,
    GameMode: GameMode,
    Board: Board,
    Player: Player,
    GameEnd: GameEnd,
    GameStatus: string,
}

export function initialGameState(mode: GameMode) : Game {
    const newGame: Game = {
        id: crypto.randomUUID(),
        GameMode: mode,
        Board: Array(9).fill(null),
        Player: 'X',
        GameEnd: false,
        GameStatus: '',
    }
    return newGame
}
  
export function move(game: Game, cellIndex: number): Game {
    if(game.Board[cellIndex] || checkEnd(game.Board)){
        return game
    }
    const newGame = structuredClone(game)

    newGame.Board[cellIndex] = newGame.Player
    
    if(checkEnd(newGame.Board)){
        newGame.GameStatus = `${newGame.Player} wins!`
        newGame.GameEnd = true
        return newGame;
    }

    if (newGame.Board.every((square) => square !== null)) {
        newGame.GameStatus = 'Tie!'
        newGame.GameEnd = true
        return newGame
    }

    if(game.Player === 'X'){
        newGame.Player = 'O'
    } else {
        newGame.Player = 'X'
    }

    return newGame
}

const winLines: number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]


function checkEnd(board: Board): boolean {
    for(const line of winLines){
      let a = line[0]
      let b = line[1]
      let c = line[2]
  
      if(board[a] === board[b] && board[b] === board[c] && board[a] !== null){
        return true;
      }
    }
    return false;
}

function checkForWin(board: Board, playerMark: Player) : number | null {
    for(const line of winLines){
      let playerCount = 0
      let emptySpot = null

      for(const index of line){
        if(board[index] === playerMark){
          playerCount++
        } 
        if(board[index] === null){
          emptySpot = index
        }
      }

      if(playerCount === 2 && emptySpot !== null){
        return emptySpot;
      } 
    }
    return null;
  }

export function computerChoice(game: Game) : number{
    const corners = [0,2,6,8]
    const sides = [1,3,5,7]

    //First priority choice is to win the game if possible
    const firstChoice = checkForWin(game.Board, 'O')

    if(firstChoice !== null){
        return firstChoice;
    }
    //Second priority choice is to prevent the player from winning the game if possible
    const secondChoice = checkForWin(game.Board, 'X')
    if(secondChoice !== null){
        return secondChoice;
    }
    //Third priority is to take center square since it will result in a draw rather than a loss
    if(game.Board[4] === null){
        return 4;
    } 
    //Fourth priority is to take a corner, to increase chances of getting 3 in a row
    let cornerChoices = []

    for(const index of corners){
        if(game.Board[index] === null)
        cornerChoices.push(index)
    }

    if(cornerChoices.length > 0){
        return (cornerChoices[Math.floor(Math.random()*cornerChoices.length)]);
    }
    //Finally, take a side square if nothing else is available
    let sideChoices = []

    for(const index of sides){
        if(game.Board[index] === null)
        sideChoices.push(index)
    }
    if(sideChoices.length > 0){
        return (sideChoices[Math.floor(Math.random()*sideChoices.length)]);
    }

    throw Error('Computer could not come up with a move')

}
  
