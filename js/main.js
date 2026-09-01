/* =========================================================================
   ESTUDANZA — Gran Gala Classique
   Aparición progresiva de los bloques al hacer scroll.
   ========================================================================= */

(function () {
	"use strict";

	var targets = document.querySelectorAll("[data-reveal]");
	if (!targets.length) return;

	var reduced =
		window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Sin IntersectionObserver (o con movimiento reducido) no ocultamos nada:
	// el contenido informativo siempre debe quedar visible.
	if (reduced || !("IntersectionObserver" in window)) return;

	// El <head> ya añadió .js-reveal antes del primer pintado. Avisamos de que
	// el arranque fue correcto para que no salte el failsafe.
	window.__revealReady = true;

	var observer = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
	);

	targets.forEach(function (el) {
		observer.observe(el);
	});
})();
