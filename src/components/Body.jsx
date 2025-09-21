import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Resume from "./Resume"
import Projects from "./Projects"
import Contact from "./Contact"

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/Resume",
            element: <Resume/>
        },
        {   
            path: "/Projects",
            element: <Projects/>
        },
        {
            path: "/Contact",     
            element: <Contact/>
        }
    ])
    
    return (
        <div>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}

export default Body