(function(){

if(window.__nsDock)return
window.__nsDock=true

/* root */

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

function add(icon,fn){

let b=document.createElement("div")
b.className="ns-btn"
b.innerHTML=icon
b.onclick=fn

bar.appendChild(b)

}

/* close */

add("✕",()=>{
root.remove()
})

/* hide */

add("⤺",()=>{
bar.style.display="none"
openBtn.style.display="flex"
})

/* open */

const openBtn=document.createElement("div")
openBtn.className="ns-open"
openBtn.innerHTML="❯"
openBtn.style.display="none"

openBtn.onclick=()=>{
bar.style.display="flex"
openBtn.style.display="none"
}

shadow.appendChild(openBtn)

/* brightness */

const brightBtn=document.createElement("div")
brightBtn.className="ns-btn"
brightBtn.innerHTML="☀"
bar.appendChild(brightBtn)

const sliderBox=document.createElement("div")
sliderBox.className="ns-sliderbox"
sliderBox.style.display="none"

const slider=document.createElement("input")
slider.type="range"
slider.min="0.3"
slider.max="2"
slider.step="0.1"
slider.value="1"

slider.oninput=()=>{
document.documentElement.style.filter=
`brightness(${slider.value})`
}

sliderBox.appendChild(slider)
shadow.appendChild(sliderBox)

brightBtn.onclick=()=>{

sliderBox.style.display=
sliderBox.style.display==="none"?"block":"none"

sliderBox.style.top=
brightBtn.getBoundingClientRect().top+"px"

}

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

})

/* selection search */

document.addEventListener("mouseup",()=>{

let text=window.getSelection().toString()

if(text.length<2)return

let btn=document.createElement("div")
btn.className="ns-search"
btn.innerHTML="🔎"

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
