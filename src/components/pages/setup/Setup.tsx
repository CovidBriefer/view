import React from "react"
import icon128 from "../../../assets/icons/icon-128.svg"
import PageLayout from "../../PageLayout"

import Button from "../../Button"

interface Props {}

const Setup: React.FC<Props> = props => {
    return (
        <PageLayout className="ml-auto w-screen">
            <div className="setup-start-wrapper h-2/3 px-5 flex flex-col items-center justify-between">
                <div className="flex flex-col items-center mt-5">
                    <img src={icon128} width="130" alt="Icon" />
                    <h1 className="text-4xl font-bold mt-5 tracking-tighter">
                        Covid<span className="text-primary">Briefer</span>
                    </h1>
                    <p className="text-light-gray text-l text-center leading-5 mt-2">
                        Inzidenz, Tagesnews und mehr! Alle Informationen auf einen Blick.
                    </p>
                </div>
                <Button>Los geht’s</Button>
            </div>
        </PageLayout>
    )
}

export default Setup
