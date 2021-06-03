import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Button from "../../Button"
import Dropdown from "../../Dropdown"
import Header from "../../Header"
import useCovidApi, { District, State } from "../../hooks/useCovidApi"

interface Props {}

const Configuration: React.FC<Props> = () => {
    const [states, setStates] = useState<State[]>([])
    const [districts, setDistricts] = useState<District[]>([])

    const [selectedDistrict, setSelectedDistrict] = useState<District>()
    const [selectedState, setSelectedState] = useState<State>()
    const { response, loading, error } = useCovidApi({
        method: "GET",
        url: "/states",
    })

    const { response: _districts, loading: _districtsLoading } = useCovidApi({ method: "GET", url: "/districts" })

    useEffect(() => {
        // continue
    }, [selectedDistrict])

    useEffect(() => {
        if (!loading && response) {
            const data = response.data
            const _states: State[] = []
            Object.keys(data).forEach(key => _states.push({ ...data[key] }))
            setStates(_states.sort((a, b) => compare(a, b, "name")))
        }
    }, [response, loading, error])

    const parseDistricts = (districts: { [key: number]: District }) => {
        var filtered = filter(districts, (obj: District) => obj.stateAbbreviation === selectedState?.abbreviation)
        const newDistricts: District[] = []
        Object.keys(filtered).forEach(key => newDistricts.push({ ...filtered[key], id: filtered[key].ags }))
        setDistricts(newDistricts.sort((a, b) => compare(a, b, "name")))
    }

    useEffect(() => {
        if (!_districtsLoading && _districts && selectedState) {
            console.log(_districts, _districtsLoading)
            const data = _districts.data

            parseDistricts(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_districts, _districtsLoading, selectedState])
    return (
        <div>
            <Header />
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold mb-2">Willkommen</h1>
                <p className="text-light-gray text-base tracking-tighter leading-4 max-w-xs mx-auto">
                    Um dir die wichtigsten Informationen kurz zusammenfassen können, benötigen wir einige Angaben von
                    dir, um unsere Inhalte bestmöglichst auf dich zuzuschneiden.
                </p>
                <Dropdown
                    heading={
                        <h1 className="text-lg mb-2 font-medium tracking-tighter text-left">
                            In welchem <span className="text-primary">Bundesland</span> lebst du?
                        </h1>
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
                                <h1 className="text-lg mb-2 font-medium tracking-tighter text-left">
                                    In welchem <span className="text-primary">Kreis</span> lebst du?
                                </h1>
                            }
                            initialHeader="Wähle einen Kreis"
                            list={districts}
                            callback={district => setSelectedDistrict(district)}
                        />
                    </motion.div>
                )}
            </div>
            <div className="absolute bottom-12 w-full flex justify-center">
                <Button disabled={!(selectedDistrict && selectedState)} className="mx-auto">
                    Weiter
                </Button>
            </div>
        </div>
    )
}

const filter = (obj: any, predicate: (district: District) => void) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        // eslint-disable-next-line no-sequences
        .reduce((res: any, key) => ((res[key] = obj[key]), res), {})

function compare(a: any, b: any, by: string) {
    if (a[by] < b[by]) {
        return -1
    }
    if (a[by] > b[by]) {
        return 1
    }
    return 0
}

export default Configuration
