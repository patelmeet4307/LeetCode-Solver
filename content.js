function getProblemData() {

    const title =
        document.title
        .replace("- LeetCode", "")
        .trim();

    let statement = "";

    const article =
        document.querySelector(
        '[data-track-load="description_content"]'
        ) ||
        document.querySelector(
        "article"
        );

    if(article){
        statement =
        article.innerText;
    }

    return {
        title,
        statement
    };
}


function createFloatingButton(){

    if(
    document.getElementById(
    "ai-open-btn"
    ))
    return;


    const btn=
    document.createElement(
    "button"
    );

    btn.id=
    "ai-open-btn";

    btn.innerHTML=
    "⚡";

    btn.style.cssText=`

    position:fixed;

    bottom:20px;
    right:20px;

    width:65px;
    height:65px;

    border-radius:50%;
    border:none;

    z-index:999999;

    cursor:pointer;

    background:#00e5ff;

    color:#001233;

    font-size:28px;

    box-shadow:
    0 0 20px #00e5ff;

    transition:.3s;

    `;

    btn.onmouseover=()=>{

        btn.style.transform=
        "scale(1.1)";

    }

    btn.onmouseout=()=>{

        btn.style.transform=
        "scale(1)";
    }

    btn.onclick=
    openPanel;

    document.body
    .appendChild(btn);

}



function openPanel(){

    if(
    document.getElementById(
    "ai-panel"
    ))
    return;

    const panel=
    document.createElement(
    "div"
    );

panel.id=
"ai-panel";

panel.style.cssText=`

position:fixed;

top:70px;
right:20px;

width:430px;
height:550px;

z-index:999999;

border-radius:20px;

background:
linear-gradient(
180deg,
#001233,
#001845
);

color:white;

overflow:hidden;

box-shadow:
0 0 30px
rgba(0,229,255,.5);

`;

panel.innerHTML=`

<div style="

padding:18px;

display:flex;

justify-content:
space-between;

align-items:center;

border-bottom:
1px solid #00e5ff;

background:#001d3d;

">

<div style="
font-size:22px;
font-weight:bold;
color:#00e5ff;
">

LeetCode AI

</div>


<button
id="closeAI"

style="

background:none;

border:none;

color:#00e5ff;

font-size:24px;

cursor:pointer;

">

✕

</button>

</div>


<div style="
padding:15px;
">

<button
id="solveBtn"

style="

width:100%;

padding:12px;

border:none;

border-radius:10px;

background:#00e5ff;

color:#001233;

font-size:18px;

font-weight:bold;

cursor:pointer;

box-shadow:
0 0 15px
#00e5ff;

">

Solve Problem

</button>



<pre
id="ai-answer"

style="

margin-top:15px;

height:370px;

overflow:auto;

background:#001d3d;

padding:15px;

border-radius:12px;

white-space:pre-wrap;

color:#d6faff;

">

Ready...

</pre>

</div>

`;

document.body
.appendChild(
panel
);


document
.getElementById(
"closeAI"
)
.onclick=()=>{

panel.remove();

}


document
.getElementById(
"solveBtn"
)
.onclick=
solve;


}



async function solve(){

const output=

document.getElementById(
"ai-answer"
);

output.innerText=
"Thinking...";


const data=
getProblemData();



let language=
"Java";


try{

const allButtons=

document.querySelectorAll(
"button"
);


const langs=[

"Java",
"Python",
"Python3",
"C++",
"JavaScript",
"C",
"C#",
"Go",
"Rust",
"Kotlin",
"PHP",
"TypeScript"

];


for(let b of allButtons){

const txt=

b.innerText.trim();

if(
langs.includes(txt)
){

language=txt;

break;

}

}

}catch(e){

console.log(
"Language detection failed"
);

}



const API_KEY=
"AIzaSyCV1IYW2Au8QOSG6MbShrc7IfX67DmkgM0";



const prompt=`

Solve this LeetCode problem


Title:
${data.title}


Problem:
${data.statement}


Generate:

1 Short approach

2 ${language} solution

3 Time complexity

4 Space complexity


Return answer in
${language}

`;



try{


const response=

await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

contents:[{

parts:[{

text:prompt

}]

}]

})

}

);



const result=
await response.json();


console.log(
result
);


if(
result.error
){

output.innerText=

"API ERROR:\n\n"+

result.error.message;

return;

}



if(

!result.candidates ||

!result.candidates[0]

){

output.innerText=

"No response found";

return;

}


output.innerText=

result.candidates[0]

.content.parts[0]

.text;



}catch(e){

output.innerText=

"ERROR:\n\n"+

e.message;

}

}



setInterval(

createFloatingButton,

2000

);