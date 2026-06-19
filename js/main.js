document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
});

const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

root.setAttribute('data-theme', savedTheme);

// Fonction pour mettre à jour l'icône Lune/Soleil avec le bon dossier img/
function updateThemeIcon(currentTheme) {
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) return;
  
  if (currentTheme === 'light') {
    themeIcon.src = './img/soleil.png';
  } else {
    themeIcon.src = './img/lune.png';
  }
}

function updateSocialIcons() {
  const icons = document.querySelectorAll('.socials img');
  const isDark = root.getAttribute('data-theme') === 'dark';

  icons.forEach(img => {
    let src = img.getAttribute('src');
    if (!src) return;

    if (!isDark) {
      if (!src.includes('-light')) {
        src = src.replace(/(\.\w+)$/, '-light$1');
        img.setAttribute('src', src);
      }
    } else {
      if (src.includes('-light')) {
        src = src.replace('-light', '');
        img.setAttribute('src', src);
      }
    }
  });
}

// Initialisation des icônes au chargement
updateThemeIcon(savedTheme);
updateSocialIcons();

if (toggle) {
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    
    updateThemeIcon(current);
    updateSocialIcons();
  });
}

const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const scrim = document.getElementById('scrim');

function openMenu() {
  if (!siteNav || !scrim) return;
  siteNav.classList.add('open');
  if (window.innerWidth <= 900 && menuToggle) menuToggle.classList.add('open');
  scrim.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!siteNav || !scrim) return;
  siteNav.classList.remove('open');
  if (window.innerWidth <= 900 && menuToggle) menuToggle.classList.remove('open');
  scrim.hidden = true;
  document.body.style.overflow = '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (siteNav && siteNav.classList.contains('open')) closeMenu(); else openMenu();
  });
}

if (scrim) scrim.addEventListener('click', closeMenu);

// Défilement fluide global pour TOUS les liens d'ancres (Menu, boutons Hero, etc.)
document.addEventListener('click', (e) => {
  const anchorLink = e.target.closest('a');
  
  if (anchorLink) {
    const targetId = anchorLink.getAttribute('href');
    
    if (targetId && targetId.startsWith('#') && targetId !== '#') {
      e.preventDefault();
      
      const targetSection = document.querySelector(targetId);
      
      if (typeof closeMenu === 'function') {
        closeMenu();
      }
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
});

// AJOUT ICI : Gestion du clic fluide pour la flèche de remontée (.topArrow)
const topArrow = document.querySelector('.topArrow');
if (topArrow) {
  topArrow.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') closeMenu(); 
});

window.addEventListener('resize', () => { 
  if (window.innerWidth > 900) closeMenu(); 
});

const filters = document.querySelectorAll('.filter');
const grid = document.getElementById('projectGrid');

if (filters && grid) {
  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => {
        x.classList.remove('active');
        x.setAttribute('aria-selected', 'false');
      });
      f.classList.add('active');
      f.setAttribute('aria-selected', 'true');

      const cat = f.dataset.filter;
      grid.querySelectorAll('.card').forEach(card => {
        const show = (cat === 'all') || (card.dataset.cat === cat);
        card.style.display = show ? '' : 'none';
      });
    });
  });
}