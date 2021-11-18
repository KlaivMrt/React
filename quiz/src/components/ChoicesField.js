import React from "react";

function ChoicesField({choices, choose}){
    return(
        <div>
            <ul>
                {choices.map((choice, index) => <li
                    key={index}
                    className={"choice"}
                    id={index.toString()}
                    onClick={() => choose(index)}> <hr/> {choice}
                </li> )}
            </ul>

        </div>
    )
}

export default ChoicesField