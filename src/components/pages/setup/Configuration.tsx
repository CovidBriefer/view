import React from "react"
import Dropdown from "../../Dropdown"
import Header from "../../Header"

interface Props {}

const Configuration: React.FC<Props> = () => {
    return (
        <div>
            <Header />
            <div className="text-center mt-12">
                <h1 className="text-3xl font-bold">Willkommen</h1>
                <p className="text-light-gray text-base tracking-tighter leading-4 max-w-xs mx-auto">
                    Um dir die wichtigsten Informationen kurz zusammenfassen können, benötigen wir einige Angaben von
                    dir, um unsere Inhalte bestmöglichst auf dich zuzuschneiden.
                </p>
                <Dropdown
                    heading={
                        <h1 className="text-lg font-normal tracking-tighter text-left">
                            In welchem <span className="text-primary">Bundesland</span> lebst du?
                        </h1>
                    }
                    list={[]}
                />
            </div>
        </div>
    )
}

export default Configuration
