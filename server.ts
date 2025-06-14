//e.g server.js
import express from "express";
// import ViteExpress from "vite-express";
import { DbTicTacToeApi } from './src/db/db'
import cors from "cors"
import { GAME_UPDATED, USER_JOINED } from "./constants"
import { Game } from './src/game/game'
import { Server } from "socket.io"



const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ["http://localhost:5173"]


const app = express();
app.use(express.json())
app.use(cors({
    origin: function (origin: string | undefined, callback){
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    },
    methods: ["GET", "POST"]
}))

const api = new DbTicTacToeApi()

app.get("/game/:gameId", async (req, res) => {
    const game = await api.getGame(req.params.gameId)
    res.json(game)
})
app.post("/game", async (req, res) => {
    const game = await api.createGame(req.body.mode)
    res.json(game)
})
app.get("/games", async (req, res) => {
    const games = await api.getGames()
    res.json(games)
})

const makeRoomId = (game: Game) => `game-${game.id}`

const PORT = parseInt(process.env.PORT || "3000")

const server = app.listen(PORT, '0.0.0.0', 
    () => console.log(`Server is listening at https://0.0.0.0${PORT}`));

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    },
    transports: ['websocket']
})

app.post("/game/:gameId/move", async (req, res) => {
    const game = await api.makeGameMove(req.params.gameId, req.body.cellIndex)
    io.to(makeRoomId(game)).emit(GAME_UPDATED, game)
    res.json(game)
})

io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);
    socket.on("join-game", async (gameId: string) => {
        const game = await api.getGame(gameId)
        if (!game) {
            console.error(`Game ${gameId} not found`);
            return;
        }
        const roomId = makeRoomId(game)
        socket.join(roomId)
        console.log(`Socket ${socket.id} joined room ${roomId}`);
        io.to(roomId).emit(USER_JOINED, socket.id)
    })
    socket.on("leaving-game", ({ gameId, userId }) => {
        const roomId = makeRoomId({ id: gameId } as Game)
        io.to(roomId).emit("user-left", socket.id)
    })
})


