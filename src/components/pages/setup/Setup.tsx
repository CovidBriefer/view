import React, { useContext, useEffect, useState } from "react"
import { Config, Page } from "../../.."
import PageLayout from "../../PageLayout"
import Introduction from "./Introduction"
import { AnimatePresence, motion } from "framer-motion"
import Configuration from "./Configuration"
import { StorageContext } from "../../App"
import useStorage from "../../../hooks/useStorage"
import { History } from "history"
import { District, State } from "../../../hooks/useCovidApi"

type Props = {
    history?: History<unknown>
}

const variants = {
    show: { opacity: 1 },
    exit: { x: "-100%", transition: { duration: 0.3 } },
    initial: { opacity: 0 }
}

const secVariants = {
    show: { x: 0 },
    exit: { x: "-100%", transition: { duration: 0.3 } },
    initial: { x: "100%" }
}

const Setup: React.FC<Props> = ({ history }) => {
    const { store } = useContext(StorageContext)
    const [currentPage, setCurrentPage] = useState<Page>("introduction")
    const [config, setConfig] = useState<Config | null>(null)

    const [selectedDistrict, setSelectedDistrict] = useState<District>()
    const [selectedState, setSelectedState] = useState<State>()

    const { data: _config, loading: configLoading } = useStorage("config", true)
    const { data: _currentPage, loading: currentPageLoading } = useStorage("config.setup.currentPage", true)

    useEffect(() => {
        if (!configLoading && _config) setConfig(_config as Config)
    }, [_config, configLoading])

    useEffect(() => {
        if (!currentPageLoading && _currentPage) setCurrentPage(_currentPage as Page)
    }, [_currentPage, currentPageLoading])

    const updatePage = async (page: Page) => {
        const conf: any = { ...config }
        conf.setup.currentPage = page
        if (!page) {
            conf.setup.done = true
            setCurrentPage(null)
        }
        console.log("Updated page!")
        console.log("New config:", conf)
        await writeConfig(conf)
        setCurrentPage(page)
    }

    const writeConfig = async (conf: any) => {
        await store?.set("config", JSON.stringify(conf))
    }

    const finishSetup = async () => {
        console.log("Selected state:", selectedState)
        console.log("Selected district:", selectedDistrict)
        console.log("Current config:", config)
        const conf: any = { ...config }
        conf.incidence = {
            items: [
                { ...selectedState, type: "state" },
                { ...selectedDistrict, type: "district" }
            ],
            lastUpdate: Date.now()
        }
        console.log("Set new conf:", conf)
        await writeConfig(conf)
        history?.push("/home")
    }

    return (
        <PageLayout className="ml-auto w-screen">
            <AnimatePresence key={window.location.pathname} initial={true}>
                {currentPage === "introduction" ? (
                    <motion.div
                        variants={variants}
                        animate={"show"}
                        exit={"exit"}
                        initial={"initial"}
                        key="intro"
                        className="absolute top-0 left-0 w-full h-full"
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <Introduction updatePage={updatePage} />
                    </motion.div>
                ) : (
                    currentPage === "configuration" && (
                        <motion.div
                            variants={secVariants}
                            animate={"show"}
                            exit={"exit"}
                            onAnimationComplete={type => type === "exit" && finishSetup()}
                            key="config"
                            className="absolute top-0 left-0 w-full h-full"
                            initial={"initial"}
                            transition={{ duration: 0.3 }}
                        >
                            <Configuration
                                selectedDistrict={selectedDistrict}
                                selectedState={selectedState}
                                setSelectedDistrict={setSelectedDistrict}
                                setSelectedState={setSelectedState}
                                updatePage={updatePage}
                            />
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </PageLayout>
    )
}

export default Setup
