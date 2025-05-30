// export stuff from here
// export initialGameState and move and some types

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