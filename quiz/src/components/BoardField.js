import React from "react";

function BoardField({round, score}){
    return(
        <div id="sField">
            <h3>Round: {round} &nbsp;&nbsp;&nbsp;&nbsp; Score: {score}</h3>
        </div>
    )
}

export default BoardField