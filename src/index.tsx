import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

import { ScreenOrientation } from "@ionic-native/screen-orientation"
import { StatusBar, Style } from "@capacitor/status-bar"
import { Storage } from "@capacitor/storage"

import "./styles/index.css"
import "./styles/tailwind.css"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

ScreenOrientation.lock("portrait")
StatusBar.setStyle({ style: Style.Dark })

Storage.get({ key: "initialized" }).then(res => {
    if (!res.value) {
        // set initial storage
        Storage.set({
            key: "config",
            value: JSON.stringify({ setup: false }),
        })
    }
})

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)
