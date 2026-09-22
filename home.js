/* Accueil — menu mobile, onglets « Adultes / Enfants & ados » et carrousel d'avis Google. */
(function () {
  'use strict';

  /* ── Menu mobile ─────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    var desktop = window.matchMedia('(min-width: 1021px)');
    var scrollY = 0;

    var setNav = function (open) {
      if (open === document.body.classList.contains('nav-open')) return;
      if (open) scrollY = window.scrollY;
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      /* overflow:hidden seul ne bloque pas iOS : on fige le body à sa position */
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

    toggle.addEventListener('click', function () {
      setNav(!document.body.classList.contains('nav-open'));
    });
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        setNav(false);
        toggle.focus();
      }
    });
    /* repasser en desktop menu ouvert laisserait le body figé */
    desktop.addEventListener('change', function (e) { if (e.matches) setNav(false); });
  }

  /* ── État scrollé de la pilule ───────────────────────────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Onglets des formules ───────────────────────────────────── */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab[role="tab"]'));

  function select(tab) {
    tabs.forEach(function (t) {
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (panel) panel.hidden = !on;
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      var next = tabs[(i + dir + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });

  /* Un lien #panel-enfants (ou #tab-enfants) ouvre directement le bon onglet. */
  function openFromHash() {
    var id = (location.hash || '').slice(1);
    if (!id) return;
    var tab = tabs.filter(function (t) {
      return t.id === id || t.getAttribute('aria-controls') === id;
    })[0];
    if (tab) select(tab);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  /* ── Avis Google : duplication de la piste pour un défilement continu ── */
  var track = document.querySelector('.reviews-track');
  if (track && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.prototype.slice.call(track.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
})();
