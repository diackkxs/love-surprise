const pages=[...document.querySelectorAll('.page')];
function show(id){pages.forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0)}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.page)));

let pin='';
const correct='0906';
const dots=[...document.querySelectorAll('.dots i')];
const msg=document.getElementById('pinMsg');
const phone=document.querySelector('.phone');

function updateDots(){dots.forEach((d,i)=>d.classList.toggle('on',i<pin.length))}
function reset(){pin='';updateDots();msg.textContent=''}
function check(){
  if(pin===correct){
    msg.textContent='Doğru şifre ♡';
    setTimeout(()=>show('memories'),500);
  }else{
    msg.textContent='Bu şifre olmadı sevgilim.';
    phone.classList.add('shake');
    setTimeout(()=>{phone.classList.remove('shake');reset()},600);
  }
}
document.querySelectorAll('[data-key]').forEach(b=>b.addEventListener('click',()=>{if(pin.length<4){pin+=b.dataset.key;updateDots();if(pin.length===4)setTimeout(check,150)}}));
document.getElementById('del').addEventListener('click',()=>{pin=pin.slice(0,-1);updateDots()});
document.getElementById('ok').addEventListener('click',check);

document.getElementById('envelope').addEventListener('click',function(){
  this.classList.add('open');
  setTimeout(()=>show('openLetter'),950);
});

document.getElementById('jarBtn').addEventListener('click',()=>{
  const layer=document.getElementById('burst');
  for(let i=0;i<90;i++){
    const h=document.createElement('i');
    h.className='burst-heart';
    h.style.setProperty('--x',`${(Math.random()-.5)*1100}px`);
    h.style.setProperty('--y',`${-120-Math.random()*780}px`);
    h.style.setProperty('--s',`${.4+Math.random()*1.5}`);
    h.style.animationDelay=`${Math.random()*.3}s`;
    layer.appendChild(h);
    setTimeout(()=>h.remove(),2000);
  }
  setTimeout(()=>show('final'),1350);
});

document.getElementById('restart').addEventListener('click',()=>{
  reset();
  document.getElementById('envelope').classList.remove('open');
  show('welcome');
});
