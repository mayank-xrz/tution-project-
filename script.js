/* ============================================================
   Catalyst Tuitions — prototype interactions
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Footer year --- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Mobile nav toggle --- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close after tapping any link/CTA inside the menu
    nav.querySelectorAll(".nav__menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Hero staggered entrance (on load) --- */
  var heroItems = document.querySelectorAll(".hero .anim");
  if (reduceMotion) {
    heroItems.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    window.requestAnimationFrame(function () {
      heroItems.forEach(function (el, i) {
        setTimeout(function () { el.classList.add("is-in"); }, 120 * i);
      });
    });
  }

  /* --- Single fade-in-on-scroll per section element --- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --- Enquiry form: front-end only confirmation --- */
  var form = document.getElementById("enquiry-form");
  var confirm = document.getElementById("form-confirm");
  if (form && confirm) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      confirm.hidden = false;
      confirm.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  }
})();
