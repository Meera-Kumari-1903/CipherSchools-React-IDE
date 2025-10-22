import Navbar from "./components/Navbar"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import IDE from "./pages/IDE"
import { createBrowserRouter,RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {path:'/ide', element: <IDE/>},
  {path:'/', element: <Dashboard/>},
  {path:'/nav', element: <Navbar/>},
  {path:'/nav', element: <Navbar/>},
  {path:'/login', element: <Auth/>},
])

function App() {
 

  return (
    <>
    <RouterProvider router = {router}/>
    </>
  )
}

export default App
