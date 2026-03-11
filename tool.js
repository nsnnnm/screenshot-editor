(async()=>{

/* icon font */

const iconFont=document.createElement("link")
iconFont.rel="stylesheet"
iconFont.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
document.head.appendChild(iconFont)

/* css */

const css=document.createElement("link")
css.rel="stylesheet"
css.href="https://ns-cloud-screenshot.pages.dev/tool.css"
document.head.appendChild(css)

/* dock */

const bar=document.createElement("div")
bar.className="ns-bar"
document.body.appendChild(bar)

/* open tab */

const open=document.createElement("div")
open.className="ns-open"
open.innerHTML='<span class="material-symbols-rounded">menu</span>'
document.body.appendChild(open)

open.onclick=()=>{

bar.style.display="flex"
open.style.display="none"

}

/* button creator */

function btn(icon,click){

const b=document.createElement("div")
b.className="ns-btn"

b.innerHTML=`<span class="material-symbols-rounded">${icon}</span>`

b.onclick=click

bar.appendChild(b)

}

/* close */

btn("close",()=>{

bar.style.display="none"
open.style.display="flex"

})

/* hide elements */

btn("visibility_off",()=>{

document.querySelectorAll("img,video").forEach(e=>{

e.style.visibility="hidden"

})

})

/* brightness */

btn("brightness_6",()=>{

const s=document.createElement("input")
s.type="range"
s.min="0.3"
s.max="2"
s.step="0.1"
s.value="1"
s.className="ns-slider"

document.body.appendChild(s)

s.oninput=()=>{

document.body.style.filter=`brightness(${s.value})`

}

})

/* screenshot */

btn("photo_camera",async()=>{

const canvas=document.createElement("canvas")

canvas.width=document.documentElement.scrollWidth
canvas.height=document.documentElement.scrollHeight

const ctx=canvas.getContext("2d")

ctx.fillStyle="white"
ctx.fillRect(0,0,canvas.width,canvas.height)

alert("ブラウザ制限で完全スクショは不可。拡張機能なら可能です。")

})

/* lock */

btn("lock",()=>{

const d=document.createElement("div")

d.style.position="fixed"
d.style.top="0"
d.style.left="0"
d.style.width="100%"
d.style.height="100%"
d.style.background="black"
d.style.zIndex="999999"

document.body.appendChild(d)

})

/* text selection */

document.addEventListener("mouseup",()=>{

const text=window.getSelection().toString().trim()

if(!text)return

const box=document.createElement("div")
box.className="ns-selection"

box.innerHTML=`
<button id="nsSearch">Search</button>
<button id="nsAI">AI</button>
`

document.body.appendChild(box)

const r=window.getSelection().getRangeAt(0).getBoundingClientRect()

box.style.left=r.left+"px"
box.style.top=(r.top-40)+"px"

document.getElementById("nsSearch").onclick=()=>{

window.open(
"https://www.google.com/search?q="+encodeURIComponent(text)
)

}

document.getElementById("nsAI").onclick=()=>{

ai(text)

}

setTimeout(()=>box.remove(),5000)

})

/* AI summary */

function ai(text){

const p=document.createElement("div")
p.className="ns-ai"

p.innerHTML="<b>AI Summary</b><br>生成中..."

document.body.appendChild(p)

setTimeout(()=>{

let short=text.slice(0,200)

p.innerHTML="<b>AI Summary</b><br><br>"+short+"..."

},600)

}

/* ===== ad blocker ===== */

function removeAds(){

const selectors=[

"[id*=ad]",
"[class*=ad]",
"[class*=ads]",
"[class*=banner]",
"iframe[src*=ads]",
"iframe[src*=doubleclick]",
"iframe[src*=adservice]"

]

selectors.forEach(sel=>{

document.querySelectorAll(sel).forEach(e=>{

e.remove()

})

})

}

/* run adblock */

removeAds()

setInterval(removeAds,4000)

})()
