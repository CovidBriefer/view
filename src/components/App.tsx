import React, { createContext, useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { IonReactRouter } from "@ionic/react-router"

import Setup from "./pages/setup/Setup"
import Home from "./pages/home/Home"
import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react"
import { Config, Page } from ".."
import { Storage } from "@ionic/storage"

type StorageContextProps = {
    store: Storage | null
}

export const StorageContext = createContext<Partial<StorageContextProps>>({})
// store.create()

const App: React.FC = () => {
    // const [showSetup, setShowSetup] = useState(false)
    const [setupPage, setSetupPage] = useState<Page | undefined | null>(null) // undefined == no setup required; null == n
    const [store, setStore] = useState<Storage>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (store) {
            console.log("Getting config")
            store?.get("config").then(item => {
                if (item) {
                    const parsedConf: Config = JSON.parse(item)
                    setSetupPage(parsedConf.setup.currentPage)
                }
                setTimeout(() => {
                    setLoading(false)
                }, 250)
            })
        }
    }, [store])

    const createStorage = async () => {
        const _store = new Storage()
        await _store.create()
        // _store.clear()
        // _store.set("config", JSON.stringify({ setup: { done: false, currentPage: "introduction" } } as Config))

        _store.get("config").then(async res => {
            if (!res) {
                console.log("No config set, setting...")
                await _store.set(
                    "config",
                    JSON.stringify({ setup: { done: false, currentPage: "introduction" } } as Config)
                )
            }
        })
        await _store.set("initialized", "true")
        setStore(_store)
        return
    }
    useEffect(() => {
        createStorage()
    }, [])
    return (
        <StorageContext.Provider value={{ store }}>
            <IonApp>
                {loading ? (
                    <IonLoading
                        isOpen={loading}
                        spinner="crescent"
                        cssClass="ion-loading-custom"
                        animated={true}
                        showBackdrop={false}
                    />
                ) : (
                    <IonReactRouter>
                        <IonRouterOutlet>
                            <Route
                                path="/"
                                render={({ history }) => (setupPage === null ? <Home /> : <Setup history={history} />)}
                                exact={true}
                            />
                            <Route path="/home" component={Home} exact={true} />
                        </IonRouterOutlet>
                    </IonReactRouter>
                )}
            </IonApp>
        </StorageContext.Provider>
    )
}

export default App
