import React from "react"

interface Props {
    onClick?: () => void
}

const Button: React.FC<Props> = ({ children, onClick }) => {
    return (
        <button
            onClick={() => onClick?.()}
            className="bg-primary py-2 px-20 text-primary-dark font-semibold tracking-tighter text-lg shadow-2xl"
            style={{ borderRadius: "3px", filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))" }}
        >
            {children}
        </button>
    )
}

export default Button
