import React from "react";


function ChoicesField({choices, choose}){

    return(
        <div>
            {choices.map((choice, index) => <div  key={index} ><br/><hr/><div>
                {choice}&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => choose(index)}>Select</button>
            </div><hr/><br/></div>)}
        </div>
    )
}

export default ChoicesField