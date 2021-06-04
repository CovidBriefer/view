import React from "react"
import arrowUp from "../../../../assets/icons/arrow-up.svg"
import arrowDown from "../../../../assets/icons/arrow-down.svg"
import { IncidenceData } from "./Overview"
import useCovidHistory, { Params } from "../../../hooks/useCovidHistory"

export type IncidenceType = "germany" | "state" | "district"

interface Props {
    type: IncidenceType
    data: IncidenceData
}

const Item: React.FC<Props> = ({ data, type }) => {
    const params_ = { incidenceData: { weekIncidence: data.weekIncidence } }
    const params =
        type === "district"
            ? { ...params_, type: "district", ags: data.ags! }
            : type === "state"
            ? { ...params_, type: "state", abbreviation: data.abbreviation! }
            : { ...params_, type: "germany" }

    const { diffType, difference } = useCovidHistory(params as Params)

    return (
        <div className="bg-bg-light px-5 py-3 my-3 flex items-center justify-between rounded" style={{ width: "100%" }}>
            <h3
                className="text-lg text-light-gray font-medium m-0 w-1/2"
                style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
            >
                {data.name}
            </h3>
            <div className="flex">
                <h1 className="text-2xl my-1 font-bold mr-4 m-0">{Math.round(data.weekIncidence * 10) / 10}</h1>
                {difference !== 0 && (
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
