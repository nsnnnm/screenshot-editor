(async()=>{

/* html2canvasロード */
if(!window.html2canvas){
let s=document.createElement("script")
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
document.head.appendChild(s)
await new Promise(r=>s.onload=r)
}

/* フラッシュアニメーション */
let flash=document.createElement("div")
flash.style="position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:999999;opacity:0;transition:opacity .2s"
document.body.appendChild(flash)

flash.style.opacity=1
setTimeout(()=>flash.style.opacity=0,100)

/* スクショ */
let shot=await html2canvas(document.body)

/* overlay */
let overlay=document.createElement("div")
overlay.id="ss_overlay"
document.body.appendChild(overlay)

/* canvas */
let canvas=document.createElement("canvas")
canvas.id="ss_canvas"
canvas.width=shot.width
canvas.height=shot.height
overlay.appendChild(canvas)

let ctx=canvas.getContext("2d")
ctx.drawImage(shot,0,0)

/* toolbar */
let toolbar=document.createElement("div")
toolbar.id="ss_toolbar"

toolbar.innerHTML=`
<button id="ss_pen">✏</button>
<button id="ss_save">💾</button>
<button id="ss_close">✕</button>
`

document.body.appendChild(toolbar)

/* drawing */
let drawing=false

canvas.onmousedown=e=>{
drawing=true
ctx.beginPath()
ctx.moveTo(e.offsetX,e.offsetY)
}

canvas.onmousemove=e=>{
if(!drawing)return
ctx.lineTo(e.offsetX,e.offsetY)
ctx.strokeStyle="red"
ctx.lineWidth=4
ctx.stroke()
}

canvas.onmouseup=()=>drawing=false

/* save */
document.getElementById("ss_save").onclick=()=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="screenshot.png"
a.click()
}

/* close */
document.getElementById("ss_close").onclick=()=>{
overlay.remove()
toolbar.remove()
}

})()
