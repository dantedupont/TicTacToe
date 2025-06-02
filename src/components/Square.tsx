import { useState } from 'react';

type SquareProps = {
    className: string,
    value: string | null,
    onClick:  React.MouseEventHandler<HTMLButtonElement>
}

const Square = ({ className, value, onClick }: SquareProps) => {

    return (
    <>
        <button 
        className={className}
        onClick={onClick}
        >
            {value}
        </button>
    </>
    )
}

export default Square