(function(){

if(window.__nsdock)return
window.__nsdock=true

const root=document.createElement("div")
root.style="position:fixed;z-index:2147483647"
document.body.appendChild(root)

const shadow=root.attachShadow({mode:"open"})

/* style */
const style=document.createElement("link")
style.rel="stylesheet"
style.href="https://ns-cloud-screenshot.pages.dev/style.css"
shadow.appendChild(style)

/* bar */
const bar=document.createElement("div")
bar.className="bar"
shadow.appendChild(bar)

function add(icon,fn){
let b=document.createElement("div")
b.className="btn"
b.textContent=icon
b.onclick=fn
bar.appendChild(b)
}

/* close */
add("❌",()=>{
root.remove()
})

/* hide */
add("👁",()=>{
bar.style.display="none"
setTimeout(()=>bar.style.display="flex",2000)
})

/* brightness slider */
const brightBox=document.createElement("div")
brightBox.className="btn"
brightBox.textContent="☀"
bar.appendChild(brightBox)

const slider=document.createElement("input")
slider.type="range"
slider.min="0.4"
slider.max="2"
slider.step="0.1"
slider.value="1"
slider.className="slider"
slider.style.display="none"

brightBox.onclick=()=>{
slider.style.display=
slider.style.display==="none"?"block":"none"
}

slider.oninput=()=>{
document.documentElement.style.filter=
`brightness(${slider.value})`
}

bar.appendChild(slider)

/* screenshot */

add("📸",()=>{

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

})

/* lock */

add("🔒",()=>{

let pin=prompt("PIN設定")

if(!pin)return

let lock=document.createElement("div")

lock.style=`
position:fixed;
inset:0;
background:black;
z-index:999999999;
display:flex;
align-items:center;
justify-content:center;
`

let input=document.createElement("input")
input.type="password"
input.placeholder="PIN"
input.style="font-size:22px;padding:10px"

lock.appendChild(input)
document.body.appendChild(lock)

input.onchange=()=>{

if(input.value===pin){
lock.remove()
}else{
alert("PIN違う")
}

}

})

/* selection search */

document.addEventListener("mouseup",()=>{

let text=window.getSelection().toString()

if(text.length<2)return

let btn=document.createElement("div")

btn.textContent="🔎"

btn.style=`
position:fixed;
bottom:20px;
right:20px;
background:white;
padding:10px;
border-radius:12px;
font-size:22px;
cursor:pointer;
z-index:999999999;
`

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
