import { Board as BoardType} from '../game/game'
import Square from './Square'

type BoardProps = {
    board: BoardType,
    cellClick: (cellIndex: number) => void
}

const Board = ({ board , cellClick}: BoardProps) => {

    return(
        <>
            <div className="board-row">
                <Square 
                className="square top left" 
                value={board[0]} 
                onClick={() => cellClick(0)}
                />
                <Square 
                className="square top" 
                value={board[1]} 
                onClick={() => cellClick(1)}
                />
                <Square 
                className="square top right" 
                value={board[2]} 
                onClick={() => cellClick(2)}
                />
            </div>    
            <div className="board-row">
                <Square 
                className="square left" 
                value={board[3]} 
                onClick={() => cellClick(3)}
                />
                <Square 
                className="square" 
                value={board[4]} 
                onClick={() => cellClick(4)}
                />
                <Square 
                className="square right" 
                value={board[5]} 
                onClick={() => cellClick(5)}
                />
            </div> 
            <div className="board-row">
                <Square 
                className="square bottom left" 
                value={board[6]} 
                onClick={() => cellClick(6)}
                />
                <Square 
                className="square bottom" 
                value={board[7]} 
                onClick={() => cellClick(7)}
                />
                <Square 
                className="square bottom right" 
                value={board[8]} 
                onClick={() => cellClick(8)}
                />
            </div> 
        </>
    )
}

export default Board