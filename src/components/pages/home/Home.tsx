import React, { useEffect } from "react"
import useStorage from "../../../hooks/useStorage"
import Header from "../../Header"
import PageLayout from "../../PageLayout"
import Overview from "./incidence/Overview"
import { History } from "history"
import AppContextProvider from "../../../contexts/AppContext"

const Home: React.FC<{ history?: History<unknown> }> = ({ history }) => {
    const { data: doneSetup, loading } = useStorage("config.setup.done", true)

    useEffect(() => {
        if (!loading && !doneSetup) history?.push("/")
    }, [doneSetup, history, loading])
    return (
        <AppContextProvider>
            <PageLayout className="mt-2">
                <div className="px-3 mx-auto h-full">
                    <Header showSettingsIcon={false} />
                    <Overview />
                </div>
            </PageLayout>
        </AppContextProvider>
    )
}

export default Home
