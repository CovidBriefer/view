import axios from "axios"
import { useEffect, useState } from "react"
import { IncidenceType } from "../pages/home/incidence/Overview"

export type HistoryParams = {
    type: IncidenceType
    param: string
} & {
    incidenceData: { weekIncidence?: number }
}
export default function useCovidHistory(options: HistoryParams) {
    const [difference, setDifference] = useState(0)
    const [diffType, setDiffType] = useState<"inc" | "dec">("inc")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!!options.incidenceData.weekIncidence) {
            if (options.type === "germany") {
                axios.get("https://covidapi-cb.wening.me/germany/history/incidence/2").then(res => {
                    const data = res.data.data
                    const pastIncidence = data[0].weekIncidence
                    const diff = pastIncidence - options.incidenceData.weekIncidence!
                    setDifference(Math.abs(diff))
                    setDiffType(diff > 0 ? "dec" : "inc")
                })
            } else if (options.type === "state" || options.type === "district") {
                axios
                    .get(`https://covidapi-cb.wening.me/${options.type}s/${options.param}/history/incidence/2`)
                    .then(res => {
                        const data = res.data.data
                        const obj = data[Object.keys(data)[0]]
                        const history = obj.history
                        const pastIncidence = history[0].weekIncidence
                        const diff = pastIncidence - options.incidenceData.weekIncidence!
                        setDifference(Math.abs(diff))
                        setDiffType(diff > 0 ? "dec" : "inc")
                    })
            }
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.incidenceData.weekIncidence])

    return { diffType, difference, loading }
}
