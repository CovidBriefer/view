import { useContext, useEffect, useState } from "react"
import { StorageContext } from "../components/App"

function useStorage(key: string, parse: boolean = false) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const { store } = useContext(StorageContext)

    useEffect(() => {
        const split = key.split(".")
        const firstKey = split[0]
        store
            ?.get(firstKey)
            .then(res => {
                if (parse && res) {
                    const obj = JSON.parse(res)
                    if (split.slice(1)[0]) {
                        const newObj = byString(obj, split.slice(1).join("."))
                        setData(newObj)
                    } else {
                        setData(obj)
                    }
                }
            })
            .finally(() => setLoading(false))
    }, [key, parse, store])

    return { data, loading }
}

function byString(o: any, s: string) {
    s = s?.replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
    s = s?.replace(/^\./, "") // strip a leading dot
    var a = s?.split(".")
    if (!a) return o
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i]
        if (k in o) {
            o = o[k]
        } else {
            return
        }
    }
    return o
}

export default useStorage
