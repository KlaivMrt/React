import ReactDOM from "react-dom";
import React, {useContext, useEffect} from "react";
import "./Menus/styles/Menu_style.css"
import Global from "../index";

const ActionsMenu = () => {
    let context = useContext(Global)

    useEffect(() =>{
        let actionName = document.getElementById("action_name")
        actionName.addEventListener("keydown", ({key}) =>{
            if (key === "Enter"){
                actionName.blur()
            }
        })
    })

    return(
        <div id={"actions_menu_container"}>

            <div id={"action_name_container"} className={"d-flex align-items-center justify-content-center"}>
                <h5 id={"action_name"} contentEditable={"true"}>
                    {context.currentAction["name"] ? context.currentAction["name"] : "keep going"}
                </h5>
            </div>

            <div id={"desc_container"} className={"d-flex align-items-center justify-content-center"}>
                <textarea  id={"desc"} cols="30" rows="2" className={"mb-md-2 py-0"}>

                </textarea>

            </div>

            {/*<div className="item" onClick={() => {*/}
            {/*    // context.createAction()*/}
            {/*}}>Short-term Action</div>*/}
            {/*<div className="item" >Medium Term</div>*/}
            {/*<div className="item">Long Term</div>*/}
        </div>
    )
}

const GridMenu = () => {

    return(
        <div id={"grid_menu_container"}>
            <div className="item" onClick={() => {
                // context.createField()
            }}>New Field</div>
            <div className="item">Delete Field</div>
            <div className="item">Field's History</div>

        </div>
    )
}

const Menu = () => {
    const context = useContext(Global)

    const normalise = (x, y, f) => {
        const contextMenu = document.getElementById("context-menu")

        const {
            left: scopeOffsetX,
            top: scopeOffsetY
        } = f.getBoundingClientRect()

        const X = x - scopeOffsetX
        const Y = y - scopeOffsetY

        const outOfBoundsOnX = X + contextMenu.clientWidth > f.clientWidth
        const outOfBoundsOnY = Y + contextMenu.clientHeight > f.clientHeight

        let normalisedX = x
        let normalisedY = y

        if (outOfBoundsOnX){
            normalisedX = scopeOffsetX + f.clientWidth - contextMenu.clientWidth
        }

        if (outOfBoundsOnY){
            normalisedY = scopeOffsetY + f.clientHeight - contextMenu.clientHeight
        }

        return {normalisedX, normalisedY}
    }

    const handleContextMenu = (event) =>{
        // console.log(event.target.id)

        const contextMenu = document.getElementById("context-menu")

        const {x: mouseX, y: mouseY} = event
        const points = normalise(mouseX, mouseY, event.target)
        contextMenu.style.top = `${points.normalisedY}px`
        contextMenu.style.left = `${points.normalisedX}px`

        contextMenu.classList.remove("visible")
        // gridMenu.classList.remove("visible")
        // actions_menu.classList.remove("visible")

        if (event.target.id === "grid_container"){
            event.preventDefault()
            ReactDOM.render(<GridMenu context={context}/>, document.getElementById("context-menu"))

            setTimeout(() => {
                contextMenu.classList.add("visible")
            })
        }else if (event.target.id === "actions_container"){
            event.preventDefault()
            context.createAction()
            ReactDOM.render(<Global.Provider value={context}><ActionsMenu/></Global.Provider>, document.getElementById("context-menu"))

            setTimeout(() => {
                contextMenu.classList.add("visible")
            })

        }

        else {
            contextMenu.classList.remove("visible") // to stop showing the context menu out of the target area
        }

    }

    const handleClick = (event) => {
        const contextMenu = document.getElementById("context-menu")

        if (event.target.offsetParent !== contextMenu){
            // console.log(event.target.id)
            contextMenu.classList.remove("visible")
        }
    }

    useEffect(() =>{
        document.body.addEventListener("contextmenu", handleContextMenu)
        document.body.addEventListener("click", handleClick)

        return () => {
            document.body.removeEventListener("contextmenu", handleContextMenu)
            document.body.removeEventListener("contextmenu", handleClick)
        }
    })

    return(
        <div id="context-menu">
        </div>
    )


}

export default Menu;
