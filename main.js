const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

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

canvas.onmouseup=()=>{
drawing=false
}

document.getElementById("save").onclick=()=>{
let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="screenshot.png"
a.click()
}
