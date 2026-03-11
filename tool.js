(async()=>{

/* ===== icon font ===== */

const iconFont=document.createElement("link")
iconFont.rel="stylesheet"
iconFont.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
document.head.appendChild(iconFont)

/* ===== css ===== */

const css=document.createElement("link")
css.rel="stylesheet"
css.href="https://ns-cloud-screenshot.pages.dev/tool.css"
document.head.appendChild(css)

/* ===== screenshot lib ===== */

const s=document.createElement("script")
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
document.head.appendChild(s)

/* ===== dock ===== */

const bar=document.createElement("div")
bar.className="ns-bar"
document.body.appendChild(bar)

const open=document.createElement("div")
open.className="ns-open"
open.innerHTML='<span class="material-symbols-rounded">menu</span>'
document.body.appendChild(open)

open.onclick=()=>{
bar.style.display="flex"
open.style.display="none"
}

/* ===== button creator ===== */

function btn(icon,click){

const b=document.createElement("div")
b.className="ns-btn"

b.innerHTML=`<span class="material-symbols-rounded">${icon}</span>`

b.onclick=click

bar.appendChild(b)

}

/* ===== close ===== */

btn("close",()=>{
bar.style.display="none"
open.style.display="flex"
})

/* ===== marker ===== */

let drawing=false

btn("draw",()=>{

document.body.style.cursor="crosshair"

document.addEventListener("mousedown",()=>drawing=true)

document.addEventListener("mouseup",()=>drawing=false)

document.addEventListener("mousemove",e=>{

if(!drawing)return

const dot=document.createElement("div")

dot.style.position="fixed"
dot.style.left=e.clientX+"px"
dot.style.top=e.clientY+"px"
dot.style.width="6px"
dot.style.height="6px"
dot.style.background="red"
dot.style.borderRadius="50%"
dot.style.pointerEvents="none"
dot.style.zIndex="999999"

document.body.appendChild(dot)

})

})

/* ===== brightness ===== */

btn("brightness_6",()=>{

const slider=document.createElement("input")

slider.type="range"
slider.min="0.3"
slider.max="2"
slider.step="0.1"
slider.value="1"
slider.className="ns-slider"

document.body.appendChild(slider)

slider.oninput=()=>{

document.body.style.filter=`brightness(${slider.value})`

}

})

/* ===== screenshot ===== */

btn("photo_camera",async()=>{

if(!window.html2canvas){

alert("スクショライブラリ読み込み中")
return

}

const canvas=await html2canvas(document.body)

const a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="screenshot.png"
a.click()

})

/* ===== lock page ===== */

btn("lock",()=>{

const lock=document.createElement("div")

lock.style.position="fixed"
lock.style.top="0"
lock.style.left="0"
lock.style.width="100%"
lock.style.height="100%"
lock.style.background="black"
lock.style.zIndex="999999"

document.body.appendChild(lock)

})

/* ===== selection UI ===== */

let selectionUI=null
let aiPanel=null

document.addEventListener("mouseup",()=>{

const text=window.getSelection().toString().trim()

if(!text){

if(selectionUI){
selectionUI.remove()
selectionUI=null
}

return
}

/* remove old */

if(selectionUI){
selectionUI.remove()
}

const range=window.getSelection().getRangeAt(0)
const rect=range.getBoundingClientRect()

selectionUI=document.createElement("div")
selectionUI.className="ns-selection"

selectionUI.innerHTML=`
<button id="nsSearch">Search</button>
<button id="nsAI">AI</button>
`

document.body.appendChild(selectionUI)

selectionUI.style.left=rect.left+"px"
selectionUI.style.top=(rect.top-40)+"px"

/* search */

document.getElementById("nsSearch").onclick=()=>{

window.open(
"https://www.google.com/search?q="+encodeURIComponent(text)
)

}

/* ai */

document.getElementById("nsAI").onclick=()=>{

showAI(text)

}

})

/* ===== AI summary ===== */

function showAI(text){

if(aiPanel) aiPanel.remove()

aiPanel=document.createElement("div")
aiPanel.className="ns-ai"

aiPanel.innerHTML="<b>AI Summary</b><br>生成中..."

document.body.appendChild(aiPanel)

setTimeout(()=>{

let short=text.slice(0,200)

aiPanel.innerHTML=`
<b>AI Summary</b><br><br>
${short}...
`

},600)

}

/* ===== click outside remove UI ===== */

document.addEventListener("mousedown",(e)=>{

if(selectionUI && !selectionUI.contains(e.target)){

selectionUI.remove()
selectionUI=null

}

if(aiPanel && !aiPanel.contains(e.target)){

aiPanel.remove()
aiPanel=null

}

})

/* ===== ad blocker ===== */

function removeAds(){

const selectors=[

"[id*=ad]",
"[class*=ad]",
"[class*=ads]",
"[class*=banner]",
"[class*=sponsor]",
"[class*=promo]",
"iframe[src*=ads]",
"iframe[src*=doubleclick]",
"iframe[src*=googlesyndication]",
"iframe[src*=adservice]"

]

selectors.forEach(sel=>{

document.querySelectorAll(sel).forEach(e=>{

e.remove()

})

})

}

removeAds()
setInterval(removeAds,3000)

/* ===== command palette ===== */

document.addEventListener("keydown",e=>{

if(e.ctrlKey && e.key==="k"){

e.preventDefault()

const box=document.createElement("div")

box.style.position="fixed"
box.style.top="50%"
box.style.left="50%"
box.style.transform="translate(-50%,-50%)"
box.style.background="black"
box.style.color="white"
box.style.padding="20px"
box.style.borderRadius="12px"
box.style.zIndex="999999"

box.innerHTML=`
<b>Command</b><br><br>
1 Screenshot<br>
2 Marker<br>
3 Brightness<br>
`

document.body.appendChild(box)

setTimeout(()=>box.remove(),3000)

}

})

})()
