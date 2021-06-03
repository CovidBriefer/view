import React from "react"
import icon128 from "../../../assets/icons/icon-128.svg"
import Button from "../../Button"
import { Page } from "../../../"

interface Props {
    updatePage: (page: Page) => void
}

const Introduction: React.FC<Props> = ({ updatePage }) => {
    return (
        <>
            <div className="setup-start-wrapper h-3/6 px-5 flex flex-col items-center justify-start">
                <div className="flex flex-col items-center mt-5">
                    <img src={icon128} width="130" alt="Icon" />
                    <h1 className="text-4xl font-bold mt-5 tracking-tighter">
                        Covid<span className="text-primary">Briefer</span>
                    </h1>
                    <p className="text-light-gray text-l text-center leading-5 mt-2">
                        Inzidenz, Tagesnews und mehr! Alle Informationen auf einen Blick.
                    </p>
                </div>
            </div>
            <div className="absolute bottom-16 w-full flex justify-center">
                <Button className="mx-auto" onClick={() => updatePage("configuration")}>
                    Los geht’s
                </Button>
            </div>
        </>
    )
}

export default Introduction
