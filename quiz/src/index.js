import React from "react";
import ReactDOM from "react-dom";
import ReplayField from "./components/PlayField"
import ChoicesField from "./components/ChoicesField";
import BoardField from "./components/BoardField";
import WelcomeField from "./components/WelcomeField";

export default class GetQuestion extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentQuestion: null,
            correctAnswer: null,
            choices: [],

            round: 1,
            score: 0,
            limitC: 0

        }

    }

    replay = (round, score) => {
        // ReactDOM.unmountComponentAtNode(document.getElementById("playW"))
        ReactDOM.render(<ReplayField round={round} score={score}/>, document.getElementById("root"))
    }

    choose = (index) => {
        let score = this.state.score
        let round = this.state.round
        round++

        if (index === this.state.correctAnswer){
            console.log("correct")
            score++
        }

        this.setState({
            round: round,
            score: score
        })

        this.getQuestion()
    }

    incrementLimitC = (getQuestion) =>{
        let limitC = this.state.limitC
        limitC++
        this.setState({
            limitC: limitC
        })

        getQuestion()
    }

    getQuestion = () => {
        const choicesField = document.getElementById("choiceField")

        if (this.state.round === 10){
            this.replay(this.state.round, this.state.score)
        }else {
            let getBtn = document.getElementById("getQ")

            fetch('https://opentdb.com/api.php?amount=1&type=multiple')
                .then(response => response.json()
                ).then(data => {
                let results = data["results"][0]
                let randomPos = Math.floor(Math.random() * 4)
                let question = results["question"];

                let correctAnswer;
                let choices = []

                for (let i = 0; i < 3; i++) {

                    if (i === randomPos) {
                        correctAnswer = i
                        choices.push(results['correct_answer'])
                    }
                    choices.push(results['incorrect_answers'][i])

                }
                if (randomPos === 3) {
                    correctAnswer = 3
                    choices.push(results['correct_answer'])
                }

                this.setState({
                    currentQuestion: question,
                    correctAnswer: correctAnswer,
                    choices: choices
                })
                // console.log(choices)
                // console.log(this.state.choices)
                ReactDOM.render(<ChoicesField choices={this.state.choices} choose={this.choose}/>, choicesField)
                // console.log(results["correct_answer"])
                // console.log(this.state.correctA)
                // console.log("round: " + this.state.round)
                // console.log("score: " + this.state.score)
            }).catch(error => {
                console.error(error)
            })
            // let q = document.getElementById("getQ")
            // console.log(q)
            // q.remove()
            if (getBtn) {
                getBtn.innerText = "Skip question"
            }

            if (this.state.limitC === 3) {
                getBtn.remove()
            }
        }
    }

    render(){
        return(
            <div id="playW">
                <h1 id="qHeading">QUIZ</h1>
                <div id="sField">
                    <BoardField round={this.state.round} score={this.state.score}/>
                </div>

                <div id="qBtnF">
                    <button id="getQ" onClick={() => this.incrementLimitC(this.getQuestion)}>Get question </button>
                </div>
                <h3>{this.state.currentQuestion}</h3>
                <div id="choiceField">

                </div>

            </div>
        )
    }
}
// ReactDOM.render(<GetQuestion/>, document.getElementById("root"))
ReactDOM.render(<WelcomeField/>, document.getElementById("root"))