import React from "react"
import Button from "../../../Button"
import Dropdown from "../../../Dropdown"
import { IoClose } from "react-icons/io5"

interface Props {}

const AppendItemOverlay: React.FC<Props> = () => {
    return (
        <div
            className="bg-bg-light pt-10 pb-16 fixed w-full bottom-0 left-0 px-7 flex flex-col items-center"
            style={{ filter: "drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.1))", borderRadius: "20px" }}
        >
            <h1 className="font-semibold text-3xl m-0">Hinzufügen</h1>
            <h3 className="m-0 font-medium text-xl my-2 leading-6 text-center">
                Möchtest du ein Bundesland oder einen Kreis hinzufügen?
            </h3>
            {/* <Dropdown heading="Test" callback={e => console.log("THIS WAS SELECTED", e)} list={[]} /> */}
            <AppendButton name="Bundesland" />
            <AppendButton name="Landkreis" />
        </div>
    )
}

const AppendButton: React.FC<{ name: string }> = ({ name }) => (
    <Button className="flex justify-center items-center mt-5 w-72">
        <span className="text-bg-light">{name}</span>
        {/* <FaArrowRight fill="rgb(31, 65, 96)" /> */}
    </Button>
)

export default AppendItemOverlay
