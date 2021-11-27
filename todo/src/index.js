import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
// import {render} from "@testing-library/react";

const Menu = () => {
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});
    const [show, setShow] = useState(false)

    let handleContextMenu = useCallback(
        event =>{
            event.preventDefault()
            // console.log("ok")
            setAnchorPoint({
                x: event.pageX + 150 > window.innerWidth ? window.innerWidth - 180 : event.pageX,
                y: event.pageY + 150> window.innerHeight ? window.innerHeight - 180 : event.pageY
            })
            // console.log(anchorPoint)
            // console.log({x: event.pageX, y: event.pageY})
            setShow(true)
        },
        [setAnchorPoint, setShow])

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show])

    useEffect(() => {
        document.addEventListener("click", handleClick)
        document.addEventListener("contextmenu", handleContextMenu)

        //Clean up the old listeners before using the new ones
        return () =>{
            document.removeEventListener("click", handleClick)
            document.removeEventListener("contextmenu", handleContextMenu)
        }})

    return(
        <div>
            {show ? (
                <ul id="menu" style={{
                    top: anchorPoint.y,
                    left: anchorPoint.x
                }}>
                    <li>Create Field</li>
                    <li>Show history</li>
                    <li>Hello there</li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    )
}

const Grid = () => {



    return(
        <div id={"grid_container"} className={"container-xl bg-light align-items-center my-md-5"}>

            <div id={"title_container"} className={"row bg-white h3 align-items-center"}>
                <h1 className={"text-center"}>YOUR FIELDS</h1>
            </div>

            <div id={"fields_container"} className={"row bg-white h6"}>


            </div>
            <Menu/>

        </div>
    )
}


const Welcome = () => {

    const renderGrid = () => {}

    return(
        <div id="welcome_container" className={"container-xl bg-white align-items-center my-md-5"}>

            <div className={"row h-50 bg-black align-items-center mx-lg-3 mt-lg-5"}>
                    <h1 className={"text-center text-white"}>WELCOME TO FRAME</h1>
            </div>

            <div className={"row align-items-center h-25 mx-lg-3"}>
                <button id="manage_archive_btn">
                    Manage your archive
                </button>
            </div>

        </div>

    )
}

function App(){
    return(
        <Grid/>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))