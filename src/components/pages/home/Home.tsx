import React, { useEffect } from "react"
import useStorage from "../../../hooks/useStorage"
import Header from "../../Header"
import PageLayout from "../../PageLayout"
import Overview from "./incidence/Overview"
import { History } from "history"

const Home: React.FC<{ history?: History<unknown> }> = ({ history }) => {
    const { data: doneSetup, loading } = useStorage("config.setup.done", true)
    useEffect(() => {
        if (!loading && !doneSetup) history?.push("/")
    }, [doneSetup, history, loading])
    return (
        <PageLayout className="mt-2">
            <div className="px-3 mx-auto h-full">
                <Header showSettingsIcon={true} />
                <Overview />
            </div>
        </PageLayout>
    )
}

export default Home
