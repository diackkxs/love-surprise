const correctPin = "0906";
let enteredPin = "";
let musicPlaying = false;

const phone = document.getElementById("phone");
const pinMessage = document.getElementById("pinMessage");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

function updateDots(){
  for(let i=1;i<=4;i++){
    document.getElementById("dot"+i).classList.toggle("active", i<=enteredPin.length);
  }
}

function clearPin(){
  enteredPin = "";
  updateDots();
}

function checkPin(){
  if(enteredPin === correctPin){
    pinMessage.textContent = "Doğru PIN ❤️";
    createBurst("❤️", 18);
    setTimeout(()=>showPage("introScreen"), 650);
  }else{
    pinMessage.textContent = "Yanlış PIN, bir daha dene 💔";
    phone.classList.add("shake");
    setTimeout(()=>{
      phone.classList.remove("shake");
      clearPin();
    }, 650);
  }
}

document.querySelectorAll("[data-number]").forEach(button=>{
  button.addEventListener("click", ()=>{
    if(enteredPin.length < 4){
      enteredPin += button.dataset.number;
      updateDots();
      if(enteredPin.length === 4){
        setTimeout(checkPin, 180);
      }
    }
  });
});

document.getElementById("deleteKey").addEventListener("click", ()=>{
  enteredPin = enteredPin.slice(0,-1);
  updateDots();
  pinMessage.textContent = "";
});

document.getElementById("enterKey").addEventListener("click", checkPin);

document.querySelectorAll("[data-next]").forEach(button=>{
  button.addEventListener("click", ()=>showPage(button.dataset.next));
});

function showPage(id){
  document.querySelectorAll(".page").forEach(page=>page.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("envelopeButton").addEventListener("click", function(){
  this.classList.add("open");
  createBurst("💕", 15);
  setTimeout(()=>showPage("openedLetterScreen"), 1000);
});

document.getElementById("kissButton").addEventListener("click", ()=>{
  for(let i=0;i<70;i++){
    setTimeout(createKiss, i*55);
  }
});

document.getElementById("restartButton").addEventListener("click", ()=>{
  clearPin();
  pinMessage.textContent = "";
  showPage("pinScreen");
});

function createKiss(){
  const item = document.createElement("span");
  item.className = "kiss";
  item.textContent = Math.random()>.45 ? "💋" : "❤️";
  item.style.left = Math.random()*100 + "vw";
  item.style.animationDuration = 2.7 + Math.random()*3 + "s";
  document.getElementById("kissRain").appendChild(item);
  setTimeout(()=>item.remove(), 6500);
}

function createBurst(symbol, count){
  for(let i=0;i<count;i++){
    const item = document.createElement("span");
    item.textContent = symbol;
    item.style.position = "fixed";
    item.style.left = "50%";
    item.style.top = "50%";
    item.style.zIndex = "50";
    item.style.pointerEvents = "none";
    item.style.fontSize = 18 + Math.random()*24 + "px";
    const x = (Math.random()-.5)*500;
    const y = (Math.random()-.5)*500;
    item.animate(
      [
        {transform:"translate(-50%,-50%) scale(.3)",opacity:1},
        {transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.4)`,opacity:0}
      ],
      {duration:900+Math.random()*600,easing:"ease-out"}
    );
    document.body.appendChild(item);
    setTimeout(()=>item.remove(),1600);
  }
}

function createFloatingHeart(){
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random()>.35 ? "♡" : "♥";
  heart.style.left = Math.random()*100 + "vw";
  heart.style.fontSize = 16 + Math.random()*28 + "px";
  heart.style.animationDuration = 6 + Math.random()*7 + "s";
  document.getElementById("floatingHearts").appendChild(heart);
  setTimeout(()=>heart.remove(),14000);
}
setInterval(createFloatingHeart, 700);

musicButton.addEventListener("click", async ()=>{
  try{
    if(musicPlaying){
      music.pause();
      musicButton.textContent = "♪ Müziği Aç";
    }else{
      await music.play();
      musicButton.textContent = "❚❚ Müziği Kapat";
    }
    musicPlaying = !musicPlaying;
  }catch(error){
    musicButton.textContent = "MP3 dosyasını ekle";
  }
});
