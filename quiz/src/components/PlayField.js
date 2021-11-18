import ReactDOM from "react-dom";
import React from "react";
import GetQuestion from "../index.js"

function ReplayField({round, score}){
    return(
        <div>
            <h1>Round: {round} &nbsp;&nbsp;&nbsp;&nbsp; Score: {score}</h1>
            <button id="replayBtn" onClick={reRenderMain}>replay</button>
        </div>
    )
}

function reRenderMain(){
    ReactDOM.render(<GetQuestion/>, document.getElementById("root"))
}

export default ReplayField