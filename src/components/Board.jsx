import Square from './Square'

const Board = ({ squares, squareClick }) => {

    return (
        <>
            <div className="board-row">
                <Square
                    className="square top left"
                    value={squares[0]}
                    squareClick={() => squareClick(0)}
                />
                <Square
                    className="square top"
                    value={squares[1]}
                    squareClick={() => squareClick(1)}
                />
                <Square
                    className="square top right"
                    value={squares[2]}
                    squareClick={() => squareClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    className="square left"
                    value={squares[3]}
                    squareClick={() => squareClick(3)}
                />
                <Square
                    className="square"
                    value={squares[4]}
                    squareClick={() => squareClick(4)}
                />
                <Square
                    className="square right"
                    value={squares[5]}
                    squareClick={() => squareClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    className="square bottom left"
                    value={squares[6]}
                    squareClick={() => squareClick(6)}
                />
                <Square
                    className="square bottom"
                    value={squares[7]}
                    squareClick={() => squareClick(7)}
                />
                <Square
                    className="square bottom right"
                    value={squares[8]}
                    squareClick={() => squareClick(8)}
                />
            </div>
        </>
    )
}

export default Board