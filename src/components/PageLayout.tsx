import React from "react"

interface Props {
    className?: string
}

const PageLayout: React.FC<Props> = ({ children, className }) => {
    return <div className={"page-layout h-full px-2 " + className}>{children}</div>
}

export default PageLayout
