import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import WinHome from "./WinHome"
import { createContext, useMemo, useState, useEffect } from "react"

export const UiContext = createContext(null)

const Body = () => {

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [contactsOpen, setContactsOpen] = useState(false)
    const [projectsOpen, setProjectsOpen] = useState(false)
    
    // Initialize state from localStorage or default values
    const [isMac, setIsMac] = useState(() => {
        const saved = localStorage.getItem('isMac')
        return saved !== null ? JSON.parse(saved) : true
    })
    const [isWindows, setIsWindows] = useState(() => {
        const saved = localStorage.getItem('isWindows')
        return saved !== null ? JSON.parse(saved) : false
    })

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('isMac', JSON.stringify(isMac))
    }, [isMac])

    useEffect(() => {
        localStorage.setItem('isWindows', JSON.stringify(isWindows))
    }, [isWindows])

    const contextValue = useMemo(() => ({
        settingsOpen,
        contactsOpen,
        projectsOpen,
        isMac,
        isWindows,
        openSettings: () => setSettingsOpen(true),
        closeSettings: () => setSettingsOpen(false),
        openContacts: () => setContactsOpen(true),
        closeContacts: () => setContactsOpen(false),
        openProjects: () => setProjectsOpen(true),
        closeProjects: () => setProjectsOpen(false),
        setMac: () => { setIsMac(true); setIsWindows(false) },
        setWindows: () => { setIsMac(false); setIsWindows(true) },
    }), [settingsOpen, contactsOpen, projectsOpen, isMac, isWindows])

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
            <UiContext.Provider value={contextValue}>
                <RouterProvider router = {appRouter}/>
            </UiContext.Provider>
        </div>
    )
}

export default Body