import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router'
import GameLobby from './components/GameLobby'
import GameView from './components/GameView'
import { TicTacToeApiClient } from './api'
import MenuScreen from './components/MenuScreen'

const api = new TicTacToeApiClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path:"/",
        Component: GameLobby,
        loader: async () => {
          const games = await api.getGames()
          return { games }
        },
      },
      {
        path: "/game/menu",
        Component: MenuScreen
      },
      {
        path: "/game/:gameId",
        Component: GameView,
        loader: async ({ params }) => {
          if(!params.gameId) {
            throw new Error("Game ID is required")
          }
          const game = await api.getGame(params.gameId)
          return { game }
        }
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>
)
