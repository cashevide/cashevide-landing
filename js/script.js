/* =========================================================
   CASHEVIDE : LANDING PAGE SCRIPT
   Mobile nav toggle + close-on-link-click + close-on-outside-click
   ========================================================= */

(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    var openMenu = function () {
      navLinks.classList.add("is-open");
      navToggle.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    var closeMenu = function () {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    var isMenuOpen = function () {
      return navLinks.classList.contains("is-open");
    };

    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      isMenuOpen() ? closeMenu() : openMenu();
    });

    // Close menu after a nav link is clicked (mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside it
    document.addEventListener("click", function (e) {
      if (
        isMenuOpen() &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isMenuOpen()) {
        closeMenu();
      }
    });

    // Close menu automatically if viewport is resized back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720 && isMenuOpen()) {
        closeMenu();
      }
    });
  }

  /* =========================================================
     WEB APP CTA
     Web-only product, so every CTA points straight to the
     web app. Update the URL below if the real app link
     changes.
     ========================================================= */

  var WEB_APP_URL = "https://app.cashevide.com"; // TODO: confirm real web app link

  var smartBtn = document.getElementById("smartDownloadBtn");
  var navSmartBtn = document.getElementById("navSmartBtn");
  var heroSmartBtn = document.getElementById("heroSmartBtn");

  [smartBtn, navSmartBtn, heroSmartBtn].forEach(function (btn) {
    if (btn) btn.href = WEB_APP_URL;
  });

  /* =========================================================
     SCROLL-REVEAL ANIMATIONS
     Fades and slides sections into view as the user scrolls,
     using IntersectionObserver (no external libraries).
     ========================================================= */

  var revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* =========================================================
     NAV SCROLLED STATE
     Adds a class to the nav once the page has scrolled past
     a small threshold, for a subtle background/shadow shift.
     ========================================================= */

  var navEl = document.querySelector(".nav");

  if (navEl) {
    var scrollThreshold = 8;

    function updateNavScrolledState() {
      if (window.scrollY > scrollThreshold) {
        navEl.classList.add("is-scrolled");
      } else {
        navEl.classList.remove("is-scrolled");
      }
    }

    updateNavScrolledState();
    window.addEventListener("scroll", updateNavScrolledState, {
      passive: true,
    });
  }

  /* =========================================================
     CUSTOM CURSOR
     A small ring that follows the mouse and expands over
     interactive elements. Only runs on fine-pointer (mouse)
     devices; touch devices get the normal cursor via CSS.
     ========================================================= */

  var cursorRing = document.getElementById("cursorRing");
  var hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  if (cursorRing && hasFinePointer) {
    var cursorX = 0;
    var cursorY = 0;
    var hasMoved = false;

    document.addEventListener("mousemove", function (e) {
      cursorX = e.clientX;
      cursorY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        cursorRing.classList.add("is-active");
      }

      cursorRing.style.left = cursorX + "px";
      cursorRing.style.top = cursorY + "px";
    });

    document.addEventListener("mouseleave", function () {
      cursorRing.classList.remove("is-active");
    });

    document.addEventListener("mouseenter", function () {
      if (hasMoved) cursorRing.classList.add("is-active");
    });

    var interactiveSelector = 'a, button, [role="button"]';

    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(interactiveSelector)) {
        cursorRing.classList.add("is-hovering");
      }
    });

    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(interactiveSelector)) {
        cursorRing.classList.remove("is-hovering");
      }
    });
  }
})();