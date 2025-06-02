import React from 'react';
import { GameMode } from '../game/game'

type MenuProps = {
    rematch: (gameMode: GameMode) => void,
}

const MenuScreen = ({ rematch } : MenuProps) => {
    function handlePvP(){
        rematch('PvP')
    }
    function handlePvC(){
        rematch('PvC')
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