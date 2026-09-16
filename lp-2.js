/* LP2 — onglets « Adultes / Enfants & ados » et carrousel d'avis Google. */
(function () {
  'use strict';

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
