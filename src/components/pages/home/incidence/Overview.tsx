import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useRef } from "react"
import { FaRegChartBar, FaPlus } from "react-icons/fa"
import useStorage from "../../../../hooks/useStorage"
import { generateId } from "../../../../utils/random"
// import { StorageContext } from "../../../App"
import AppendItemOverlay from "./AppendItemOverlay"
import Item from "./Item"

export type IncidenceType = "germany" | "state" | "district"

export type IncidenceItem = {
    internalId: string
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
    const { data: lastUpdated, update: updateLastUpdated } = useStorage("config.incidence.lastUpdated", true)
    const {
        data: incidenceItems,
        update: updateIncidenceItems
    }: { data: IncidenceItem[]; update: (newValue: any) => Promise<void> } = useStorage("config.incidence.items", true)
    const [showAppendModal, setShowAppendModal] = useState(false)

    const updatedItemKeys = useRef<string[]>([])

    const createUpdateCallback = (internalId: string) => {
        return () => {
            updatedItemKeys.current.push(internalId)
            if (incidenceItems && incidenceItems.every(item => updatedItemKeys.current.includes(item.internalId))) {
                allItemsUpdated()
                updatedItemKeys.current = []
            }
        }
    }

    const allItemsUpdated = async () => {
        await updateLastUpdated(Date.now())
    }

    const addIncidenceItem = async (item: IncidenceItem) => {
        const itemToSet: IncidenceItem =
            item.type === "state"
                ? {
                      internalId: generateId(),
                      name: item.name,
                      type: "state",
                      abbreviation: item.abbreviation
                  }
                : {
                      internalId: generateId(),
                      name: item.name,
                      type: "district",
                      stateAbbreviation: item.stateAbbreviation,
                      ags: item.ags
                  }
        await updateIncidenceItems([...incidenceItems, itemToSet])
        setShowAppendModal(false)
    }

    const removeItem = async (id: string) => {
        const filtered = [...incidenceItems].filter(e => e.internalId !== id)
        await updateIncidenceItems(filtered)
    }

    return (
        <div className="mt-7 overflow-auto" style={{ height: "80%" }}>
            <div className="flex items-center">
                <FaRegChartBar size={25} className="mr-2" color="#56CEC0" fill="#56CEC0" />
                <h2 className="m-0 font-semibold text-2xl">Inzidenzentwicklung</h2>
            </div>
            <div className="w-full mt-5 h-full">
                <Item
                    updateCallback={createUpdateCallback("2984u592u34239428938492dkaj38")}
                    data={{
                        type: "germany",
                        name: "Deutschland",
                        internalId: "2984u592u34239428938492dkaj38",
                        lastUpdated
                    }}
                    removable={false}
                />
                {incidenceItems &&
                    incidenceItems.map((item: IncidenceItem) => (
                        <Item
                            updateCallback={createUpdateCallback(item.internalId)}
                            // lastUpdated={lastUpdated}
                            removeItem={removeItem}
                            key={item.internalId}
                            data={{ ...item, lastUpdated }}
                        />
                    ))}
                <motion.button
                    className={
                        "w-full flex items-center justify-center setup-button mt-6 py-2 bg-bg-light px-20 focus:outline-non font-semibold tracking-tighter text-lg"
                    }
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAppendModal(true)}
                >
                    <FaPlus className="m-0 mr-2" size={18} fill="#D3D3D3" />
                    <span style={{ color: "#D3D3D3" }} className="font-bold text-lg">
                        Hinzufügen
                    </span>
                </motion.button>
            </div>
            <AnimatePresence>
                {showAppendModal && (
                    <AppendItemOverlay
                        incidenceItems={incidenceItems}
                        addIncidenceItem={addIncidenceItem}
                        setShowAppendModal={setShowAppendModal}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default Overview
