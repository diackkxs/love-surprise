const pages = [...document.querySelectorAll('.page')];

function show(id) {
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

const bgMusic = document.getElementById('bgMusic');
const duckSound = document.getElementById('duckSound');

bgMusic.volume = 0.2;
duckSound.volume = 0.8;

function startMusic() {
  if (bgMusic.paused) {
    bgMusic.play().catch(error => {
      console.log('Müzik başlatılamadı:', error);
    });
  }
}

document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', () => {
    const targetPage = button.dataset.page;

    if (button.classList.contains('yes')) {
      startMusic();
    }

    if (button.classList.contains('no')) {
      duckSound.currentTime = 0;

      duckSound.play().catch(error => {
        console.log('Ördek sesi başlatılamadı:', error);
      });

      document.body.classList.add('shake');

      setTimeout(() => {
        document.body.classList.remove('shake');
      }, 600);
    }

    show(targetPage);
  });
});

let pin = '';
const correct = '0906';
const dots = [...document.querySelectorAll('.dots i')];
const msg = document.getElementById('pinMsg');
const phone = document.querySelector('.phone');

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('on', index < pin.length);
  });
}

function reset() {
  pin = '';
  updateDots();
  msg.textContent = '';
}

function check() {
  if (pin === correct) {
    msg.textContent = 'Doğru şifre ♡';

    setTimeout(() => {
      show('memories');
    }, 500);
  } else {
    msg.textContent = 'Bu şifre olmadı sevgilim.';
    phone.classList.add('shake');

    setTimeout(() => {
      phone.classList.remove('shake');
      reset();
    }, 600);
  }
}

document.querySelectorAll('[data-key]').forEach(button => {
  button.addEventListener('click', () => {
    if (pin.length < 4) {
      pin += button.dataset.key;
      updateDots();

      if (pin.length === 4) {
        setTimeout(check, 150);
      }
    }
  });
});

document.getElementById('del').addEventListener('click', () => {
  pin = pin.slice(0, -1);
  updateDots();
});

document.getElementById('ok').addEventListener('click', check);

document.getElementById('envelope').addEventListener('click', function () {
  this.classList.add('open');

  setTimeout(() => {
    show('openLetter');
  }, 950);
});

document.getElementById('jarBtn').addEventListener('click', () => {
  const layer = document.getElementById('burst');

  for (let i = 0; i < 90; i++) {
    const heart = document.createElement('i');

    heart.className = 'burst-heart';
    heart.style.setProperty('--x', `${(Math.random() - 0.5) * 1100}px`);
    heart.style.setProperty('--y', `${-120 - Math.random() * 780}px`);
    heart.style.setProperty('--s', `${0.4 + Math.random() * 1.5}`);
    heart.style.animationDelay = `${Math.random() * 0.3}s`;

    layer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }

  setTimeout(() => {
    show('final');
  }, 1350);
});

document.getElementById('restart').addEventListener('click', () => {
  reset();
  document.getElementById('envelope').classList.remove('open');
  show('welcome');
});
