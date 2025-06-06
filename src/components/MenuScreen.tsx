import React from 'react';
import { TicTacToeApiClient } from '../api'
import { useNavigate } from "react-router"

const api = new TicTacToeApiClient

const MenuScreen = () => {
    const navigate = useNavigate()

    async function handlePvP(){
        const newGame = await api.createGame('PvP')
        navigate(`/game/${newGame.id}`)
    }
    async function handlePvC(){
        const newGame = await api.createGame('PvC')
        navigate(`/game/${newGame.id}`)
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