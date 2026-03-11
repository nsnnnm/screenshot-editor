window.NSTOOL = {};

(function(){

/* ------------------ ICON ------------------ */

const icon=document.createElement("link");
icon.rel="stylesheet";
icon.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded";
document.head.appendChild(icon);

/* ------------------ CSS ------------------ */

const css=`
.ns-dock{
position:fixed;
left:10px;
top:50%;
transform:translateY(-50%);
display:flex;
flex-direction:column;
gap:12px;
padding:14px;
background:rgba(30,30,30,.65);
backdrop-filter:blur(20px);
border-radius:22px;
z-index:999999;
}

.ns-btn{
width:46px;
height:46px;
display:flex;
align-items:center;
justify-content:center;
border-radius:14px;
background:rgba(255,255,255,.08);
cursor:pointer;
transition:all .15s;
}

.ns-btn:hover{
transform:scale(1.45);
background:rgba(255,255,255,.25);
}

.ns-btn span{
font-family:'Material Symbols Rounded';
color:white;
font-size:24px;
}

.ns-select{
position:absolute;
background:#111;
color:white;
padding:6px 8px;
border-radius:10px;
display:flex;
gap:6px;
z-index:999999;
}

.ns-ai{
position:fixed;
right:20px;
bottom:20px;
width:300px;
background:#111;
color:white;
padding:14px;
border-radius:12px;
z-index:999999;
}

`;
const style=document.createElement("style");
style.innerHTML=css;
document.head.appendChild(style);

/* ------------------ DOCK ------------------ */

const dock=document.createElement("div");
dock.className="ns-dock";
document.body.appendChild(dock);

/* ------------------ BTN ------------------ */

function btn(icon,fn){

const b=document.createElement("div");
b.className="ns-btn";
b.innerHTML=`<span class="material-symbols-rounded">${icon}</span>`;
b.onclick=fn;

dock.appendChild(b);

}

/* ------------------ SCREENSHOT ------------------ */

btn("photo_camera",async()=>{

if(!window.html2canvas){

const s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
document.body.appendChild(s);

alert("loading screenshot engine");

return;
}

const canvas=await html2canvas(document.body);

const a=document.createElement("a");
a.href=canvas.toDataURL();
a.download="screenshot.png";
a.click();

});

/* ------------------ BRIGHTNESS ------------------ */

btn("brightness_6",()=>{

const slider=document.createElement("input");
slider.type="range";
slider.min="0.3";
slider.max="2";
slider.step="0.1";
slider.value="1";

slider.style.position="fixed";
slider.style.left="90px";
slider.style.top="50%";

document.body.appendChild(slider);

slider.oninput=()=>{

document.body.style.filter=`brightness(${slider.value})`;

};

});

/* ------------------ LOCK ------------------ */

btn("lock",()=>{

const lock=document.createElement("div");

lock.style.position="fixed";
lock.style.top="0";
lock.style.left="0";
lock.style.width="100%";
lock.style.height="100%";
lock.style.background="black";
lock.style.zIndex="999999";

document.body.appendChild(lock);

});

/* ------------------ AD BLOCK ------------------ */

function removeAds(){

const list=[
"[id*=ad]",
"[class*=ad]",
"[class*=banner]",
"[class*=sponsor]",
"iframe[src*=ads]",
"iframe[src*=doubleclick]"
];

list.forEach(s=>{
document.querySelectorAll(s).forEach(e=>e.remove());
});

}

removeAds();
setInterval(removeAds,3000);

/* ------------------ TEXT SELECT ------------------ */

let selectUI;

document.addEventListener("mouseup",()=>{

const text=window.getSelection().toString().trim();

if(!text){

if(selectUI)selectUI.remove();
return;

}

const range=window.getSelection().getRangeAt(0);
const rect=range.getBoundingClientRect();

selectUI=document.createElement("div");
selectUI.className="ns-select";

selectUI.innerHTML=`
<button id="nsSearch">Search</button>
<button id="nsWiki">Wiki</button>
<button id="nsCopy">Copy</button>
<button id="nsAI">AI</button>
`;

document.body.appendChild(selectUI);

selectUI.style.left=rect.left+"px";
selectUI.style.top=(rect.top-40)+"px";

/* search */

document.getElementById("nsSearch").onclick=()=>{

window.open("https://google.com/search?q="+encodeURIComponent(text));

};

/* wiki */

document.getElementById("nsWiki").onclick=()=>{

window.open("https://ja.wikipedia.org/wiki/"+encodeURIComponent(text));

};

/* copy */

document.getElementById("nsCopy").onclick=()=>{

navigator.clipboard.writeText(text);

};

/* ai */

document.getElementById("nsAI").onclick=()=>{

ai(text);

};

});

/* ------------------ AI ------------------ */

function ai(text){

let panel=document.querySelector(".ns-ai");

if(panel)panel.remove();

panel=document.createElement("div");
panel.className="ns-ai";

panel.innerHTML="<b>AI Summary</b><br>Generating...";

document.body.appendChild(panel);

setTimeout(()=>{

panel.innerHTML="<b>AI Summary</b><br><br>"+text.slice(0,200)+"...";

},700);

}

/* ------------------ COMMAND ------------------ */

document.addEventListener("keydown",e=>{

if(e.ctrlKey && e.key==="k"){

alert(`NS TOOL

📸 screenshot
🌙 brightness
🔎 search
🧠 AI summary
`);

}

});

})();
