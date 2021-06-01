import React from "react"

interface Props {}

const PageLayout: React.FC<Props> = ({ children }) => {
    return <div className="page-layout">{children}</div>
}

export default PageLayout
