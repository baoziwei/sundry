import {
    sum,
    minus
} from './a'

import './css/1.css'

console.log(sum(2, 3));
console.log(minus(4, 21));
console.log(9998);

import url from "./img/ceshi.jpeg";
// let img = document.createElement('img')
let img = new Image();
img.src = url;
document.body.appendChild(img)


let span = document.createElement("span")
span.className = "iconfont iconfanye-you"
document.body.appendChild(span)


fetch("https://api.bilibili.com").then((res)=>res.json).then(data=>{
    console.log(data);
})

// let a