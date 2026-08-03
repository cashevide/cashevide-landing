/* =========================================================
   CASHEVIDE — LANDING PAGE SCRIPT
   Mobile nav toggle + close-on-link-click + close-on-outside-click
   ========================================================= */

(function () {
  'use strict';

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (!navToggle || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function isMenuOpen() {
    return navLinks.classList.contains('is-open');
  }

  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    isMenuOpen() ? closeMenu() : openMenu();
  });

  // Close menu after a nav link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside it
  document.addEventListener('click', function (e) {
    if (isMenuOpen() && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen()) {
      closeMenu();
    }
  });

  // Close menu automatically if viewport is resized back to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720 && isMenuOpen()) {
      closeMenu();
    }
  });
})();