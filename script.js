const pages = [...document.querySelectorAll(".page")];
const correctPin = "0906";
let pin = "";

function showPage(id){
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.querySelectorAll("[data-go]").forEach(btn=>{
  btn.addEventListener("click",()=>showPage(btn.dataset.go));
});

document.getElementById("noButton").addEventListener("click",()=>showPage("wrongPage"));

function updatePin(){
  for(let i=1;i<=4;i++){
    document.getElementById("p"+i).classList.toggle("active",i<=pin.length);
  }
}
function resetPin(){
  pin="";
  updatePin();
  document.getElementById("pinMessage").textContent="";
}
function checkPin(){
  const msg=document.getElementById("pinMessage");
  const phone=document.getElementById("phone");
  if(pin===correctPin){
    msg.textContent="Doğru şifre ♡";
    burstSmall();
    setTimeout(()=>showPage("memoryPage"),650);
  }else{
    msg.textContent="Bu şifre olmadı sevgilim.";
    phone.classList.add("shake");
    setTimeout(()=>{phone.classList.remove("shake");resetPin()},650);
  }
}
document.querySelectorAll("[data-key]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(pin.length<4){
      pin+=btn.dataset.key;
      updatePin();
      if(pin.length===4)setTimeout(checkPin,160);
    }
  });
});
document.getElementById("deletePin").addEventListener("click",()=>{pin=pin.slice(0,-1);updatePin()});
document.getElementById("submitPin").addEventListener("click",checkPin);

document.getElementById("envelope").addEventListener("click",function(){
  this.classList.add("open");
  setTimeout(()=>showPage("openLetterPage"),1000);
});

document.getElementById("jarButton").addEventListener("click",()=>{
  const layer=document.getElementById("heartExplosion");
  for(let i=0;i<95;i++){
    const h=document.createElement("span");
    h.className="explosion-heart";
    h.style.setProperty("--x",`${(Math.random()-.5)*1100}px`);
    h.style.setProperty("--y",`${-150-Math.random()*800}px`);
    h.style.setProperty("--s",`${.4+Math.random()*1.7}`);
    h.style.animationDelay=`${Math.random()*.35}s`;
    layer.appendChild(h);
    setTimeout(()=>h.remove(),2200);
  }
  setTimeout(()=>showPage("finalPage"),1500);
});

function burstSmall(){
  const layer=document.getElementById("heartExplosion");
  for(let i=0;i<20;i++){
    const h=document.createElement("span");
    h.className="explosion-heart";
    h.style.setProperty("--x",`${(Math.random()-.5)*420}px`);
    h.style.setProperty("--y",`${(Math.random()-.5)*420}px`);
    h.style.setProperty("--s",`${.3+Math.random()}`);
    layer.appendChild(h);
    setTimeout(()=>h.remove(),1700);
  }
}

document.getElementById("restartButton").addEventListener("click",()=>{
  resetPin();
  document.getElementById("envelope").classList.remove("open");
  showPage("askPage");
});
