import React from "react"
import icon64 from "../assets/icons/icon-64.svg"

interface Props {}

const Header: React.FC<Props> = props => {
    return (
        <div className="mt-5 px-5">
            <img src={icon64} width="39" alt="Icon" />
        </div>
    )
}

export default Header
