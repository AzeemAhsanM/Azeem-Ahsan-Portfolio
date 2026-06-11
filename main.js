/* ══════════════════════════════════════════
   NAV — add scrolled class
══════════════════════════════════════════ */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
const phrases = [
  'Software Developer.',
  'Backend Engineer.',
  'Full-Stack Builder.',
  'Python Developer.',
  'API & LLM Integrator.',
];
let pIdx = 0, cIdx = 0, deleting = false;
const twEl = document.getElementById('tw-text');

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    twEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    twEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 65);
}
setTimeout(type, 1200);

/* ══════════════════════════════════════════
   SCROLL REVEAL  (IntersectionObserver)
══════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ══════════════════════════════════════════
   PROJECT SCROLL-ZOOM
   — mimics Anthropic's "rectangle → fullscreen → rectangle" card
   — works on two project showcases; uses a sticky container
══════════════════════════════════════════ */
function initProjectScroll() {
  const sections = document.querySelectorAll('.project-scroll-section');
  const dots     = document.querySelectorAll('.project-dot');

  if (!sections.length) return;

  function lerp(a, b, t) { return a + (b - a) * t; }

  // easing: ease-in-out cubic
  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function onScroll() {
    sections.forEach((section, si) => {
      const showcase = section.querySelector('.project-showcase');
      if (!showcase) return;

      const rect      = section.getBoundingClientRect();
      const sHeight   = section.offsetHeight;
      const vHeight   = window.innerHeight;

      // scrollProgress: 0 at section top entering viewport → 1 at section bottom leaving
      const scrolled  = -rect.top; // how many px we've scrolled past the section top
      const total     = sHeight - vHeight; // total scrollable distance
      const progress  = Math.max(0, Math.min(1, scrolled / total));

      // 3 phases:
      // 0.0 – 0.3  → grow from rect to fullscreen
      // 0.3 – 0.5  → hold fullscreen
      // 0.5 – 1.0  → shrink back to rect
      let scale, radius;

      if (progress < 0.3) {
        const t = ease(progress / 0.3);
        scale  = lerp(0.72, 1.1, t);   /* Changed 1 to 1.1 -> Card grows larger quicker */
        radius = lerp(20, 0, t);
      } else if (progress < 0.4) {
        scale  = 1.1;                  /* Changed 1 to 1.1 -> Holds a larger frame footprint */
        radius = 0;
      } else {
        const t = ease((progress - 0.4) / 0.4);
        scale  = lerp(1.1, 0.72, t);   /* Changed 1 to 1.1 -> Smoothly scales back down to normal */
        radius = lerp(0, 20, t);
      }

      showcase.style.transform    = `scale(${scale})`;
      showcase.style.borderRadius = `${radius}px`;

      // update dots
      if (dots.length) {
        dots.forEach((d, di) => d.classList.toggle('active', di === si && progress > 0.05 && progress < 0.95));
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// run after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectScroll);
} else {
  initProjectScroll();
}
// 1. Your dedicated data array
const skills = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    { name: 'FastAPI', icon: 'https://fastapi.tiangolo.com/img/favicon.png' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'JSON', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg' },
    { name: 'OAuth', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Oauth_logo.svg' }, // Official OAuth 3-lock loop logo
    { name: 'JWT', icon: 'https://www.svgrepo.com/show/306280/jsonwebtokens.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'PyCharm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg' },
    
];
// 2. Select the grid element from the HTML DOM
const skillsGrid = document.getElementById('skills-grid');

// 3. Loop through data and dynamically create DOM nodes
skills.forEach(skill => {
    // Create the outer card wrapper wrapper
    const card = document.createElement('div');
    card.classList.add('skill-card');
    
    // Conditional rendering matching your React logic
    if (skill.icon) {
        card.innerHTML = `
            <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
            <p class="skill-name">${skill.name}</p>
        `;
    } else {
        card.innerHTML = `
            <div class="text-only-skill">${skill.name}</div>
        `;
    }
    
    // Append the newly configured card into the grid container
    skillsGrid.appendChild(card);
});

// Select the glow element from the DOM
const glow = document.getElementById('mouse-glow');

// Track the mouse coordinates globally
window.addEventListener('mousemove', (e) => {
  // Pass the raw pixel positions directly into CSS custom variables
  glow.style.setProperty('--mouse-x', `${e.clientX}px`);
  glow.style.setProperty('--mouse-y', `${e.clientY}px`);
}, { passive: true }); // passive true keeps the scroll performance incredibly fast
