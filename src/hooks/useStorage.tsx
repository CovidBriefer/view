import { useCallback } from "react"
import { useContext, useEffect, useState } from "react"
import { StorageContext } from "../components/App"

function useStorage(key: string, parse: boolean = false) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const { store } = useContext(StorageContext)
    const split = key.split(".")
    const firstKey = split[0]

    const readData = useCallback(() => {
        return store
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateData = async (newValue: any) => {
        if (split.slice(1)[0]) {
            const baseItem = JSON.parse(await store?.get(firstKey))
            let current = baseItem
            for (let i = 1; i < split.length - 1; i++) {
                current = current[split[i]]
            }
            current[split[split.length - 1]] = newValue
            await store?.set(firstKey, JSON.stringify(baseItem))
        } else {
            await store?.set(firstKey, JSON.stringify(newValue))
        }

        await readData()
    }

    useEffect(() => {
        readData()
    }, [readData])

    return { data, loading, update: updateData }
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
