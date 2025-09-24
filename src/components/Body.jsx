import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import WinHome from "./WinHome"

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path:"/win",
            element: <WinHome/>
        }
    ])
    
    return (
        <div>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}

export default Body