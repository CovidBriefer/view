import React, { useEffect } from "react"
import { useSocket } from "../../../contexts/SocketProvider"
import Header from "../../Header"
import PageLayout from "../../PageLayout"
import Overview from "./incidence/Overview"

const Home: React.FC = () => {
    const socket = useSocket()

    useEffect(() => {
        socket?.on("message", data => {
            console.log("Socket data:", data)
        })
    }, [socket])
    return (
        <PageLayout className="mt-2">
            <div className="px-3 mx-auto">
                <Header showSettingsIcon={true} />
                <Overview />
            </div>
        </PageLayout>
    )
}

export default Home
