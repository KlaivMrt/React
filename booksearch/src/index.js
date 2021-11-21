import React, {useState} from "react";
import ReactDOM from "react-dom";

function App(){


    const [bookData, setBookData] = useState('')
    const [author, setAuthor] = useState(null)

    function show(){
        console.log(bookData)
        console.log(author)
    }

    function fetchAuthorsName (authorInfo){
        fetch(`https://openlibrary.org${authorInfo}.json`)
            .then(response => {
                if (!response.ok){
                    throw Error
                }else {
                    return response.json()
                }
            }).then(data => {
                setAuthor(data["name"])
        })
    }

    function search(isbn){

        fetch(`https://openlibrary.org/isbn/${isbn}.json`)
            .then(response => {
                if (!response.ok){
                    throw Error
                }else {
                    return response.json()
                }
            }).then(data => {
            fetchAuthorsName(data["authors"][0]["key"])

            const desiredContent = ["title", "subtitle", "full_title", "number_of_pages", "publishers", "publish_date", "subjects"]
            let content = []

            for (let element in data){
                let info = {}
                if (desiredContent.includes(element)){
                    info[element] = data[element]
                    content.push(info)
                }
            }
            setBookData(content)
        }).catch(error => console.error())

        const imageField = document.getElementById("imageField")
        let img = document.createElement("img")
        img.src = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`

        imageField.append(img)
    }

    function processInfo(){
        if (bookData){
            return(
                <div>
                    {bookData.map((block ,index) => <div key={index}><hr/><h3>{Object.keys(bookData[index])}:&nbsp;&nbsp;&nbsp;&nbsp; {Object.values(bookData[index])}</h3></div>)}
                </div>
            )
        }
    }

    return(
        <div id={"book"}>
            <h1>BOOK SEARCH</h1>
            ISBN:<input type="number" id={"searchB"} onKeyDown={({key}) => {
                if (key === "Enter"){
                    let searchBox = document.getElementById("searchB")

                    search(searchBox.value)
                }
        }}/>
            <button onClick={show}>SHOW</button>

            <div id="imageField"></div>
            <h3>{author}</h3>
            <div id="bookInfo">
                {processInfo()}
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))