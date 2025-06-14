import { drizzle } from 'drizzle-orm/postgres-js'
import { TicTacToeApi } from '../../src/api';
import { 
    type Game,
    initialGameState as createGame,
    move as makeGameMove,
    GameMode,
    Board,
    Player,
    GameEnd
 } from "../../src/game/game"
import { gameTable } from './schema';
import { eq, isNull } from 'drizzle-orm';


const DB_URL = process.env.DATABASE_URL as string
if(!DB_URL) throw Error("No Database URL")
console.log(DB_URL);



export class DbTicTacToeApi implements TicTacToeApi {
    private db = drizzle(DB_URL);

    async createGame(mode: GameMode): Promise<Game> {
        const game = createGame(mode)
        await this.db.insert(gameTable).values({
            id: game.id,
            Mode: game.GameMode,
            Board: game.Board,
            Player: game.Player,
            End: game.GameEnd,
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
        }
    }
    async makeGameMove(gameId: string, cellIndex: number): Promise<Game> {
        const game = await this.getGame(gameId)
        if(!game) {
            return Promise.reject("Game not found?")
        }
        const updatedGame = makeGameMove(game, cellIndex)
        await this.db.update(gameTable)
            .set({
                id: updatedGame.id,
                Mode: updatedGame.GameMode,
                Board: updatedGame.Board,
                Player: updatedGame.Player,
                End: updatedGame.GameEnd
            })
            .where(eq(gameTable.id, gameId))
        return updatedGame
    }

    async getGames(): Promise<Game[]> {
        const results = await this.db.select().from(gameTable).where(isNull(gameTable.End)).limit(10)
        return results.map(game => ({
            id: game.id,
            GameMode: game.Mode as GameMode,
            Board: game.Board as Board,
            Player: game.Player as Player,
            GameEnd: game.End as GameEnd,
        }))
    }
}

