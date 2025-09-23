import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Projects from "./Projects"

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {   
            path: "/Projects",
            element: <Projects/>
        },
    ])
    
    return (
        <div>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}

export default Body