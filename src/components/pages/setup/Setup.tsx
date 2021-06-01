import React from "react"
import icon128 from "../../assets/icons/icon-128.svg"
import PageLayout from "../../PageLayout"

interface Props {}

const Setup: React.FC<Props> = props => {
    return (
        <PageLayout>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <img src={icon128} width="100" height="100" alt="Icon" />
                    <h1 className="text-4xl font-bold">
                        Covid<span className="text-primary">Briefer</span>
                    </h1>
                    <p className="text-light-gray text-center">
                        Inzidenz, Tagesnews und mehr. Alle Informationen auf einen Blick.
                    </p>
                </div>
                <button></button>
            </div>
        </PageLayout>
    )
}

export default Setup
