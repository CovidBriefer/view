import React, { useEffect, useState } from "react"
import arrowUp from "../../../../assets/icons/arrow-up.svg"
import arrowDown from "../../../../assets/icons/arrow-down.svg"
import { IncidenceData } from "./Overview"
import axios from "axios"

export type IncidenceType = "germany" | "state" | "district"

interface Props {
    type: IncidenceType
    data: IncidenceData
}

const Item: React.FC<Props> = ({ data, type }) => {
    // const [incidenceHistory, setIncidenceHistory] = useState()
    const [pastIncidence, setPastIncidence] = useState(0)
    const [difference, setDifference] = useState(0)
    const [diffType, setDiffType] = useState<"inc" | "dec">("inc")

    useEffect(() => {
        const base = `https://covidapi-cb.wening.me/${type !== "germany" ? type + "s" : type}`
        const postfix = "history/incidence/2"
        let url = ""
        url =
            base +
            `/${type === "state" ? data.abbreviation + "/" : type === "district" ? data.ags + "/" : ""}${postfix}`
        axios.get(url).then(res => {
            if (res) {
                const pastData = res.data.data
                if (type === "germany") {
                    setPastIncidence(pastData[0].weekIncidence)
                    const diff = pastIncidence - data.weekIncidence
                    setDifference(+diff)
                    setDiffType(diff > 0 ? "dec" : "inc")
                } else {
                    // pastData[key].history[0]
                    console.log("")
                    const obj = pastData[Object.keys(pastData)[0]]
                    const history = obj.history
                    setPastIncidence(history[0].weekIncidence)
                    const diff = pastIncidence - data.weekIncidence
                    console.log(`Past incidence: ${pastIncidence}; Current incidence: ${data.weekIncidence}`)
                    console.log(diff, history)
                    setDifference(Math.abs(diff))
                    setDiffType(diff > 0 ? "dec" : "inc")
                }
            }
        })
    }, [pastIncidence, data.weekIncidence, type, data.abbreviation, data.ags])

    return (
        <div className="bg-bg-light px-5 py-3 my-3 flex items-center justify-between rounded" style={{ width: "100%" }}>
            <h3
                className="text-lg text-light-gray font-medium m-0 w-1/2"
                style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
            >
                {data.name}
            </h3>
            <h1 className="text-2xl my-1 font-bold m-0">{Math.round(data.weekIncidence * 10) / 10}</h1>
            {difference !== 0 && (
                <h4 className="m-0 flex items-center font-semibold">
                    <img
                        src={diffType === "inc" ? arrowUp : arrowDown}
                        width="16"
                        alt={diffType === "dec" ? "Absteigend" : "Aufsteigend"}
                        className="mr-2"
                    />
                    <p
                        className={
                            (diffType === "inc" ? "text-increasing" : "text-decreasing") + " text-base font-semibold"
                        }
                    >
                        {Math.round(difference * 100) / 100}
                    </p>
                </h4>
            )}
        </div>
    )
}

export default Item
