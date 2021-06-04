import { IonLoading } from "@ionic/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FaRegChartBar } from "react-icons/fa"
import useStorage from "../../../hooks/useStorage"
import Item, { IncidenceType } from "./Item"

export type IncidenceData = {
    type: IncidenceType
    id?: number
    name: string
    ags?: string
    population?: number
    cases: number
    deaths: number
    casesPerWeek: number
    deathsPerWeek?: number
    recovered: number
    abbreviation?: string
    weekIncidence: number
    casesPer100k: number
    incidenceHistory: {
        weekIncidence: number
        date: string
    }[]
    delta: {
        cases: number
        deaths: number
        recovered: number
    }
}

const Overview: React.FC = () => {
    const { data: incidenceItems, loading: incidenceItemsLoading } = useStorage("config.incidence.items", true)
    const [germanyData, setGermanyData] = useState<IncidenceData | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("https://covidapi-cb.wening.me/germany").then(res => {
            console.log(res.data)
            const data = res.data
            // delete data.meta
            setGermanyData({ ...data, name: "Deutschland" })
            setLoading(false)
        })
    }, [])

    return (
        <div className="mt-7">
            <div className="flex items-center">
                <FaRegChartBar size={25} className="mr-2" color="#56CEC0" />
                <h2 className="m-0 font-semibold text-2xl">Inzidenzentwicklung</h2>
            </div>
            {!loading && !incidenceItemsLoading ? (
                <div className="w-full mt-5">
                    <Item type="germany" data={germanyData!!} />
                    {incidenceItems.map((item: IncidenceData, i: number) => (
                        <Item key={i} type={item.type} data={item} />
                    ))}
                </div>
            ) : (
                <IonLoading
                    isOpen={loading}
                    spinner="crescent"
                    cssClass="ion-loading-custom"
                    animated={false}
                    showBackdrop={false}
                />
            )}
        </div>
    )
}

export default Overview
