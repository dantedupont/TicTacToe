import { type Game, initialGameState as createGame, move as makeGameMove } from "./game/game"

export interface TicTacToeApi {
    createGame(): Promise<Game>,
    makeGameMove(gameId: string, cellIndex: number): Promise<Game>,
    getGame(gameId: string): Promise<Game>
}

export class TicTacToeApiClient implements TicTacToeApi {
    async createGame(): Promise<Game> {
        const response = await fetch("/api/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const game = await response.json()
        return game
    }

    async getGame(gameId: string): Promise<Game> {
        const response = await fetch(`/api/game${gameId}`)
        const game = await response.json()
        return game
    }
    
    async makeGameMove(gameId: string, cellIndex: number): Promise<Game> {
        const response = await fetch(`api/game/${gameId}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cellIndex})
        })
        const game = await response.json()
        return game
    }
}