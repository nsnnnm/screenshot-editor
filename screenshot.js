```javascript
(async()=>{

if(window.__nsShot)return
window.__nsShot=true

/* html2canvas */
if(!window.html2canvas){
let s=document.createElement("script")
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
document.head.appendChild(s)
await new Promise(r=>s.onload=r)
}

/* flash */
let flash=document.createElement("div")
flash.style="position:fixed;inset:0;background:white;z-index:2147483646;opacity:0;transition:opacity .15s"
document.body.appendChild(flash)

requestAnimationFrame(()=>flash.style.opacity=1)
setTimeout(()=>flash.style.opacity=0,120)
setTimeout(()=>flash.remove(),300)

/* screenshot */
let shot=await html2canvas(document.body)

/* root */
const root=document.createElement("div")
root.style="position:fixed;inset:0;z-index:2147483647;pointer-events:none"
document.body.appendChild(root)

const shadow=root.attachShadow({mode:"open"})

const style=document.createElement("style")
style.textContent=`

.thumb{
position:fixed;
bottom:20px;
right:20px;
width:160px;
border-radius:10px;
box-shadow:0 10px 40px rgba(0,0,0,.6);
cursor:pointer;
transition:.25s;
}

.thumb:hover{
transform:scale(1.05);
}

.editor{
position:fixed;
inset:0;
background:rgba(0,0,0,.75);
display:flex;
align-items:center;
justify-content:center;
}

canvas{
max-width:90vw;
max-height:90vh;
border-radius:12px;
background:black;
touch-action:none;
}

.toolbar{
position:fixed;
top:20px;
left:50%;
transform:translateX(-50%);
background:#1e1e1e;
padding:8px;
border-radius:10px;
display:flex;
gap:8px;
}

button{
background:#2c2c2c;
border:none;
color:white;
padding:6px 10px;
border-radius:6px;
cursor:pointer;
font-size:14px;
}

button:hover{
background:#444;
}

`

shadow.appendChild(style)

/* thumbnail */
let thumb=document.createElement("img")
thumb.className="thumb"
thumb.src=shot.toDataURL()
thumb.style.pointerEvents="auto"

shadow.appendChild(thumb)

/* open editor */
thumb.onclick=()=>{

thumb.remove()

const editor=document.createElement("div")
editor.className="editor"
editor.style.pointerEvents="auto"
shadow.appendChild(editor)

/* canvas */
const canvas=document.createElement("canvas")
canvas.width=shot.width
canvas.height=shot.height
editor.appendChild(canvas)

const ctx=canvas.getContext("2d")
ctx.drawImage(shot,0,0)

/* toolbar */
const toolbar=document.createElement("div")
toolbar.className="toolbar"

toolbar.innerHTML=`
<button id="pen">✏</button>
<button id="color">🎨</button>
<button id="clear">🧹</button>
<button id="save">💾</button>
<button id="close">✕</button>
`

shadow.appendChild(toolbar)

/* draw */
let drawing=false
let color="red"

function pos(e){
let r=canvas.getBoundingClientRect()
if(e.touches){
return{
x:e.touches[0].clientX-r.left,
y:e.touches[0].clientY-r.top
}
}
return{x:e.offsetX,y:e.offsetY}
}

function start(e){
drawing=true
let p=pos(e)
ctx.beginPath()
ctx.moveTo(p.x,p.y)
}

function move(e){
if(!drawing)return
let p=pos(e)

ctx.lineTo(p.x,p.y)
ctx.strokeStyle=color
ctx.lineWidth=4
ctx.lineCap="round"
ctx.stroke()
}

function end(){
drawing=false
}

canvas.addEventListener("mousedown",start)
canvas.addEventListener("mousemove",move)
canvas.addEventListener("mouseup",end)

canvas.addEventListener("touchstart",start)
canvas.addEventListener("touchmove",move)
canvas.addEventListener("touchend",end)

/* buttons */

shadow.getElementById("color").onclick=()=>{
color=prompt("色を入力 (red / blue / yellow / #ff0000)",color)||color
}

shadow.getElementById("clear").onclick=()=>{
ctx.drawImage(shot,0,0)
}

shadow.getElementById("save").onclick=()=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="screenshot.png"
a.click()
}

shadow.getElementById("close").onclick=()=>{
root.remove()
window.__nsShot=false
}

}

})()
```
