import { useState } from 'react';

type SquareProps = {
    className: string,
    value: string | null
}

const Square = ({ className, value }: SquareProps) => {

    return (
    <>
        <button 
        className={className}
        //onClick={squareClick}
        >
            {value}
        </button>
    </>
    )
}

export default Square