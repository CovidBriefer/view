import React, { useContext, useEffect, useState } from "react"
import { Config, Page } from "../../.."
import PageLayout from "../../PageLayout"
import Introduction from "./Introduction"
import { AnimatePresence, motion } from "framer-motion"
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
            <AnimatePresence key={window.location.pathname} initial={true}>
                {currentPage === "introduction" ? (
                    <motion.div
                        animate={{ opacity: 1 }}
                        exit={{ x: "-100%", transition: { duration: 0.3 } }}
                        initial={{ opacity: 0 }}
                        key="intro"
                        className="absolute top-0 left-0 w-full h-full"
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <Introduction updatePage={updatePage} />
                    </motion.div>
                ) : (
                    <motion.div
                        animate={{ x: 0 }}
                        exit={{ x: "100%", transition: { duration: 0.3 } }}
                        key="config"
                        className="absolute top-0 left-0 w-full h-full"
                        initial={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                    >
                        <Configuration />
                    </motion.div>
                )}
            </AnimatePresence>
        </PageLayout>
    )
}

export default Setup
