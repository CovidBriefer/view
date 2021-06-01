import React from "react"
import icon128 from "../../assets/icons/icon-128.svg"
import PageLayout from "../PageLayout"

interface Props {}

const Setup: React.FC<Props> = props => {
    return (
        <PageLayout>
            <img src={icon128} alt="Icon" />
            <h1>
                Covid<span>Briefer</span>
            </h1>
        </PageLayout>
    )
}

export default Setup
