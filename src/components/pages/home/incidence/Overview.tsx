import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { FaRegChartBar, FaPlus } from "react-icons/fa"
import useStorage from "../../../../hooks/useStorage"
import AppendItemOverlay from "./AppendItemOverlay"
import Item from "./Item"

export type IncidenceType = "germany" | "state" | "district"

export type IncidenceItem = {
    type: IncidenceType
    id?: number
    name: string
    ags?: string
    stateAbbreviation?: string
    state?: string
    county?: string
    abbreviation?: string
}

const Overview: React.FC = () => {
    const { data: cachedIncidenceItems, loading: cachedIncidenceItemsLoading } = useStorage(
        "config.incidence.items",
        true
    )
    const [incidenceItems, setIncidenceItems] = useState<IncidenceItem[]>([])
    const [showAppendModal, setShowAppendModal] = useState(false)

    useEffect(() => {
        if (cachedIncidenceItems || !cachedIncidenceItemsLoading) setIncidenceItems(cachedIncidenceItems)
    }, [cachedIncidenceItems, cachedIncidenceItemsLoading])

    return (
        <div className="mt-7">
            <div className="flex items-center">
                <FaRegChartBar size={25} className="mr-2" color="#56CEC0" fill="#56CEC0" />
                <h2 className="m-0 font-semibold text-2xl">Inzidenzentwicklung</h2>
            </div>
            <div className="w-full mt-5">
                <Item data={{ type: "germany", name: "Deutschland" }} />
                {incidenceItems &&
                    incidenceItems.map((item: IncidenceItem) => (
                        <Item key={item.abbreviation ?? item.ags} data={item} />
                    ))}
                <motion.button
                    className={
                        "w-full flex items-center justify-center setup-button mt-6 py-2 bg-bg-light px-20 focus:outline-non font-semibold tracking-tighter text-lg"
                    }
                    whileTap={{ scale: 0.97 }}
                    onClick={() => !showAppendModal && setShowAppendModal(true)}
                >
                    <FaPlus className="m-0 mr-2" size={18} fill="#D3D3D3" />
                    <span style={{ color: "#D3D3D3" }} className="font-bold text-lg">
                        Hinzufügen
                    </span>
                </motion.button>
            </div>
            <AnimatePresence>
                {showAppendModal && <AppendItemOverlay setShowAppendModal={setShowAppendModal} />}
            </AnimatePresence>
        </div>
    )
}

export default Overview
