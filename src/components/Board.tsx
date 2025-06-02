import { Board as BoardType} from '../game/game'
import Square from './Square'

type BoardProps = {
    board: BoardType
    // squareClick: () => void
}

const Board = ({ board }: BoardProps) => {

    return(
        <>
            <div className="board-row">
                <Square 
                className="square top left" 
                value={board[0]} 
                //squareClick={() => squareClick(0)}
                />
                <Square 
                className="square top" 
                value={board[1]} 
                //squareClick={() => squareClick(1)}
                />
                <Square 
                className="square top right" 
                value={board[2]} 
                //squareClick={() => squareClick(2)}
                />
            </div>    
            <div className="board-row">
                <Square 
                className="square left" 
                value={board[3]} 
                //squareClick={() => squareClick(3)}
                />
                <Square 
                className="square" 
                value={board[4]} 
                //squareClick={() => squareClick(4)}
                />
                <Square 
                className="square right" 
                value={board[5]} 
                //squareClick={() => squareClick(5)}
                />
            </div> 
            <div className="board-row">
                <Square 
                className="square bottom left" 
                value={board[6]} 
                //squareClick={() => squareClick(6)}
                />
                <Square 
                className="square bottom" 
                value={board[7]} 
                //squareClick={() => squareClick(7)}
                />
                <Square 
                className="square bottom right" 
                value={board[8]} 
                //squareClick={() => squareClick(8)}
                />
            </div> 
        </>
    )
}

export default Board