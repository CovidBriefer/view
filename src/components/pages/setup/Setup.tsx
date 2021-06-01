import React, { useState } from "react"
import PageLayout from "../../PageLayout"
import Introduction from "./Introduction"

interface Props {}

export type Page = "introduction" | "configuration"
const Setup: React.FC<Props> = props => {
    const [currentPage, setCurrentPage] = useState<Page>("introduction")

    const updatePage = (page: Page) => setCurrentPage("configuration")

    return (
        <PageLayout className="ml-auto w-screen">
            {currentPage === "introduction" ? <Introduction updatePage={updatePage} /> : "Config"}
        </PageLayout>
    )
}

export default Setup
