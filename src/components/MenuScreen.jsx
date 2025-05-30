import React from 'react';

const MenuScreen = ({ rematch }) => {
    function handlePvP(){
        rematch('vsPlayer')
    }
    function handlePvC(){
        rematch('vsComputer')
    }

    return(
        <div className="menu">
            <h1>Tic Tac Toe</h1>
            <button onClick={handlePvP}>Player vs Player</button>
            <button onClick={handlePvC}>Player vs Computer</button>
        </div>
    )
}

export default MenuScreen