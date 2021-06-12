import { IncidenceItem } from "../components/pages/home/incidence/Overview"
import { District, State } from "../hooks/useCovidApi"
import { generateId } from "./random"

export function formatStates(data: { [key: string]: State }) {
    const _states: State[] = []
    Object.keys(data).forEach(key => _states.push({ ...data[key] }))
    return _states.sort((a, b) => compare(a, b, "name"))
}

export function compare(a: any, b: any, by: string) {
    if (a[by] < b[by]) {
        return -1
    }
    if (a[by] > b[by]) {
        return 1
    }
    return 0
}

export function renameAmbiguousItems(data: District[]) {
    let previous = data[0]

    for (let i = 1; i < data.length; i++) {
        const current = data[i]
        if (previous.name === current.name) {
            if (previous.county.startsWith("LK")) {
                previous.name += " (Landkreis)"
            } else if (current.county.startsWith("LK")) {
                current.name += " (Landkreis)"
            }
        }
        previous = current
    }
    data.sort((a, b) => (a.name > b.name ? 1 : -1))
}

export function parseDistrictsByState(districts: { [key: number]: District }, selectedState: State) {
    var filtered = filter(districts, (obj: District) => obj.stateAbbreviation === selectedState?.abbreviation)
    const newDistricts: District[] = []
    Object.keys(filtered).forEach(key => newDistricts.push({ ...filtered[key], id: filtered[key].ags }))
    return newDistricts.sort((a, b) => compare(a, b, "name"))
}

const filter = (obj: any, predicate: (district: District) => void) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        // eslint-disable-next-line no-sequences
        .reduce((res: any, key) => ((res[key] = obj[key]), res), {})

export function formatStateToIncidenceItem(item: State): IncidenceItem {
    return {
        internalId: generateId(),
        name: item.name,
        type: "state",
        id: item.id,
        abbreviation: item.abbreviation
    }
}
export function formatDistrictToIncidenceItem(item: District): IncidenceItem {
    return {
        internalId: generateId(),
        name: item.name,
        type: "district",
        ags: item.ags,
        stateAbbreviation: item.stateAbbreviation
    }
}
