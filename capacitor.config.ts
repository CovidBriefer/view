import { CapacitorConfig } from "@capacitor/cli"
import { networkInterfaces } from "os"

const getLocalExternalIP = () =>
    []
        .concat(...Object.values(networkInterfaces()))
        .filter(details => details.family === "IPv4" && !details.internal)
        .pop().address

const config: CapacitorConfig = {
    appId: "me.wening.covidbriefer",
    appName: "Covid Briefer",
    webDir: "build",
    bundledWebRuntime: false,
    server: {
        url: `http://${getLocalExternalIP()}:3000`,
        cleartext: true
    }
}

export default config
