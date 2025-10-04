// ======================= Année automatique =======================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ======================= Thème clair/sombre persistant =======================
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

// Lire le thème sauvegardé dans localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else {
  root.setAttribute('data-theme', 'dark');
}

// Mettre à jour les icônes sociales selon le thème
function updateSocialIcons() {
  const icons = document.querySelectorAll('.socials img');
  const isDark = root.getAttribute('data-theme') === 'dark';

  icons.forEach(img => {
    let src = img.getAttribute('src');
    if (!src) return;

    if (!isDark) {
      if (!src.includes(' light')) {
        src = src.replace(/(\.\w+)$/, ' light$1');
        img.setAttribute('src', src);
      }
    } else {
      if (src.includes(' light')) {
        src = src.replace(' light', '');
        img.setAttribute('src', src);
      }
    }
  });
}

// Changer le thème au clic
if (toggle) {
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateSocialIcons();
  });
}

updateSocialIcons();

// ======================= Menu responsive + animation burger =======================
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const scrim = document.getElementById('scrim');

function openMenu() {
  if (!siteNav || !scrim) return;
  siteNav.classList.add('open');
  if (window.innerWidth <= 900) menuToggle.classList.add('open'); // animation burger seulement en mobile
  scrim.hidden = false;
  document.body.style.overflow = 'hidden';
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Fermer le menu');
}

function closeMenu() {
  if (!siteNav || !scrim) return;
  siteNav.classList.remove('open');
  if (window.innerWidth <= 900) menuToggle.classList.remove('open'); // reset burger seulement en mobile
  scrim.hidden = true;
  document.body.style.overflow = '';
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) closeMenu(); else openMenu();
  });
}

if (scrim) {
  scrim.addEventListener('click', closeMenu);
}

if (siteNav) {
  siteNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });
}

// Fermer menu avec Escape
window.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') closeMenu(); 
});

// Fermer/reset menu si on repasse en desktop
window.addEventListener('resize', () => { 
  if (window.innerWidth > 900) closeMenu(); 
});

// ======================= Filtres projets =======================
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

// ======================= Animation reveal =======================
document.addEventListener("DOMContentLoaded", () => {
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
