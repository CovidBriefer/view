import React from "react"
import icon64 from "../assets/icons/icon-64.svg"
import { FaCog } from "react-icons/fa"

type Props = {
    showSettingsIcon?: boolean
}

const Header: React.FC<Props> = ({ showSettingsIcon = false }) => {
    return (
        <div className="flex items-center justify-between mt-2">
            <img src={icon64} width="45" alt="Icon" />
            {showSettingsIcon && <FaCog fontSize={25} color="#D3D3D3" />}
        </div>
    )
}

export default Header
