import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { IonReactRouter } from "@ionic/react-router"

import Setup from "./pages/setup/Setup"
import Home from "./pages/Home"
import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react"
import { Config, Page } from ".."
import useStorage from "../hooks/useStorage"

const App: React.FC = () => {
    // const [showSetup, setShowSetup] = useState(false)
    const [setupPage, setSetupPage] = useState<Page | undefined | null>(null) // undefined == no setup required; null == n
    // const [loading, setLoading] = useState()
    const { data, loading: configLoading } = useStorage("config", 550)

    useEffect(() => {
        if (!configLoading && data?.value) {
            const parsed: Config = JSON.parse(data?.value)
            if (!parsed.setup.done) setSetupPage(parsed.setup.currentPage)
        }
    }, [data, configLoading])
    return (
        <IonApp>
            {configLoading ? (
                <IonLoading
                    isOpen={configLoading}
                    spinner="crescent"
                    cssClass="ion-loading-custom"
                    animated={true}
                    showBackdrop={false}
                    // onDidDismiss={() => }
                />
            ) : (
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route
                            path="/"
                            render={() => (setupPage === null ? <Home /> : <Setup currentPage={setupPage} />)}
                            exact={true}
                        />
                    </IonRouterOutlet>
                </IonReactRouter>
            )}
        </IonApp>
    )
}

export default App
