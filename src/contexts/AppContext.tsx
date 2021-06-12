import { App } from "@capacitor/app"
import { createContext, useContext, useEffect, useState } from "react"

type AppContextProps = {
    isActive: boolean
}

const AppContext = createContext<Partial<AppContextProps>>({})

const AppContextProvider: React.FC = ({ children }) => {
    const [appActive, setAppActive] = useState(true)

    useEffect(() => {
        console.log("Use effect fired!")
        const listener = App.addListener("appStateChange", state => {
            console.log("App state changed:", state)
            setAppActive(state.isActive)
        })
        return () => {
            listener.remove()
        }
    }, [])

    return <AppContext.Provider value={{ isActive: appActive }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppContextProvider
