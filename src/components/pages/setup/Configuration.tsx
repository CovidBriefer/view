import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Button from "../../Button"
import Dropdown from "../../Dropdown"
import Header from "../../Header"
import useCovidApi, { District, State } from "../../../hooks/useCovidApi"
import { Page } from "../../.."
import { formatStates, parseDistrictsByState, renameAmbiguousItems } from "../../../utils/format"

type Props = {
    updatePage: (page: Page) => void
    selectedState?: State
    selectedDistrict?: District
    setSelectedDistrict: React.Dispatch<React.SetStateAction<District | undefined>>
    setSelectedState: React.Dispatch<React.SetStateAction<State | undefined>>
}

const Configuration: React.FC<Props> = ({
    updatePage,
    selectedDistrict,
    selectedState,
    setSelectedDistrict,
    setSelectedState
}) => {
    const [states, setStates] = useState<State[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const { response, loading, error } = useCovidApi({
        method: "GET",
        url: "/states"
    })

    const { response: _districts, loading: _districtsLoading } = useCovidApi({ method: "GET", url: "/districts" })

    useEffect(() => {
        if (!loading && response) {
            const data = response.data
            setStates(formatStates(data))
        }
    }, [response, loading, error])

    useEffect(() => {
        if (!_districtsLoading && _districts && selectedState) {
            const data = _districts.data
            const parsed = parseDistrictsByState(data, selectedState)
            renameAmbiguousItems(parsed)
            setDistricts(parsed)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_districts, _districtsLoading, selectedState])
    return (
        <div>
            <div className="mt-16 px-8">
                <Header />
            </div>
            <div className="text-center mt-12">
                <h1 className="text-4xl font-bold mb-3">Willkommen</h1>
                <p className="text-light-gray text-lg tracking-tighter leading-5 max-w-xs mx-auto">
                    Um dir die wichtigsten Informationen kurz zusammenfassen zu können, benötigen wir einige Angaben von
                    dir.
                </p>
                <div className="px-6">
                    <Dropdown
                        heading={
                            <DropdownHeading>
                                In welchem <span className="text-primary">Bundesland</span> lebst du?
                            </DropdownHeading>
                        }
                        initialHeader="Wähle eine Bundesland"
                        list={states}
                        callback={state => setSelectedState(state)}
                    />
                    {selectedState && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.15 }}
                        >
                            <Dropdown
                                heading={
                                    <DropdownHeading>
                                        In welchem <span className="text-primary">Kreis</span> lebst du?
                                    </DropdownHeading>
                                }
                                initialHeader="Wähle einen Kreis"
                                list={districts}
                                callback={district => setSelectedDistrict(district)}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
            <div className="absolute bottom-16 w-full flex justify-center">
                <Button
                    disabled={!(selectedDistrict && selectedState)}
                    onClick={() => updatePage(null)}
                    className="mx-auto"
                >
                    Weiter
                </Button>
            </div>
        </div>
    )
}

const DropdownHeading: React.FC = ({ children }) => (
    <h1 className="text-xl mb-2 font-medium tracking-tighter text-left">{children}</h1>
)

export default Configuration
