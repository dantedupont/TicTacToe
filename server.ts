//e.g server.js
import express from "express";
// import ViteExpress from "vite-express";
import { DbTicTacToeApi } from './src/db/db'
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
const api = new DbTicTacToeApi()

app.get("/game/:gameId", async (req, res) => {
    const game = await api.getGame(req.params.gameId)
    res.json(game)
})
app.post("/game", async (req, res) => {
    const game = await api.createGame()
    res.json(game)
})
app.post("/game/:gameId/move", async (req, res) => {
    const game = await api.makeGameMove(req.params.gameId, req.body.cellIndex)
    res.json(game)
})
app.get("/games", async (req, res) => {
    const games = await api.getGames()
    res.json(games)
})

app.listen(3000, () => console.log("Server is listening..."));
