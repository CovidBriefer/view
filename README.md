# Covid Briefer Mobile App
> This repository contains the code for the Android/iOS app created with [React](https://reactjs.org), [Ionic components/styles](https://ionicframework.com) 
and [Capacitor](https://capacitorjs.com).

## Development

 ### General requirements
 - [NodeJS](https://nodejs.org) - JavaScript runtime environment
 - [Yarn](https://yarnpkg.com) - Package manager
 
 ### Device requirements for simulating
 
 <ins>MacOS</ins>
  - macOS 10.4.3 for the latest version of XCode
  - Intel processor for Android Emulations
  
  <ins>Windows</ins>
  - Graphics driver with OpenGL 2.0 or Windows DirectX 11

 ### Environment setup
 
 1. Install [VSCode](https://code.visualstudio.com/) or an editor of your choice.
 2. Download XCode from the AppStore for iOS simulations and/or [Android Studio](https://developer.android.com/studio) for Android simulations.
 3. Install dependencies by running `yarn install` in the root directory.

### Build and simulate
<ins>iOS device or simulator</ins>

Simulate on device using XCode and the Create-React-App server

 1. Copy the capacitor config
 
    ```console
    npx cap copy ios
    ```
    
 2. Sync the app with 
 
    ```console
    npx cap sync ios
    ```
    
 3. Open XCode by running 
 
    ```console
    npx cap open ios
    ```
    
 4. Select a device and start the simulator. Modified code will be shown live in the simulator.
 
---
Create production build/simulate without live server
 
 1. Remove the live-server config from `capacitor.config.ts`.
    Make sure that you do not commit any changes to this file as long as they are related to your IP/live server configuration.
    
    ```typescript
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
        // server: {
        //     url: `http://${getLocalExternalIP()}:3000`,
        //     cleartext: true
        // }
    }

    export default config
    ```
 2. Copy the capacitor config
 
    ```console
    npx cap copy ios
    ```
    
 3. Build and sync your changes
 
    ```console
    yarn run build-ios
    ```
    
 4. Open XCode, select a device and run it!

<ins>Android device or emulator</ins>

Emulate on device using Android Studio and the Create-React-App server

1. Copy the capacitor config

   ```console
   npx cap copy android
   ```

2. Sync the app with

   ```console
   npx cap sync android
   ```

3. Open Android Studio by running

   ```console
   npx cap open android
   ```

4. Select a device and start the emulator. Modified code will be shown live in the simulator.

---
Create production build/emulate without live server

1. Remove the live-server config from `capacitor.config.ts`.
   Make sure that you do not commit any changes to this file as long as they are related to your IP/live server configuration.

   ```typescript
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
       // server: {
       //     url: `http://${getLocalExternalIP()}:3000`,
       //     cleartext: true
       // }
   }

   export default config
   ```
2. Copy the capacitor config

   ```console
   npx cap copy android
   ```

3. Build and sync your changes

   ```console
   yarn run build-android
   ```

4. Open Android Studio, select a device and run it!

