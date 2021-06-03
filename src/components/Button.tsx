import React from "react"

interface Props {
    onClick?: () => void
    className?: string
    disabled?: boolean
}

const Button: React.FC<Props> = ({ children, onClick, className, disabled = false }) => {
    return (
        <button
            disabled={disabled}
            onClick={() => onClick?.()}
            className={
                "setup-button bg-primary py-1 px-20 focus:outline-none text-primary-dark font-semibold tracking-tighter text-lg shadow-2xl " +
                className
            }
            style={
                !disabled
                    ? {
                          borderRadius: "3px",
                          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
                      }
                    : {
                          backgroundColor: "rgba(86, 206, 192, 0.5",
                          borderRadius: "3px",
                          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))",
                      }
            }
        >
            {children}
        </button>
    )
}

export default Button
