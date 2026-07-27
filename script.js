let pin="";

const correct="0906";

function press(num){

if(pin.length<4){

pin+=num;

document.getElementById("d"+pin.length).classList.add("active");

}

}

function clearPin(){

pin="";

for(let i=1;i<=4;i++){

document.getElementById("d"+i).classList.remove("active");

}

document.getElementById("message").innerHTML="";

}

function checkPin(){

if(pin===correct){

document.body.innerHTML=`

<div style="height:100vh;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background:linear-gradient(135deg,#ff8fb1,#ff5f8a);color:white;font-family:Arial">

<h1 style="font-size:55px;">❤️</h1>

<h2>Merhaba Sevgilim</h2>

<p style="width:70%;text-align:center;font-size:20px;line-height:35px;">

Bu sadece küçük bir internet sitesi değil.

Aslında sana söylemek istediğim her şeyin başlangıcı.

Hazırsan devam edelim...

</p>

<button
onclick="alert('Bir sonraki bölümde açılan mektup gelecek ❤️')"
style="padding:18px 35px;
font-size:20px;
border:none;
border-radius:50px;
cursor:pointer;
margin-top:25px;">

Devam Et ❤️

</button>

</div>

`;

}else{

document.querySelector(".phone").classList.add("shake");

document.getElementById("message").innerHTML="Yanlış PIN 💔";

setTimeout(()=>{

document.querySelector(".phone").classList.remove("shake");

clearPin();

},700);

}

}
