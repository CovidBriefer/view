import React from "react"

interface Props {}

const Button: React.FC<Props> = ({ children }) => {
    return (
        <button
            className="bg-primary py-2 px-20 text-primary-dark font-semibold tracking-tighter text-lg shadow-2xl"
            style={{ borderRadius: "3px", filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))" }}
        >
            {children}
        </button>
    )
}

export default Button
