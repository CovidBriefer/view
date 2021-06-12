import { App } from "@capacitor/app"
import { PluginListenerHandle } from "@capacitor/core"
import { createContext, useContext, useEffect, useState } from "react"

type AppContextProps = {
    isActive: boolean
}

const AppContext = createContext<Partial<AppContextProps>>({})

const AppContextProvider: React.FC = ({ children }) => {
    const [appActive, setAppActive] = useState(true)

    useEffect(() => {
        let listener: PluginListenerHandle
        App.addListener("appStateChange", state => {
            setAppActive(state.isActive)
        }).then(val => {
            listener = val
        })
        return () => {
            listener?.remove()
        }
    }, [])

    return <AppContext.Provider value={{ isActive: appActive }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppContextProvider
