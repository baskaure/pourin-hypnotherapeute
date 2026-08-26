document.documentElement.classList.add('js');

// Navigation mobile
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  const desktop = window.matchMedia('(min-width: 1021px)');
  let scrollY = 0;

  const setNav = open => {
    if (open === document.body.classList.contains('nav-open')) return;
    if (open) scrollY = window.scrollY;
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    // overflow:hidden seul ne bloque pas iOS ; on fige le body à sa position
    if (open) {
      document.body.style.position = 'fixed';
      document.body.style.top = -scrollY + 'px';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }
  };

  toggle.addEventListener('click', () =>
    setNav(!document.body.classList.contains('nav-open'))
  );

  document.querySelectorAll('.site-nav a').forEach(a =>
    a.addEventListener('click', () => setNav(false))
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setNav(false);
      toggle.focus();
    }
  });

  // repasser en desktop pendant que le menu est ouvert le laisserait
  // ouvert et le body figé
  desktop.addEventListener('change', e => { if (e.matches) setNav(false); });
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

// Iframes (YouTube, carte) chargées seulement à l'approche du viewport
const ioFrames = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.src = e.target.dataset.src;
      ioFrames.unobserve(e.target);
    }
  });
}, { rootMargin: '600px 0px' });
document.querySelectorAll('iframe[data-src]').forEach(f => ioFrames.observe(f));
