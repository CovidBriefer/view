import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Button, { ClickEvent } from "../../../Button"
import Dropdown from "../../../Dropdown"
import { IoIosClose } from "react-icons/io"
import useCovidApi, { District, State } from "../../../../hooks/useCovidApi"
import { formatStates, parseDistrictsByState, renameAmbiguousItems } from "../../../../utils/format"
import { IncidenceItem } from "./Overview"

interface Props {
    incidenceItems: IncidenceItem[]
    setShowAppendModal: (show: boolean) => void
    addIncidenceItem: (item: IncidenceItem) => void
}

const AppendItemOverlay: React.FC<Props> = ({ setShowAppendModal, addIncidenceItem, incidenceItems }) => {
    const [currentSection, setCurrentSection] = useState<"selection" | "configuration">("selection")
    const [states, setStates] = useState<State[]>([])
    const { response, loading, error } = useCovidApi({
        method: "GET",
        url: "/states"
    })
    const { response: allDistricts, loading: allDistrictsLoading } = useCovidApi({ method: "GET", url: "/districts" })

    const [selectedItem, setSelectedItem] = useState<IncidenceItem>()

    // Handle districts section
    const [selectedState, setSelectedState] = useState<State>()
    const [districts, setDistricts] = useState<District[]>([])

    // const { response: _districts, loading: _districtsLoading } = useCovidApi({ method: "GET", url: "/districts" })
    const [type, setType] = useState<"state" | "district">()
    const handleTypeChange = (type: "state" | "district") => {
        setType(type)
        setCurrentSection("configuration")
    }

    useEffect(() => {
        if (!loading) {
            setStates(formatStates(response.data))
        }
    }, [response, loading, error])

    useEffect(() => {
        if (!allDistrictsLoading && selectedState) {
            const parsedDistricts = parseDistrictsByState(allDistricts.data, selectedState)
            renameAmbiguousItems(parsedDistricts)
            setDistricts(parsedDistricts)
        }
    }, [allDistricts, allDistrictsLoading, selectedState])

    const handleSelectionChange = (selection: any) => {
        setSelectedItem(selection)
    }

    const filterDuplicateItems = (items: (State | District)[]) => {
        return items.filter(element => {
            if ("abbreviation" in element) {
                return incidenceItems
                    .filter(i => i.type === "state")
                    .every(i => i.abbreviation !== element.abbreviation)
            } else {
                return incidenceItems.filter(i => i.type === "district").every(i => i.ags !== element.ags)
            }
        })
    }
    return (
        <motion.div
            className="bg-bg-light fixed py-10 w-full bottom-0 left-0 px-7"
            style={{
                filter: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.1))",
                borderRadius: "20px 20px 0 0"
            }}
            animate={{ y: "0%" }}
            initial={{ y: "100%" }}
            exit={{ y: "120%" }}
        >
            <motion.span
                animate={{ opacity: 1, transition: { delay: 0.15 } }}
                initial={{ opacity: 0 }}
                exit={{ y: "-100%" }}
                onClick={() => setShowAppendModal(false)}
            >
                <IoIosClose
                    size={20}
                    style={{ transform: "scale(2.5)" }}
                    className="mb-0 float-right fixed right-6 top-6"
                />
            </motion.span>
            <AnimatePresence exitBeforeEnter>
                {currentSection === "selection" ? (
                    <motion.div
                        key="type-selection"
                        animate={{ y: "0%", transition: { delay: 0.05 } }}
                        initial={{ y: "50%" }}
                        exit={{ scale: 0.9 }}
                        className="flex flex-col items-center h-64"
                    >
                        <h1 className="font-semibold text-3xl m-0 mt-4">Hinzufügen</h1>
                        <h3 className="m-0 font-medium text-xl my-2 mb-auto leading-6 text-center">
                            Möchtest du ein Bundesland oder einen Kreis hinzufügen?
                        </h3>
                        <AppendButton name="Bundesland" onClick={() => handleTypeChange("state")} />
                        <AppendButton name="Landkreis" onClick={() => handleTypeChange("district")} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="selection"
                        animate={{ scale: 1 }}
                        initial={{ scale: 0.9 }}
                        className="flex flex-col items-center h-64"
                    >
                        {type === "state" ? (
                            <>
                                <h1 className="font-semibold mb-0">Bundesland</h1>
                                <h3 className="font-normal text-lg m-0 mt-1 text-center leading-5">
                                    Wähle ein Bundesland um die Inzidenz in deinem Feed angezeigt zu bekommen.
                                </h3>
                                <div className="w-full -mt-3 mb-auto">
                                    <Dropdown
                                        callback={s => handleSelectionChange(s)}
                                        list={filterDuplicateItems(states)}
                                        heading=""
                                        dropShadow="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
                                        initialHeader="Wähle ein Bundesland"
                                        orientation="top"
                                    />
                                </div>
                                <AppendButton
                                    name="Hinzufügen"
                                    onClick={() => selectedItem && addIncidenceItem({ ...selectedItem, type: "state" })}
                                />
                            </>
                        ) : (
                            <div className="h-64 flex flex-col items-center w-full relative">
                                <h1 className="font-semibold mb-0"> Land-/Stadtkreis</h1>
                                <div className="w-full -my-4">
                                    <Dropdown
                                        callback={s => setSelectedState(s)}
                                        list={states}
                                        heading=""
                                        dropShadow="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
                                        initialHeader="Wähle ein Bundesland"
                                        orientation="top"
                                    />
                                </div>
                                <div className="w-full mb-3">
                                    {selectedState && (
                                        <Dropdown
                                            callback={s => handleSelectionChange(s)}
                                            list={districts}
                                            heading=""
                                            dropShadow="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
                                            initialHeader="Wähle einen Kreis"
                                            orientation="top"
                                        />
                                    )}
                                </div>
                                <AppendButton
                                    name="Hinzufügen"
                                    className="bottom-5 absolute"
                                    onClick={() =>
                                        selectedItem && addIncidenceItem({ ...selectedItem, type: "district" })
                                    }
                                />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export const AppendButton: React.FC<{ name: string; onClick?: (e: ClickEvent) => void; className?: string }> = ({
    name,
    onClick,
    className
}) => (
    <Button
        onClick={onClick}
        className={"cursor-pointer flex justify-center items-center mt-5 w-full" + (!!className ? ` ${className}` : "")}
    >
        <span className="text-bg-light w-full">{name}</span>
        {/* <FaArrowRight fill="rgb(31, 65, 96)" /> */}
    </Button>
)

export default AppendItemOverlay
