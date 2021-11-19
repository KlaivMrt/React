import {decodeEntity} from 'html-entities';

let a = "What type of cheese, loved by Wallace and Gromit, had it&#039;" +
    "s sale prices rise after their successful short films?"

function adjust1(str){
    let target = []

    for (let i = 0; i < str.length; i++){
        if (str[i] === "&" || str[i] === ";"){
            target.push(i)
            // console.log(i)
        }
    }

    let newString = str.slice(target[0], target[1] + 1)
    let nums = [0,1,2,3,4,5,6,7,8,9]
    let targetNum = "";

    for(let i = 0; i < newString.length; i++){
        // console.log(typeof newString[i])
        if (nums.includes(parseInt(newString[i]))){
            targetNum += newString[i]
        }
    }
    console.log(decodeEntity(newString))
    // console.log(str.split(newString).toString())
    // console.log(newString)
    // console.log(targetNum)
    let char = String.fromCharCode(parseInt(targetNum))
    // console.log(char)

    return str.slice(0, target[0]) + char + str.slice(target[1] + 1)
}

// let num = "8"
// console.log(typeof parseInt(num))
console.log(a)
console.log(adjust1(a))

let b = "In the game &quot;Overwatch,&quot; which quote does the hero &quot;McCree&quot; NOT say upon using his flashbang ability?"