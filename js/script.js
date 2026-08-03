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

  /* =========================================================
     SMART DOWNLOAD REDIRECT
     Detects OS and points the primary CTA + override links
     to the right destination. Update the URLs below once
     the real store/app links are available.
     ========================================================= */

  var DOWNLOAD_LINKS = {
    ios: 'https://apps.apple.com/app/cashevide', // TODO: replace with real App Store link
    android: 'https://play.google.com/store/apps/details?id=com.cashevide', // TODO: replace with real Play Store link
    web: 'https://app.cashevide.com' // TODO: replace with real web app link
  };

  function detectPlatform() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      return 'ios';
    }
    if (/android/i.test(ua)) {
      return 'android';
    }
    return 'web';
  }

  var smartBtn = document.getElementById('smartDownloadBtn');
  var navSmartBtn = document.getElementById('navSmartBtn');
  var heroSmartBtn = document.getElementById('heroSmartBtn');
  var iosLink = document.getElementById('iosLink');
  var androidLink = document.getElementById('androidLink');
  var webLink = document.getElementById('webLink');

  var platform = detectPlatform();
  var targetUrl = DOWNLOAD_LINKS[platform];

  [smartBtn, navSmartBtn, heroSmartBtn].forEach(function (btn) {
    if (btn) btn.href = targetUrl;
  });

  if (iosLink) iosLink.href = DOWNLOAD_LINKS.ios;
  if (androidLink) androidLink.href = DOWNLOAD_LINKS.android;
  if (webLink) webLink.href = DOWNLOAD_LINKS.web;
})();