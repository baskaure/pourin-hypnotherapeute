document.documentElement.classList.add('js');

// Navigation mobile
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.site-nav a').forEach(a =>
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// État scrollé du header pilule
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Révélation au scroll, en cascade au sein d'un même parent
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

const groups = new Map();
document.querySelectorAll('.reveal').forEach(el => {
  const parent = el.parentElement;
  const i = groups.get(parent) || 0;
  groups.set(parent, i + 1);
  el.style.setProperty('--reveal-delay', (Math.min(i, 5) * 0.09) + 's');
  io.observe(el);
});

// Parallaxe légère du fond de héro
const heroBg = document.querySelector('.hero-bg');
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroBg && motionOK) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 900);
      heroBg.style.transform = 'scale(1.06) translateY(' + y * 0.08 + 'px)';
      ticking = false;
    });
  }, { passive: true });
}

// Vidéos YouTube : façade légère, l'iframe n'est chargée qu'au clic
document.querySelectorAll('.video-embed[data-yt]').forEach(box => {
  const btn = box.querySelector('.video-poster');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + box.dataset.yt + '?autoplay=1&rel=0';
    iframe.title = btn.getAttribute('aria-label') || 'Vidéo YouTube';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
  });
});
