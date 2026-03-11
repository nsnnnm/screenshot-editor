if(window.nsToolLoaded)return;
window.nsToolLoaded=true;

/* ---------- load css ---------- */

const css=document.createElement("link");
css.rel="stylesheet";
css.href="https://ns-cloud-screenshot.pages.dev/style.css";
document.head.appendChild(css);

/* ---------- icons ---------- */

const icon=document.createElement("link");
icon.rel="stylesheet";
icon.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded";
document.head.appendChild(icon);

/* ---------- html2canvas ---------- */

if(!window.html2canvas){
const s=document.createElement("script");
s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
document.head.appendChild(s);
}

/* ---------- dock ---------- */

const dock=document.createElement("div");
dock.className="ns-dock";
document.body.appendChild(dock);

/* ---------- flash ---------- */

const flash=document.createElement("div");
flash.className="ns-flash";
document.body.appendChild(flash);

/* ---------- button creator ---------- */

function btn(icon,fn){

const b=document.createElement("div");
b.className="ns-btn";

b.innerHTML=`<span class="material-symbols-rounded">${icon}</span>`;

b.onclick=fn;

dock.appendChild(b);

}

/* ---------- screenshot ---------- */

btn("photo_camera",async()=>{

flash.style.opacity="1";
setTimeout(()=>flash.style.opacity="0",120);

if(!window.html2canvas){
alert("loading screenshot engine");
return;
}

const canvas=await html2canvas(document.body);

const a=document.createElement("a");
a.href=canvas.toDataURL();
a.download="screenshot.png";
a.click();

});

/* ---------- marker ---------- */

let drawing=false;

btn("draw",()=>{

document.body.style.cursor="crosshair";

document.onmousedown=()=>drawing=true;
document.onmouseup=()=>drawing=false;

document.onmousemove=e=>{

if(!drawing)return;

const dot=document.createElement("div");

dot.style.position="fixed";
dot.style.left=e.clientX+"px";
dot.style.top=e.clientY+"px";
dot.style.width="6px";
dot.style.height="6px";
dot.style.background="red";
dot.style.borderRadius="50%";
dot.style.pointerEvents="none";
dot.style.zIndex="999999";

document.body.appendChild(dot);

};

});

/* ---------- brightness ---------- */

btn("brightness_6",()=>{

const slider=document.createElement("input");

slider.type="range";
slider.min="0.3";
slider.max="2";
slider.step="0.1";
slider.value="1";

slider.className="ns-slider";

document.body.appendChild(slider);

slider.oninput=()=>{

document.body.style.filter=`brightness(${slider.value})`;

};

});

/* ---------- lock ---------- */

btn("lock",()=>{

const lock=document.createElement("div");

lock.className="ns-lock";

document.body.appendChild(lock);

});

/* ---------- clipboard ---------- */

btn("content_paste",()=>{

const t=localStorage.getItem("ns_clip");

if(!t){
alert("clipboard empty");
return;
}

navigator.clipboard.writeText(t);

});

/* ---------- selection ui ---------- */

let selectUI;
let aiPanel;

document.addEventListener("mouseup",()=>{

const text=window.getSelection().toString().trim();

if(!text){

if(selectUI){
selectUI.remove();
selectUI=null;
}

return;
}

localStorage.setItem("ns_clip",text);

const range=window.getSelection().getRangeAt(0);
const rect=range.getBoundingClientRect();

if(selectUI)selectUI.remove();

selectUI=document.createElement("div");
selectUI.className="ns-selectUI";

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

showAI(text);

};

});

/* ---------- AI ---------- */

function showAI(text){

if(aiPanel)aiPanel.remove();

aiPanel=document.createElement("div");
aiPanel.className="ns-ai";

aiPanel.innerHTML="<b>AI Summary</b><br>Generating...";

document.body.appendChild(aiPanel);

setTimeout(()=>{

aiPanel.innerHTML="<b>AI Summary</b><br><br>"+text.slice(0,250)+"...";

},600);

}

/* ---------- auto close ui ---------- */

document.addEventListener("mousedown",(e)=>{

if(selectUI && !selectUI.contains(e.target)){
selectUI.remove();
selectUI=null;
}

if(aiPanel && !aiPanel.contains(e.target)){
aiPanel.remove();
aiPanel=null;
}

});

/* ---------- adblock ---------- */

function removeAds(){

const selectors=[
"[id*=ad]",
"[class*=ad]",
"[class*=banner]",
"[class*=promo]",
"[class*=sponsor]",
"iframe[src*=ads]",
"iframe[src*=doubleclick]",
"iframe[src*=googlesyndication]"
];

selectors.forEach(s=>{
document.querySelectorAll(s).forEach(e=>e.remove());
});

}

removeAds();
setInterval(removeAds,4000);

/* ---------- page ai ---------- */

btn("auto_awesome",()=>{

const text=document.body.innerText.slice(0,1500);
showAI(text);

});
