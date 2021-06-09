import { State } from "../hooks/useCovidApi"

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
