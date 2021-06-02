import React, { useContext, useEffect, useState } from "react"
import { Config, Page } from "../../.."
import PageLayout from "../../PageLayout"
import Introduction from "./Introduction"
import { motion } from "framer-motion"
import Configuration from "./Configuration"
import { StorageContext } from "../../App"
import useStorage from "../../hooks/useStorage"

const Setup: React.FC = () => {
    const { store } = useContext(StorageContext)
    const [currentPage, setCurrentPage] = useState<Page>("introduction")
    const [config, setConfig] = useState<Config | null>(null)

    const { data: _config, loading: _configLoading } = useStorage("config", true)
    const { data: _currentPage, loading: currentPageLoading } = useStorage("config.setup.currentPage", true)

    useEffect(() => {
        if (!_configLoading && _config) {
            setConfig(_config as Config)
        }
    }, [_config, _configLoading])

    useEffect(() => {
        if (!currentPageLoading && _currentPage) {
            setCurrentPage(_currentPage as Page)
        }
    }, [_currentPage, currentPageLoading])

    const updatePage = (page: Page) => {
        const conf: any = { ...config }
        conf.setup.currentPage = page
        store?.set("config", JSON.stringify(conf))
        setCurrentPage(page)
    }

    return (
        <PageLayout className="ml-auto w-screen">
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.1 }}>
                {currentPage === "introduction" ? <Introduction updatePage={updatePage} /> : <Configuration />}
            </motion.div>
        </PageLayout>
    )
}

export default Setup
