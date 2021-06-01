import React from "react"

interface Props {
    className?: string
}

const PageLayout: React.FC<Props> = ({ children, className }) => {
    return <div className={"page-layout h-full py-7 px-4 " + className}>{children}</div>
}

export default PageLayout
