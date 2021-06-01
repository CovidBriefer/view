import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { IonReactRouter } from "@ionic/react-router"

import { Storage } from "@capacitor/storage"
// import Loading from "./Loading"
import Setup from "./setup/Setup"
import Home from "./Home"
import { IonApp, IonRouterOutlet } from "@ionic/react"

const App: React.FC = () => {
    const [showSetup, setShowSetup] = useState(false)
    useEffect(() => {
        Storage.get({ key: "config" }).then(res => {
            const data: { setup: boolean } = JSON.parse(res.value!!)
            if (!data.setup) setShowSetup(true)
        })
    }, [])
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" component={showSetup ? Setup : Home} exact={true} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default App
