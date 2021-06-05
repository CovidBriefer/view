import React, { useEffect, useState } from "react"
import arrowUp from "../../../../assets/icons/arrow-up.svg"
import arrowDown from "../../../../assets/icons/arrow-down.svg"
import { IncidenceItem } from "./Overview"
// import useCovidHistory, { Params } from "../../../hooks/useCovidHistory"
import axios from "axios"
import useCovidHistory from "../../../hooks/useCovidHistory"

interface Props {
    data: IncidenceItem
}

interface IncidenceDataItem extends IncidenceItem {
    weekIncidence: number
}

const Item: React.FC<Props> = ({ data }) => {
    const [incidenceData, setIncidenceData] = useState<IncidenceDataItem>()
    const { diffType, difference, loading } = useCovidHistory({
        type: data.type,
        param: data.type === "district" ? data.ags! : data.type === "state" ? data.abbreviation! : "",
        incidenceData: { weekIncidence: incidenceData?.weekIncidence }
    })

    const fetchIncidenceData = () => {
        let url = "https://covidapi-cb.wening.me"
        if (data.type === "district") {
            url += `/districts/${data.ags}`
        } else if (data.type === "state") url += `/states/${data.stateAbbreviation}`
        else url += "/germany"
        axios.get(url).then(res => {
            if (data.type === "district" || data.type === "state") {
                setIncidenceData(res.data.data[data.ags! ?? data.abbreviation])
            } else {
                setIncidenceData(res.data)
            }
        })
    }

    useEffect(() => {
        fetchIncidenceData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="bg-bg-light px-5 py-3 my-3 flex items-center justify-between rounded" style={{ width: "100%" }}>
            <h3
                className="text-lg text-light-gray font-medium m-0 w-1/2"
                style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
            >
                {incidenceData?.name ?? data.name}
            </h3>
            <div className="flex">
                <h1 className="text-2xl my-1 font-bold mr-4 m-0">
                    {Math.round((incidenceData?.weekIncidence ?? 0) * 10) / 10}
                </h1>
                {difference !== 0 && !loading && (
                    <h4 className="m-0 flex items-center font-semibold">
                        <img
                            src={diffType === "inc" ? arrowUp : arrowDown}
                            width="21"
                            alt={diffType === "dec" ? "Absteigend" : "Aufsteigend"}
                            className="mr-2"
                        />
                        <p
                            className={
                                (diffType === "inc" ? "text-increasing" : "text-decreasing") + " text-lg font-semibold"
                            }
                        >
                            {Math.round(difference * 10) / 10}
                        </p>
                    </h4>
                )}
            </div>
        </div>
    )
}

export default Item
