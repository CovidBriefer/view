import React from "react"
import Header from "../../Header"
import PageLayout from "../../PageLayout"
import Overview from "./incidence/Overview"

const Home: React.FC = () => {
    return (
        <PageLayout className="mt-2">
            <div className="px-2">
                <Header showSettingsIcon={true} />
                <Overview />
            </div>
        </PageLayout>
    )
}

export default Home
