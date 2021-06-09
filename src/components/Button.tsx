import React from "react"

export type ClickEvent = React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
interface Props {
    onClick?: (event: ClickEvent) => void
    className?: string
    disabled?: boolean
    shadow?: boolean
}

const Button: React.FC<Props> = ({ children, onClick, className, disabled = false, shadow = true }) => {
    const handleClick = (e: ClickEvent) => !disabled && onClick?.(e)

    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={
                "setup-button cursor-pointer bg-primary py-1 px-20 focus:outline-none text-primary-dark font-semibold tracking-tighter text-lg shadow-2xl " +
                (shadow && " setup-button_shadow ") +
                className
            }
            style={
                !disabled
                    ? {
                          borderRadius: "3px"
                      }
                    : {
                          opacity: 0.5,
                          borderRadius: "3px"
                      }
            }
        >
            {children}
        </button>
    )
}

export default Button
