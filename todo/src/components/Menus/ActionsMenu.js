import React, {useCallback, useContext, useEffect, useState} from "react";
import "./styles/Menu_style.css"
import {Global} from "../context/GlobalProvider";


const ActionsMenu = () => {

    const context = useContext(Global)


    const handleContextMenu = useCallback ((event) =>{

        const contextMenu = document.getElementById("context-menu")
        let newField = document.getElementById("input")

        const {x: mouseX, y: mouseY} = event
        const points = context.normalise(mouseX, mouseY, event.target)
        context.setAnchorP({x: points.normalisedX, y: points.normalisedY})
        contextMenu.style.top = `${points.normalisedY}px`
        contextMenu.style.left = `${points.normalisedX}px`

        contextMenu.classList.remove("visible")
        newField.classList.remove("visible")

        if (event.target.id === "actions_container"){
            event.preventDefault()
            context.createAction()

            setTimeout(() => {
                contextMenu.classList.add("visible")
            })

        }

        else {
            contextMenu.classList.remove("visible") // to stop showing the context menu out of the target area
        }

    }, [context.anchorP])

    const handleClick = useCallback ((event) => {
        const contextMenu = document.getElementById("context-menu")
        let actionInput = document.getElementById("input")

        if (event.target.className === "action"){
            setTimeout(() => {
                actionInput.classList.add("visible")
            })
        }

        if (event.target.offsetParent !== actionInput){
            actionInput.classList.remove("visible")
            contextMenu.classList.remove("visible")
        }
    }, [context.setAnchorP])

    const showInput = useCallback (() => {
        let actionInput = document.getElementById("input")

        actionInput.style.top = `${context.anchorP["y"]}px`
        actionInput.style.left = `${context.anchorP["x"]}px`

        setTimeout(() => {
            actionInput.classList.add("visible")
        })
    }, [handleContextMenu])


    useEffect(() => {

        document.body.addEventListener("contextmenu", handleContextMenu)
        document.body.addEventListener("click", handleClick)

        return () => {
            document.body.removeEventListener("contextmenu", handleContextMenu)
            document.body.removeEventListener("contextmenu", handleClick)
        }
    })

    const showDesc = () => {
        if (context.currentAction["desc"]) return context.currentAction["desc"]
    }

    return(
        <div>

            <div id="context-menu">
                <div className={"item"} onClick={showInput}>New Action</div>
            </div>

            <div id={"input"}>
                <div id={"action_name_container"} className={"d-flex align-items-center justify-content-center"}>
                    <h5 id={"action_name"} contentEditable={"true"} onKeyDown={({key}) => {
                        if (key === "Enter") {
                            let actionName = document.getElementById("action_name")
                            actionName.blur()
                        }}}>
                        {context.currentAction["name"] ? context.currentAction["name"] : "New Action"}
                    </h5>
                </div>

                <div id={"desc_container"} className={"d-flex align-items-center justify-content-center"}>
                <textarea  id={"desc"} cols="30" rows="2" className={"mb-md-2 py-0"} onKeyDown={({key}) => context.saveAction(key)}>
                    {showDesc()}
                </textarea>
                </div>
            </div>

        </div>
    )
}

export default ActionsMenu;
