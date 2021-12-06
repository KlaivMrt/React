import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles/ContextMenu_style.css"
// import {render} from "@testing-library/react";

const Menu = () => {
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});
    const [show, setShow] = useState(false)

    let handleContextMenu = useCallback ((event) => {
            console.log("ok")
            event.preventDefault()
            // console.log("ok")
            setAnchorPoint({
                x: event.pageX + 150 > window.innerWidth ? window.innerWidth - 180 : event.pageX,
                y: event.pageY + 150 > window.innerHeight ? window.innerHeight - 180 : event.pageY
            })
            // console.log(anchorPoint)
            // console.log({x: event.pageX, y: event.pageY})
            setShow(true)
        }, [setAnchorPoint, setShow])

    const handleClick = (event) => {
        console.log(event.target.id)
        if (event.target.id !== "item"){
            if (show) setShow(false)
        }

    }

    useEffect(() => {
        document.addEventListener("click", handleClick)
        document.addEventListener("contextmenu", handleContextMenu)

        return () =>{
            document.removeEventListener("click", handleClick)
            document.removeEventListener("contextmenu", handleContextMenu)
        }
    })

        //Clean up the old listeners before using the new ones
        // return () =>{
        //     document.removeEventListener("click", handleClick)
        //     document.removeEventListener("contextmenu", handleContextMenu)
        // }})

    return(
        <div>
            {show ? (
                <ul id="menu" style={{
                    top: anchorPoint.y,
                    left: anchorPoint.x
                }} onClick={() =>{
                    console.log(anchorPoint.y)
                    console.log(anchorPoint.x)
                }}>
                    <li id={"item"}>Create Field </li>
                    <li id={"item"}>Show history </li>
                    <li id={"item"}>Hello there </li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Menu;