import React, { useState } from "react"
import { Page } from "../../.."
import PageLayout from "../../PageLayout"
import Introduction from "./Introduction"
import { AnimatePresence, motion } from "framer-motion"
import Configuration from "./Configuration"
import useStorage from "../../../hooks/useStorage"
import { History } from "history"
import { District, State } from "../../../hooks/useCovidApi"
import { formatDistrictToIncidenceItem, formatStateToIncidenceItem } from "../../../utils/format"

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
    const [selectedDistrict, setSelectedDistrict] = useState<District>()
    const [selectedState, setSelectedState] = useState<State>()

    const { data: currentPage, update: updateCurrentPage } = useStorage("config.setup.currentPage", true)
    const { update: updateDone } = useStorage("config.setup.done", true)
    const { update: updateIncidenceItems } = useStorage("config.incidence.items", true)

    const updatePage = async (page: Page) => {
        await updateCurrentPage(page)
        await updateDone(!page)
    }
    const finishSetup = async () => {
        if (selectedState?.name && selectedDistrict?.name) {
            await updateIncidenceItems([
                formatStateToIncidenceItem(selectedState),
                formatDistrictToIncidenceItem(selectedDistrict)
            ])
            history?.push("/home")
        }
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
