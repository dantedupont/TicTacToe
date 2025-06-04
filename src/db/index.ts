import { drizzle } from 'drizzle-orm/postgres-js'
import { TicTacToeApi } from '../api';
import { type Game, initialGameState as createGame, move as makeGameMove } from "../game/game"
import { GameMode, Board, Player, GameEnd } from "../game/game"
import { gameTable } from './schema';
import { eq } from 'drizzle-orm';


export class DbTicTacToeApi implements TicTacToeApi {
    private db = drizzle(process.env.DATABASE_URL!);

    async createGame(): Promise<Game> {
        const game = createGame('PvP')
        await this.db.insert(gameTable).values({
            id: game.id,
            Mode: 'PvP',
            Board: game.Board,
            Player: game.Player,
            End: game.GameEnd,
            Status: game.GameStatus
        })
        return game
    }
    async getGame(gameId: string): Promise<Game | undefined> {
        const result = await this.db.select().from(gameTable).where(eq(gameTable.id, gameId))
        if (result.length == 0){
            return Promise.resolve(undefined)
        }
        const row = result[0]
        return {
            id: row.id,
            GameMode: row.Mode as GameMode,
            Board: row.Board as Board,
            Player: row.Player as Player,
            GameEnd: row.End as GameEnd,
            GameStatus: row.Status as Game['GameStatus']
        }
    }
    async makeGameMove(gameId: string, cellIndex: number): Promise<Game> {
        const game = await this.getGame(gameId)
        if(!game) {
            return Promise.reject("Game not found?")
        }
        const updatedGame = makeGameMove(game, cellIndex)
        await this.db.update(gameTable)
            .set(updatedGame)
            .where(eq(gameTable.id, gameId))
        return updatedGame
    }
}