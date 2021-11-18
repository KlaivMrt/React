import ReactDOM from "react-dom";
import React from "react";
import GetQuestion from "../index";

function WelcomeField(){
    return(
        <div>
            <h1>GET READY FOR THE QUIZ!</h1>

            <button onClick={startQuiz}>START</button>
        </div>
    )
}

function startQuiz(){
    ReactDOM.render(<GetQuestion />, document.getElementById("root"))
}

export default WelcomeField