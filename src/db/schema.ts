import { pgTable, varchar, jsonb } from 'drizzle-orm/pg-core'
import { type Board } from '../game/game'

export const gameTable = pgTable('TicTacToe', {
    id: varchar({ length: 255 }).primaryKey(),
    Mode: varchar({ length: 255 }).notNull(),
    Board: jsonb().$type<Board>(),
    Player: varchar({ length: 255 }).notNull(),
    End: varchar({ length: 255 }),
    Status: varchar({ length: 255 })
})