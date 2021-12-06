import React, {createContext, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const Global = createContext()

const GlobalProvider = ({children}) => {
    const [fields, setFields] = useState([])
    const [currentField, setCurrentField] = useState({name: null, actions: []})
    const [currentAction, setCurrentAction] = useState({name: null, desc: null, timeFrame: null})
    const [anchorP, setAnchorP] = useState()

    let navigate = useNavigate()

    const saveAction = (key) => {
        if (key === "Enter"){
            let actionName = document.getElementById("action_name")
            let desc = document.getElementById("desc")

            let newAction = Object.assign({}, currentAction)
            let newField = Object.assign({}, currentField)

            newAction["name"] = actionName.innerText
            newAction["desc"] = desc.value
            newField["actions"].push(newAction)
            //--------------------------
            setCurrentAction(newAction)
            //--------------------------
            setCurrentField(newField)

            // desc.innerText = null
            desc.value = null

            const input = document.getElementById("input")
            input.classList.remove("visible")
        }

    }


    const saveField = () => {
        let fieldName = document.getElementById("field_name")

        let newField = Object.assign({}, currentField)
        let gridFields = [...fields]

        newField["name"] = fieldName.innerText
        console.log(newField)

        for (let field of gridFields){
            if (field["name"] === newField["name"]){
                field["actions"] = [...newField["actions"]]
                console.log(field["actions"])
                setCurrentField({name: null, actions: []})
                setCurrentAction({name: null, desc: null, timeFrame: null})
                setFields(gridFields)
                navigate("/archive")
                return;
            }
        }

        setCurrentField({name: null, actions: []})
        setCurrentAction({name: null, desc: null, timeFrame: null})
        gridFields.push(newField)
        setFields(gridFields)
        navigate("/archive")
    }

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


    const createAction = useCallback (() => {
        setCurrentAction({name: null, desc: null, timeFrame: null})
    }, [])

    const createField = (name) => {
        setCurrentField({name: name, actions: []})
        navigate("/your-field")
    }

    const showField = (key) => {
        setCurrentField(fields[key])
        navigate("/your-field")
    }

    const showAction = (key) => {
      setCurrentAction(currentField["actions"][key])
    }

    const value = {
        fields,
        currentField,
        currentAction,
        anchorP,
        setAnchorP,
        saveAction,
        saveField,
        createAction,
        createField,
        showField,
        showAction,
        normalise
    }

    useEffect(() => {
        // console.log("current field")
        // console.log(currentField)
        // console.log("current action")
        // console.log(currentAction)
        // console.log("fields")
        // console.log(fields)

    })

    return(
        <Global.Provider value={value}>
            {children}
        </Global.Provider>
    )
}

export default GlobalProvider;