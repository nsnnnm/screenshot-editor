javascript:(async()=>{

/* ========= prevent duplicate ========= */

if(window.nsToolLoaded){
alert("NS Tool already running")
return
}
window.nsToolLoaded=true

/* ========= icon font ========= */

const iconFont=document.createElement("link")
iconFont.rel="stylesheet"
iconFont.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
document.head.appendChild(iconFont)

/* ========= html2canvas ========= */

if(!window.html2canvas){
const s=document.createElement("script")
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
document.head.appendChild(s)
}

/* ========= style ========= */

const style=document.createElement("style")
style.innerHTML=`

.ns-bar{
position:fixed;
left:12px;
top:50%;
transform:translateY(-50%);
display:flex;
flex-direction:column;
gap:14px;
padding:14px;
border-radius:20px;
background:rgba(30,30,30,.6);
backdrop-filter:blur(16px);
z-index:999999;
}

.ns-btn{
width:48px;
height:48px;
display:flex;
align-items:center;
justify-content:center;
border-radius:14px;
cursor:pointer;
background:rgba(255,255,255,.05);
transition:transform .15s;
}

.ns-btn:hover{
transform:scale(1.4);
background:rgba(255,255,255,.2);
}

.ns-btn span{
font-family:'Material Symbols Rounded';
color:white;
font-size:24px;
}

.ns-selection{
position:absolute;
display:flex;
gap:6px;
background:#111;
color:white;
padding:6px 8px;
border-radius:8px;
z-index:999999;
}

.ns-selection button{
background:#222;
color:white;
border:none;
padding:5px 8px;
border-radius:6px;
cursor:pointer;
}

.ns-ai{
position:fixed;
right:20px;
bottom:20px;
background:#111;
color:white;
padding:12px;
border-radius:10px;
width:260px;
z-index:999999;
}

`
document.head.appendChild(style)

/* ========= dock ========= */

const bar=document.createElement("div")
bar.className="ns-bar"
document.body.appendChild(bar)

/* ========= button creator ========= */

function btn(icon,click){

const b=document.createElement("div")
b.className="ns-btn"
b.innerHTML=`<span class="material-symbols-rounded">${icon}</span>`
b.onclick=click

bar.appendChild(b)

}

/* ========= marker ========= */

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

/* ========= brightness ========= */

btn("brightness_6",()=>{

const slider=document.createElement("input")

slider.type="range"
slider.min="0.3"
slider.max="2"
slider.step="0.1"
slider.value="1"

slider.style.position="fixed"
slider.style.left="80px"
slider.style.top="50%"
slider.style.zIndex="999999"

document.body.appendChild(slider)

slider.oninput=()=>{

document.body.style.filter=`brightness(${slider.value})`

}

})

/* ========= screenshot ========= */

btn("photo_camera",async()=>{

if(!window.html2canvas){
alert("loading screenshot library")
return
}

const canvas=await html2canvas(document.body)

const a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="screenshot.png"
a.click()

})

/* ========= page lock ========= */

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

/* ========= paste clipboard ========= */

btn("content_paste",()=>{

const text=localStorage.getItem("ns_clip")

if(!text){
alert("clipboard empty")
return
}

navigator.clipboard.writeText(text)

alert("clipboard copied")

})

/* ========= selection ========= */

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

/* save shared clipboard */

localStorage.setItem("ns_clip",text)

/* remove old */

if(selectionUI) selectionUI.remove()

const range=window.getSelection().getRangeAt(0)
const rect=range.getBoundingClientRect()

selectionUI=document.createElement("div")
selectionUI.className="ns-selection"

selectionUI.innerHTML=`
<button id="nsSearch">Search</button>
<button id="nsAI">AI</button>
<button id="nsCopy">Copy</button>
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

/* copy */

document.getElementById("nsCopy").onclick=()=>{

navigator.clipboard.writeText(text)

}

/* ai */

document.getElementById("nsAI").onclick=()=>{

showAI(text)

}

})

/* ========= ai summary ========= */

function showAI(text){

if(aiPanel) aiPanel.remove()

aiPanel=document.createElement("div")
aiPanel.className="ns-ai"

aiPanel.innerHTML="<b>AI Summary</b><br>generating..."

document.body.appendChild(aiPanel)

setTimeout(()=>{

aiPanel.innerHTML="<b>AI Summary</b><br><br>"+text.slice(0,200)+"..."

},600)

}

/* ========= click outside close ========= */

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

/* ========= adblock ========= */

function removeAds(){

const selectors=[

"[id*=ad]",
"[class*=ad]",
"[class*=banner]",
"[class*=sponsor]",
"iframe[src*=ads]",
"iframe[src*=doubleclick]",
"iframe[src*=googlesyndication]"

]

selectors.forEach(sel=>{

document.querySelectorAll(sel).forEach(e=>e.remove())

})

}

removeAds()
setInterval(removeAds,3000)

})()
