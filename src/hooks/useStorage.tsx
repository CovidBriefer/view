import { GetResult, Storage } from "@capacitor/storage"
import { useEffect, useState } from "react"

function useStorage(key: string, delay: number = 0) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<GetResult | null>(null)

    const readData = () => {
        setTimeout(() => {
            Storage.get({ key })
                .then(res => setData(res))
                .finally(() => setLoading(false))
        }, delay)
    }
    useEffect(() => {
        readData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { data, loading }
}

export default useStorage
