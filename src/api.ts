import { type Game } from "./game/game"

export interface TicTacToeApi {
    createGame(mode: Game['GameMode']): Promise<Game>,
    getGame(gameId: string): Promise<Game | undefined>,
    makeGameMove(gameId: string, cellIndex: number): Promise<Game>,
    getGames(): Promise<Game[]>
}

const baseUrl = "https://tictactoe-production-784f.up.railway.app"

export class TicTacToeApiClient implements TicTacToeApi {
    async createGame(mode: Game['GameMode']): Promise<Game> {
        const response = await fetch(`${baseUrl}/game`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mode})
        })
        const game = await response.json()
        return game
    }

    async getGame(gameId: string): Promise<Game> {
        const response = await fetch(`${baseUrl}/game/${gameId}`)
        const game = await response.json()
        return game
    }
    
    async makeGameMove(gameId: string, cellIndex: number): Promise<Game> {
        const response = await fetch(`${baseUrl}/game/${gameId}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cellIndex})
        })
        const game = await response.json()
        return game
    }

    async getGames(): Promise<Game[]> {
        const response = await fetch(`${baseUrl}/games`)
        const games = await response.json()
        return games
    }

}

