import axios from "axios"
import { useEffect, useState } from "react"

export type Params = (StateParams | DistrictParams | FederationParams) & { incidenceData: { weekIncidence: number } }

type StateParams = {
    type: "state"
    abbreviation: string
}
type DistrictParams = {
    type: "district"
    ags: string
}
type FederationParams = {
    type: "germany"
}

export default function useCovidHistory(params: Params) {
    const [difference, setDifference] = useState(0)
    const [diffType, setDiffType] = useState<"inc" | "dec">("inc")

    useEffect(() => {
        console.log("Use covid history fired! Mann über Bord!", params)
        if (params.type === "germany") {
            axios.get("https://covidapi-cb.wening.me/germany/history/incidence/2").then(res => {
                const data = res.data.data
                const pastIncidence = data[0].weekIncidence
                console.log(pastIncidence, "PI")
                const diff = pastIncidence - params.incidenceData.weekIncidence
                console.log(
                    `Past incidence: ${pastIncidence}; Current incidence: ${params.incidenceData.weekIncidence}`
                )
                setDifference(Math.abs(diff))
                setDiffType(diff > 0 ? "dec" : "inc")
            })
        } else if (params.type === "state" || params.type === "district") {
            console.log("Got district or state")
            axios
                .get(
                    `https://covidapi-cb.wening.me/districts/${
                        params.type === "state" ? params.abbreviation : params.ags
                    }/history/incidence/2`
                )
                .then(res => {
                    const data = res.data.data
                    const obj = data[Object.keys(data)[0]]
                    const history = obj.history
                    console.log("History:", history)
                    const pastIncidence = history[0].weekIncidence
                    const diff = pastIncidence - params.incidenceData.weekIncidence
                    console.log(
                        `Past incidence: ${pastIncidence}; Current incidence: ${params.incidenceData.weekIncidence}`
                    )
                    setDifference(Math.abs(diff))
                    setDiffType(diff > 0 ? "dec" : "inc")
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { diffType, difference }
}
