/* Popup Calendly : les CTA ouvrent l'agenda par-dessus la page, sans quitter le site.
   Les liens gardent leur href + target="_blank" : si le widget Calendly ne charge pas
   (réseau, bloqueur de scripts), le clic retombe sur l'ouverture en nouvel onglet. */
(function () {
  var SELECTOR = 'a[href*="calendly.com/"]';
  if (!document.querySelector(SELECTOR)) return;

  var CSS = 'https://assets.calendly.com/assets/external/widget.css';
  var JS = 'https://assets.calendly.com/assets/external/widget.js';

  if (!document.querySelector('link[href="' + CSS + '"]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = CSS;
    document.head.appendChild(css);
  }
  if (!document.querySelector('script[src="' + JS + '"]')) {
    var js = document.createElement('script');
    js.src = JS;
    js.async = true;
    document.head.appendChild(js);
  }

  document.addEventListener('click', function (event) {
    // clic milieu / ctrl / cmd : on laisse l'utilisateur ouvrir dans un onglet
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest(SELECTOR);
    if (!link || !window.Calendly) return;

    event.preventDefault();
    window.Calendly.initPopupWidget({ url: link.href });
  });
})();
