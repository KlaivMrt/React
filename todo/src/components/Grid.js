import "./styles/Grid_style.css"
import {useEffect, useContext, useCallback} from "react";
import {Global} from "./context/GlobalProvider";
import GridMenu from "./Menus/GridMenu";
// import {useNavigate} from "react-router-dom";


const Grid = () => {
    const context = useContext(Global)
    // const navigate = useNavigate()


    const enlistFields = useCallback (() => {
        let grid = document.getElementById("grid_container")
        // let elements = grid.getElementsByTagName("*")
        grid.innerHTML = ""

        if (context.fields.length > 0){

          for (let i = 0; i<context.fields.length; i++){
              let field = document.createElement("div")
              field.className = "field d-flex align-items-center justify-content-center"
              // field.key = 1
              field.innerText = context.fields[i]["name"]
              field.addEventListener("click", () => context.showField(i))
              grid.appendChild(field)
          }
      }
    }, [])

    useEffect(() => {
        enlistFields(context.fields)
        // console.log("rerender")
    })

    return(
        <div id={"grid_main"} className={"container-xl bg-light align-items-center"}>

            <GridMenu/>

            <div id={"title_container"} className={"bg-white align-items-center"}>
                    <h1 className={"text-center"}>YOUR FIELDS</h1>
            </div>

            <div id={"grid_container"} className={"bg-white d-flex align-content-start flex-wrap"}>
            </div>

        </div>
    )
}

export default Grid;
