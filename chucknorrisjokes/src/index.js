import React from "react";
import ReactDOM from "react-dom";

function Saved({ saved, remove }){

        return(
            <div id="saved">
                <ul>
                    {saved.map((joke, index) => <li key={index} id={index} onClick={() => remove(index)}>{joke}</li>)}
                </ul>
            </div>
        )
    }

class GetJoke extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentJoke: null,
            savedJokes: []
        };
        this.getJoke = this.getJoke.bind(this)
        this.saveJoke = this.saveJoke.bind(this)
        this.deleteJoke = this.deleteJoke.bind(this)
    }

    saveJoke(){
        const joke = this.state.currentJoke.slice()
        const saved = this.state.savedJokes
        if (!saved.includes(joke)){
            saved.push(joke)
            console.log(this.state.savedJokes)
            this.setState({savedJokes: saved})
        }
    }

    deleteJoke(index){
        let s = [...this.state.savedJokes]
        s.splice(index, 1)
        this.setState({savedJokes: s})

    }

    getJoke(){
        fetch('https://api.chucknorris.io/jokes/random')
            .then( (response) =>{
                    if(!response.ok){
                        throw Error
                    }else {
                        return  response.json()
                    }
            }
            ).then(data => {
            this.setState({currentJoke: data.value})
            console.log(this.state.currentJoke)
        })
            .catch(error => {
                console.error(error)
        })
    }

    render(){
        return(
            <div id="chuckJokes">
                <div id="joke">
                    <h1>Chuck Norris Jokes</h1>
                    <button onClick={this.getJoke}>Get Joke</button>
                    <p onClick={this.saveJoke}>{this.state.currentJoke}</p>

                </div>
                    <Saved saved={this.state.savedJokes} remove={this.deleteJoke}/>
                </div>
        )
    }

}

ReactDOM.render(<GetJoke/>, document.getElementById("root"))