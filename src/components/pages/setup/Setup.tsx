import React, { useState } from "react"
import { Page } from "../../.."
import PageLayout from "../../PageLayout"
import Introduction from "./Introduction"
import { motion } from "framer-motion"

interface Props {
    currentPage?: Page | null
}

const Setup: React.FC<Props> = ({ currentPage: page }) => {
    const [currentPage, setCurrentPage] = useState<Page>(page || "introduction")

    console.log(page, "CURRENT PAGE")
    const updatePage = (page: Page) => setCurrentPage("configuration")

    return (
        <PageLayout className="ml-auto w-screen">
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.1 }}>
                {currentPage === "introduction" ? <Introduction updatePage={updatePage} /> : "Config"}
            </motion.div>
        </PageLayout>
    )
}

export default Setup
