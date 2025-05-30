import { useState } from 'react';

const Square = (props) => {

    return (
    <>
        <button 
        className={props.className}
        onClick={props.squareClick}
        >
            {props.value}
        </button>
    </>
    )
}

export default Square