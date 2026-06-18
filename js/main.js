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

if (toggle) {
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateSocialIcons();
  });
}

updateSocialIcons();

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

if (siteNav) {
  siteNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
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