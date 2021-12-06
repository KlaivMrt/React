import React, {useCallback, useContext, useEffect} from "react"
import ActionsMenu from "./Menus/ActionsMenu";
import "./styles/Field_style.css"
// import GlobalProvider from "./context/GlobalProvider";
import {Global} from "./context/GlobalProvider";


const Field = () => {
    const context = useContext(Global)

    const blurHeadings = useCallback ((key) => {
        if (key === "Enter"){
            let heading = document.getElementById("field_name")
            heading.blur()
        }
    }, [])

    const showAction = (event) => {

        const {x: mouseX, y: mouseY} = event
        // const points = context.normalise(mouseX, mouseY, event.target)
        // context.setAnchorP({x: points.normalisedX, y: points.normalisedY})


        let actionInput = document.getElementById("input")

        actionInput.style.top = `${mouseY}px`
        actionInput.style.left = `${mouseX}px`


        setTimeout(() => {
            actionInput.classList.add("visible")
        })

        console.log(context.currentAction)
    }

    const enlistActions = () => {
        let grid = document.getElementById("actions_container")
        grid.innerHTML = ""


        if (context.currentField["actions"].length > 0){

            for (let i = 0; i<context.currentField["actions"].length; i++){
                let action = document.createElement("div")
                action.className = "action d-flex align-items-center justify-content-center"
                // action.key = i
                action.innerText = context.currentField["actions"][i]["name"] ? context.currentField["actions"][i]["name"] : "action"
                action.addEventListener("click", () => context.showAction(i))
                action.addEventListener("dblclick", showAction)

                if (context.currentField["actions"][i]["timeFrame"] === 1){
                    action.style.background = "blue"
                }else if (context.currentField["actions"][i]["timeFrame"] === 2){
                    action.style.background = "green"
                }else {
                    action.style.background = "red"
                }

                grid.appendChild(action)
            }
        }
    }




    useEffect(() => {
        enlistActions()
    })

    return(
        <div id={"field_main"} className={"container-xl bg-light align-items-center justify-content-center"}>

            <ActionsMenu/>

            <div id={"field_name_container"} className={"bg-white d-flex align-items-center justify-content-center"}>
                <h1 id={"field_name"} className={"text-center"} onKeyDown={({key}) => blurHeadings(key)}>
                    {context.currentField["name"] ? context.currentField["name"] : "not ok"}
                </h1>
            </div>

            <div id={"actions_container"} className={"bg-white d-flex align-content-start flex-wrap"} >

            </div>

            <div className={"d-flex align-items-center justify-content-center mt-2"}>
                            <button onClick={context.saveField}>----SAVE CHANGES----</button>
            </div>

        </div>


    )
}

export default Field;
