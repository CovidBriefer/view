import React from "react"
import icon64 from "../assets/icons/icon-64.svg"
import { FaCog } from "react-icons/fa"

type Props = {
    showSettingsIcon?: boolean
}

const Header: React.FC<Props> = ({ showSettingsIcon = false }) => {
    return (
        <div className="mt-16 px-10 flex items-center justify-between">
            <img src={icon64} width="40" alt="Icon" />
            {showSettingsIcon && <FaCog fontSize={25} color="#D3D3D3" />}
        </div>
    )
}

export default Header
