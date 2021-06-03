import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "me.wening.covidbriefer",
    appName: "Covid Briefer",
    webDir: "build",
    bundledWebRuntime: false,
    server: {
        url: "http://192.168.1.4:3000",
        cleartext: true,
    },
}

export default config
