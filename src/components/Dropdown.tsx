import { motion, Variants } from "framer-motion"
import { AnimationDefinition } from "framer-motion/types/render/utils/animation"
import React, { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

interface Props {
    heading: JSX.Element
    list: any[]
}

const variants: Variants = {
    show: {
        opacity: 1,
    },
    hidden: {
        opacity: 0,
    },
}

const Dropdown: React.FC<Props> = ({ heading, list: initialList = [] }) => {
    const [isListOpen, setIsListOpen] = useState(false)
    const [headerTitle, setHeaderTitle] = useState("Select an item")
    const [listDisplay, setListDisplay] = useState<"hidden" | "show">("hidden")
    const [list, setList] = useState(initialList)

    const selectItem = (item: Item) => {
        setHeaderTitle(item.title)
        let temp: List = [...list]
        temp.map(i => {
            return item.id !== i.id ? (i.selected = false) : (i.selected = true)
        })
        setList(temp)
        setIsListOpen(false)
    }

    const toggleList = () => {
        setIsListOpen(prev => !prev)
        setListDisplay("show")
    }
    const listAnimationComplete = (type: AnimationDefinition) => {
        setListDisplay(type as "hidden" | "show")
    }
    return (
        <div className="dd-wrapper mt-10 w-5/6 mx-auto">
            {heading}
            <div
                onClick={toggleList}
                className="dd-header border-b-4 border-primary-dark bg-bg-light py-2 px-4 w-full text-base flex justify-between items-center mx-auto focus:outline-none"
            >
                <div className="dd-header-title">{headerTitle}</div>
                <span className="ml-3">{isListOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </div>
            <motion.div
                variants={variants}
                animate={isListOpen ? "show" : "hidden"}
                onAnimationComplete={listAnimationComplete}
                transition={{ duration: 0.25, delay: 0.1 }}
                initial="hidden"
                exit="hidden"
                role="list"
                className={"dd-list max-h-32 overflow-auto " + (listDisplay === "hidden" ? "hidden" : "block")}
            >
                {list.map(
                    item =>
                        !item.selected && (
                            <div
                                key={item.id}
                                onClick={() => selectItem(item)}
                                className={
                                    "bg-bg-light py-2 px-4 w-full text-base flex justify-between border-b-2 border-primary-dark items-center mx-auto focus:outline-none"
                                }
                            >
                                <div className="dd-list-item">{item.title}</div>
                            </div>
                        )
                )}
            </motion.div>
        </div>
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
