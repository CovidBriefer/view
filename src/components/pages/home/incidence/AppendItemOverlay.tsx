import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Button, { ClickEvent } from "../../../Button"
import Dropdown from "../../../Dropdown"
import { IoIosClose } from "react-icons/io"
import useCovidApi, { District, State } from "../../../../hooks/useCovidApi"
import { formatStates } from "../../../../utils/format"

interface Props {
    setShowAppendModal: (show: boolean) => void
    addIncidenceItem: (item: District | State) => void
}

const AppendItemOverlay: React.FC<Props> = ({ setShowAppendModal, addIncidenceItem }) => {
    const [currentSection, setCurrentSection] = useState<"selection" | "configuration">("selection")
    const [states, setStates] = useState<State[]>([])
    const { response, loading, error } = useCovidApi({
        method: "GET",
        url: "/states"
    })

    const [selectedItem, setSelectedItem] = useState<State | District>()

    // const { response: _districts, loading: _districtsLoading } = useCovidApi({ method: "GET", url: "/districts" })
    const [type, setType] = useState<"state" | "district">()
    const handleTypeChange = (type: "state" | "district") => {
        setType(type)
        setCurrentSection("configuration")
    }

    useEffect(() => {
        if (!loading) {
            console.log("Got states:", response)
            setStates(formatStates(response.data))
        }
    }, [response, loading, error])

    const handleSelectionChange = (selection: any) => {
        setSelectedItem(selection)
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
                        className="flex flex-col items-center"
                    >
                        <h1 className="font-semibold text-3xl m-0">Hinzufügen</h1>
                        <h3 className="m-0 font-medium text-xl my-2 leading-6 text-center">
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
                        className="flex flex-col items-center"
                    >
                        {type === "state" ? (
                            <>
                                <h1 className="font-semibold mb-0">Bundesland</h1>
                                <h3 className="font-medium text-xl my-2 -mb-1 leading-6 text-center">
                                    Dir wird die 7-Tage-Inzidenz und die Live-Entwicklung in deinem Feed angezeigt.
                                </h3>
                                <Dropdown
                                    callback={handleSelectionChange}
                                    list={[...states]}
                                    heading=""
                                    dropShadow="drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))"
                                    initialHeader="Wähle ein Bundesland"
                                    orientation="top"
                                />
                                <AppendButton
                                    name="Hinzufügen"
                                    onClick={() => selectedItem && addIncidenceItem(selectedItem)}
                                />
                            </>
                        ) : (
                            ""
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export const AppendButton: React.FC<{ name: string; onClick?: (e: ClickEvent) => void }> = ({ name, onClick }) => (
    <Button onClick={onClick} className="cursor-pointer flex justify-center items-center mt-5 w-full">
        <span className="text-bg-light w-full">{name}</span>
        {/* <FaArrowRight fill="rgb(31, 65, 96)" /> */}
    </Button>
)

export default AppendItemOverlay
