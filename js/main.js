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
  const isDark = root.getAttribute('data-theme') === 'dark';

  const socialIcons = document.querySelectorAll('.socials img');
  socialIcons.forEach(img => {
    let src = img.getAttribute('src');
    if (!src) return;
    if (!isDark) {
      if (!src.includes('-light')) src = src.replace(/(\.\w+)$/, '-light$1');
    } else {
      if (src.includes('-light')) src = src.replace('-light', '');
    }
    img.setAttribute('src', src);
  });

  const gameIcons = document.querySelectorAll('.dynamic-icon');
  gameIcons.forEach(img => {
    let src = img.getAttribute('src');
    if (!src) return;
    if (!isDark) {
      if (!src.includes('-dark')) src = src.replace(/(\.\w+)$/, '-dark$1');
    } else {
      if (src.includes('-dark')) src = src.replace('-dark', '');
    }
    img.setAttribute('src', src);
  });
}

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
  let noProjectMsg = document.getElementById('no-project-message');
  if (!noProjectMsg) {
    noProjectMsg = document.createElement('p');
    noProjectMsg.id = 'no-project-message';
    noProjectMsg.style.textAlign = 'center';
    noProjectMsg.style.width = '100%';
    noProjectMsg.style.padding = '40px 0';
    noProjectMsg.style.fontSize = '1.2rem';
    noProjectMsg.style.fontWeight = '700';
    noProjectMsg.style.textTransform = 'uppercase';
    noProjectMsg.style.fontFamily = '"Space Grotesk", sans-serif';
    noProjectMsg.style.color = 'var(--muted)';
    noProjectMsg.style.display = 'none';
    grid.parentNode.insertBefore(noProjectMsg, grid);
  }

  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => {
        x.classList.remove('active');
        x.setAttribute('aria-selected', 'false');
      });
      f.classList.add('active');
      f.setAttribute('aria-selected', 'true');

      const cat = f.dataset.filter;
      let visibleCount = 0;

      grid.querySelectorAll('.card').forEach(card => {
        const show = (cat === 'all') || (card.dataset.cat === cat);
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      if (cat !== 'all' && visibleCount === 0) {
        const categoryName = f.textContent.trim();
        noProjectMsg.textContent = `Aucun projet dans la catégorie "${categoryName}" pour le moment !`;
        noProjectMsg.style.display = 'block';
      } else {
        noProjectMsg.style.display = 'none';
      }
    });
  });
}