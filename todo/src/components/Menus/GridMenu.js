import React, {useCallback, useContext, useEffect, useState} from "react";
import "./styles/Menu_style.css"
import {Global} from "../context/GlobalProvider";

const GridMenu = () => {
    const context = useContext(Global)

    const handleContextMenu = useCallback ((event) =>{

        const contextMenu = document.getElementById("context-menu")
        const newField = document.getElementById("input")

        const {x: mouseX, y: mouseY} = event
        const points = context.normalise(mouseX, mouseY, event.target)
        context.setAnchorP({x: points.normalisedX, y: points.normalisedY})
        contextMenu.style.top = `${points.normalisedY}px`
        contextMenu.style.left = `${points.normalisedX}px`

        contextMenu.classList.remove("visible")
        newField.classList.remove("visible")

        if (event.target.id === "grid_container"){
            event.preventDefault()

            setTimeout(() => {
                contextMenu.classList.add("visible")
            })
        }else {
            contextMenu.classList.remove("visible")
        }

    }, [context.anchorP])

    const handleClick = useCallback ((event) => {
        const contextMenu = document.getElementById("context-menu")
        const newField = document.getElementById("input")

        if (event.target.offsetParent !== newField){
            newField.classList.remove("visible")
            contextMenu.classList.remove("visible")
        }
        // console.log(event.target.offsetParent)
    }, [context.setAnchorP])

    const showInput = useCallback (() => {
        let newField = document.getElementById("input")

        newField.style.top = `${context.anchorP["y"]}px`
        newField.style.left = `${context.anchorP["x"]}px`

        // contextMenu.classList.remove("visible")
        setTimeout(() => {
            newField.classList.add("visible")
        })
    }, [handleContextMenu])


    useEffect(() =>{
        document.body.addEventListener("contextmenu", handleContextMenu)
        document.body.addEventListener("click", handleClick)

        return () => {
            document.body.removeEventListener("contextmenu", handleContextMenu)
            document.body.removeEventListener("contextmenu", handleClick)
        }
    })

    return(
        <div>

            <div id="context-menu">
                <div className={"item"} onClick={showInput}>New Field</div>
                {/*<NewField/>*/}
                <div className={"item"}>Delete Field</div>
                <div className={"item"}>Field's History</div>
            </div>

            <div id={"input"} className={"d-flex flex-column align-items-center justify-content-around"}>
                <h6 className={"text-center"}>Field Name</h6>
                <input type="text" id={"field-name"} className={"item w-100"} onKeyDown={({key}) => {
                    if (key === "Enter"){
                        let input = document.getElementById("field-name")
                        context.createField(input.value)
                        input.value = null
                    }
                }}/>
            </div>


        </div>
    )


}

export default GridMenu;
