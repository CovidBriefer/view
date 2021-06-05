import React, { useEffect, useState } from "react"
import { FaRegChartBar } from "react-icons/fa"
import useStorage from "../../../hooks/useStorage"
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

    useEffect(() => {
        if (cachedIncidenceItems || !cachedIncidenceItemsLoading) setIncidenceItems(cachedIncidenceItems)
    }, [cachedIncidenceItems, cachedIncidenceItemsLoading])

    return (
        <div className="mt-7">
            <div className="flex items-center">
                <FaRegChartBar size={25} className="mr-2" color="#56CEC0" />
                <h2 className="m-0 font-semibold text-2xl">Inzidenzentwicklung</h2>
            </div>
            <div className="w-full mt-5">
                <Item data={{ type: "germany", name: "Deutschland" }} />
                <Item
                    data={{
                        type: "state",
                        id: 2,
                        name: "Hamburg",
                        abbreviation: "HH"
                    }}
                />
                {incidenceItems.map((item: IncidenceItem) => (
                    <Item key={item.abbreviation ?? item.ags} data={item} />
                ))}
            </div>
        </div>
    )
}

export default Overview
