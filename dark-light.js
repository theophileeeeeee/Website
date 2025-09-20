const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector(".icon");

const logos = {
  logo1: document.querySelector('.logo1'),
  logo2: document.querySelector('.logo2'),
  logo3: document.querySelector('.logo3'),
  logo4: document.querySelector('.logo4')
};

function updateLogos() {
  if(document.body.classList.contains('light-theme')) {
    icon.textContent = "☀️";
    logos.logo1.src = 'img/logo_applications/github light.png';
    logos.logo2.src = 'img/logo_applications/tiktok light.png';
    logos.logo3.src = 'img/logo_applications/instagram light.png';
    logos.logo4.src = 'img/logo_applications/itchio light.png';
  } else {
    icon.textContent = "🌙";
    logos.logo1.src = 'img/logo_applications/github.png';
    logos.logo2.src = 'img/logo_applications/tiktok.png';
    logos.logo3.src = 'img/logo_applications/instagram.png';
    logos.logo4.src = 'img/logo_applications/itchio.png';
  }
}

// Bouton toggle
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  
  // Sauvegarder le thème choisi
  if(document.body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }

  updateLogos();
});

// Charger le thème au démarrage selon localStorage
if(localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
} else {
  document.body.classList.remove('light-theme'); // optionnel pour forcer le dark
}

updateLogos(); // initialisation
