import { motion, Variants } from "framer-motion"
import { AnimationDefinition } from "framer-motion/types/render/utils/animation"
import React, { useEffect, useState } from "react"
import { FaAngleDown } from "react-icons/fa"

interface Props {
    heading: JSX.Element | string
    list: any[]
    initialHeader?: string
    callback: (selection: any) => void
    orientation?: "top" | "bottom"
    dropShadow?: "none" | (string & {})
}

const variants: Variants = {
    show: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}

const Dropdown: React.FC<Props> = ({
    heading,
    list: initialList,
    initialHeader,
    callback,
    orientation = "bottom",
    dropShadow = "none"
}) => {
    const [isListOpen, setIsListOpen] = useState(false)
    const [headerTitle, setHeaderTitle] = useState(initialHeader || "Select an item")
    const [listDisplay, setListDisplay] = useState<"hidden" | "show">("hidden")
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        setList(initialList)
        setHeaderTitle(initialHeader || "Select an item")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialList])

    const selectItem = (item: any) => {
        setHeaderTitle(item.name)
        setIsListOpen(false)
        let temp: List = [...list]
        temp.map(i => {
            return item.id !== i.id ? (i.selected = false) : (i.selected = true)
        })
        setList(temp)
        callback(item)
    }

    const toggleList = () => {
        setIsListOpen(prev => !prev)
        setListDisplay("show")
    }
    const listAnimationComplete = (type: AnimationDefinition) => {
        setListDisplay(type as "hidden" | "show")
    }
    return (
        <div className="dd-wrapper mt-10 w-full mx-auto relative" style={{ filter: dropShadow }}>
            {heading}
            <div
                onClick={toggleList}
                style={{ background: "#254866" }}
                className="dd-header text-lg border-b-2 border-primary-dark py-1 px-4 w-full flex justify-between items-center mx-auto focus:outline-none"
            >
                <div className="dd-header-title">{headerTitle}</div>
                <motion.span
                    initial={{ transform: "rotate(0)" }}
                    transition={{ duration: 0.18 }}
                    animate={isListOpen ? { transform: "rotate(180deg)" } : { transform: "rotate(0deg)" }}
                >
                    <FaAngleDown />
                </motion.span>
            </div>
            <motion.div
                variants={variants}
                animate={isListOpen ? "show" : "hidden"}
                onAnimationComplete={listAnimationComplete}
                transition={{ duration: 0.15, delay: 0.1 }}
                initial="hidden"
                exit="hidden"
                role="list"
                className={
                    (orientation === "top" ? "bottom-10 " : "") +
                    "dd-list max-h-32 overflow-auto w-full z-50 " +
                    (listDisplay === "hidden" ? "hidden" : "absolute")
                }
            >
                {list.map(
                    item =>
                        !item.selected && (
                            <div
                                key={item.id}
                                onClick={() => selectItem(item)}
                                style={{
                                    background: "#254866",
                                    borderColor: "#173752",
                                    borderBottomWidth: "1px"
                                }}
                                className={
                                    "py-2 px-4 w-full text-lg flex justify-between items-center mx-auto focus:outline-none"
                                }
                            >
                                <div className="dd-list-item">{item.name}</div>
                            </div>
                        )
                )}
            </motion.div>
        </div>
        // </div>
    )
}

type Item = {
    id: number
    title: string
    selected: boolean
    key: string
}

type List = Item[]

export default Dropdown
