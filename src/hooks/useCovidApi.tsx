import axios, { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"

axios.defaults.baseURL = "https://covidapi-cb.wening.me"

type Response<T> = {
    response: T
    error: null | any
    loading: boolean
}

export type State = {
    id: number
    name: string
    population: number
    cases: number
    deaths: number
    casesPerWeek: number
    deathsPerWeek: number
    recovered: number
    abbreviation: string
    weekIncidence: number
    casesPer100k: number
    delta: {
        cases: number
        deaths: number
        recovered: number
    }
}

export type District = {
    ags: string
    name: string
    county: string
    state: string
    population: number
    cases: number
    deaths: number
    casesPerWeek: number
    deathsPerWeek: number
    stateAbbreviation: string
    recovered: number
    weekIncidence: number
    casesPer100k: number
    delta: {
        cases: number
        deaths: number
        recovered: number
    }
}

function useCovidApi(axiosParams: AxiosRequestConfig & { url: "/states" }): Response<{ data: { [key: string]: State } }>
function useCovidApi(
    axiosParams: AxiosRequestConfig & { url: "/districts" }
): Response<{ data: { [key: number]: District } }>

function useCovidApi(axiosParams: AxiosRequestConfig): Response<any> {
    const [response, setResponse] = useState<any>()
    const [error, setError] = useState<null | any>(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            const result = await axios.request(params)
            setResponse(result.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(axiosParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { response, error, loading }
}

export default useCovidApi
