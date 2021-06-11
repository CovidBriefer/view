import React, { useEffect, useState } from "react"
import arrowUp from "../../../../assets/icons/arrow-up.svg"
import arrowDown from "../../../../assets/icons/arrow-down.svg"
import { IncidenceItem } from "./Overview"
// import useCovidHistory, { Params } from "../../../hooks/useCovidHistory"
import axios from "axios"
import useCovidHistory from "../../../../hooks/useCovidHistory"
import { motion } from "framer-motion"
import { FaTrashAlt } from "react-icons/fa"
import { IonSpinner } from "@ionic/react"

interface Props {
    data: IncidenceItem
    removeItem: (internalId: string) => void
    removable?: boolean
}

interface IncidenceDataItem extends IncidenceItem {
    weekIncidence: number
}

const Item: React.FC<Props> = ({ data, removeItem, removable = true }) => {
    const [showBin, setShowBin] = useState(false)
    const [incidenceData, setIncidenceData] = useState<IncidenceDataItem>()
    const { diffType, difference, loading } = useCovidHistory({
        type: data.type,
        param: data.type === "district" ? data.ags! : data.type === "state" ? data.abbreviation! : "",
        incidenceData: { weekIncidence: incidenceData?.weekIncidence }
    })

    const fetchIncidenceData = async () => {
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

    const handlePan = (pointInfo: any) => {
        const valid = pointInfo.offset.x < 0
        if (valid !== showBin) {
            setShowBin(pointInfo.offset.x < 0)
        }
    }

    return (
        <div className="overflow-hidden flex justify-center items-center">
            <motion.div
                animate={showBin && removable ? { x: -35 } : { x: 0 }}
                onPan={(_, pointInfo) => handlePan(pointInfo)}
                className="bg-bg-light px-5 py-3 my-3 flex items-center justify-between rounded"
                style={{ width: "100%", filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.075))" }}
            >
                <h3
                    className="text-lg text-light-gray font-medium m-0 w-1/2"
                    style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                    {incidenceData?.name ?? data.name}
                </h3>
                <div className="flex items-center">
                    <h1 className="text-2xl my-1 font-bold mr-4 m-0">
                        {Math.round((incidenceData?.weekIncidence ?? 0) * 10) / 10}
                    </h1>
                    {!loading ? (
                        <h4 className="m-0 flex items-center font-semibold">
                            <img
                                src={diffType === "inc" ? arrowUp : arrowDown}
                                width="21"
                                alt={diffType === "dec" ? "Absteigend" : "Aufsteigend"}
                                className="mr-2"
                            />
                            <p
                                className={
                                    (diffType === "inc" ? "text-increasing" : "text-decreasing") +
                                    " text-lg font-semibold"
                                }
                            >
                                {Math.round(difference * 10) / 10}
                            </p>
                        </h4>
                    ) : (
                        <IonSpinner name="crescent" />
                    )}
                </div>
            </motion.div>
            <motion.div
                onClick={() => removeItem(data.internalId)}
                className="m-0"
                initial={{ x: 50, opacity: 1, display: "none", scale: 0.5 }}
                animate={
                    removable && showBin
                        ? { x: -20, opacity: 1, scale: 1, display: "block" }
                        : { x: 20, opacity: 1, display: "none", scale: 0.5 }
                }
            >
                <FaTrashAlt size={25} fill="#e74c3c" />
            </motion.div>
        </div>
    )
}

export default Item
