(function(){

if(window.__nsDock)return
window.__nsDock=true

const root=document.createElement("div")
root.style="position:fixed;left:0;top:0;z-index:2147483647"
document.body.appendChild(root)

const shadow=root.attachShadow({mode:"open"})

/* css */

const css=document.createElement("link")
css.rel="stylesheet"
css.href="https://ns-cloud-screenshot.pages.dev/tool.css"

shadow.appendChild(css)

/* bar */

const bar=document.createElement("div")
bar.className="ns-bar"
shadow.appendChild(bar)

/* icon helper */

function icon(svg){

let d=document.createElement("div")
d.className="ns-btn"
d.innerHTML=svg

return d
}

/* icons */

const ICON_CLOSE=`
<svg viewBox="0 0 24 24" width="20">
<path fill="white"
d="M18 6L6 18M6 6l12 12"
stroke="white" stroke-width="2"/>
</svg>
`

const ICON_HIDE=`
<svg viewBox="0 0 24 24" width="20">
<path fill="white"
d="M4 12h16"/>
</svg>
`

const ICON_BRIGHT=`
<svg viewBox="0 0 24 24" width="20">
<circle cx="12" cy="12" r="5" fill="white"/>
</svg>
`

const ICON_CAMERA=`
<svg viewBox="0 0 24 24" width="20">
<rect x="3" y="6" width="18" height="14"
stroke="white" fill="none"/>
<circle cx="12" cy="13" r="4"
stroke="white" fill="none"/>
</svg>
`

const ICON_LOCK=`
<svg viewBox="0 0 24 24" width="20">
<rect x="5" y="10" width="14" height="10"
stroke="white" fill="none"/>
<path d="M8 10V7a4 4 0 0 1 8 0v3"
stroke="white" fill="none"/>
</svg>
`

/* close */

let closeBtn=icon(ICON_CLOSE)
closeBtn.onclick=()=>root.remove()
bar.appendChild(closeBtn)

/* hide */

let hideBtn=icon(ICON_HIDE)
bar.appendChild(hideBtn)

const openBtn=document.createElement("div")
openBtn.className="ns-open"
openBtn.innerHTML="›"
openBtn.style.display="none"

openBtn.onclick=()=>{
bar.style.display="flex"
openBtn.style.display="none"
}

shadow.appendChild(openBtn)

hideBtn.onclick=()=>{
bar.style.display="none"
openBtn.style.display="flex"
}

/* brightness */

let brightBtn=icon(ICON_BRIGHT)
bar.appendChild(brightBtn)

let slider=document.createElement("input")
slider.type="range"
slider.min="0.3"
slider.max="2"
slider.step="0.1"
slider.value="1"
slider.className="ns-slider"
slider.style.display="none"

slider.oninput=()=>{
document.documentElement.style.filter=
`brightness(${slider.value})`
}

shadow.appendChild(slider)

brightBtn.onclick=()=>{
slider.style.display=
slider.style.display==="none"?"block":"none"
}

/* screenshot */

let shotBtn=icon(ICON_CAMERA)
bar.appendChild(shotBtn)

shotBtn.onclick=()=>{

let s=document.createElement("script")
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"

s.onload=()=>{

html2canvas(document.body).then(canvas=>{

let a=document.createElement("a")
a.href=canvas.toDataURL()
a.download="screenshot.png"
a.click()

})

}

document.head.appendChild(s)

}

/* lock */

let lockBtn=icon(ICON_LOCK)
bar.appendChild(lockBtn)

lockBtn.onclick=()=>{

let pin=prompt("PIN設定")

if(!pin)return

let lock=document.createElement("div")

lock.style=`
position:fixed;
inset:0;
background:black;
display:flex;
align-items:center;
justify-content:center;
z-index:999999999;
`

let input=document.createElement("input")
input.type="password"
input.placeholder="PIN"
input.style="font-size:24px;padding:12px"

lock.appendChild(input)
document.body.appendChild(lock)

input.onchange=()=>{
if(input.value===pin){
lock.remove()
}else{
alert("PIN違う")
}
}

}

/* selection search near text */

document.addEventListener("mouseup",(e)=>{

let text=window.getSelection().toString()

if(text.length<2)return

let btn=document.createElement("div")
btn.className="ns-search"

btn.innerHTML="Search"

btn.style.left=e.pageX+"px"
btn.style.top=e.pageY+"px"

btn.onclick=()=>{

window.open(
"https://www.google.com/search?q="+
encodeURIComponent(text),
"_blank"
)

btn.remove()

}

document.body.appendChild(btn)

setTimeout(()=>btn.remove(),4000)

})

})()
