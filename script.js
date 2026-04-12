/* ============================================================
   DITA PORTFOLIO — script.js
   Handles: dark mode, sticky nav, mobile menu, scroll animations
   ============================================================ */

"use strict";

/* ── 1. DOM REFERENCES ──────────────────────────────────────── */
const body         = document.body;
const navbar       = document.getElementById("navbar");
const themeToggle  = document.getElementById("theme-toggle");
const hamburger    = document.getElementById("hamburger");
const mobileMenu   = document.getElementById("mobile-menu");
const mobLinks     = document.querySelectorAll(".mob-link");

/* ── 2. DARK MODE ───────────────────────────────────────────── */

/**
 * Apply the given theme ('light' | 'dark') to <body>
 * and persist the choice to localStorage.
 */
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
  }
  localStorage.setItem("portfolio-theme", theme);
}

// Restore saved preference (or respect OS preference)
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

// Toggle on button click
themeToggle.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  applyTheme(isDark ? "light" : "dark");
});

/* ── 3. STICKY NAV – add shadow when scrolled ───────────────── */
function handleNavScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

/* ── 4. MOBILE MENU TOGGLE ──────────────────────────────────── */
function openMenu() {
  hamburger.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
}

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.contains("open");
  isOpen ? closeMenu() : openMenu();
});

// Close when a mobile nav link is clicked
mobLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close menu if window is resized above breakpoint
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMenu();
});

/* ── 5. SCROLL ANIMATIONS (Intersection Observer) ───────────── */

/**
 * Elements with .fade-up class animate in when they enter
 * the viewport.  Staggered children use CSS --i variable.
 */
const fadeEls = document.querySelectorAll(".fade-up");

if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

/* ── 6. AUTO-ADD fade-up TO SECTION CHILDREN ───────────────── */

/**
 * Rather than sprinkling fade-up on every element in HTML,
 * we attach the class here to key block elements within sections.
 */
(function attachFadeAnimations() {
  const selectors = [
    "#about .about-bio > *",
    "#about .about-skills > *",
    "#portfolio .project-card",
    "#experience .timeline-item",
    "#contact .contact-inner > *",
  ];

  selectors.forEach((sel) => {
    const els = document.querySelectorAll(sel);
    els.forEach((el, i) => {
      el.classList.add("fade-up");
      // CSS stagger via custom property
      el.style.setProperty("--i", i);
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // Re-observe newly classed elements
  const newFades = document.querySelectorAll(".fade-up:not(.visible)");
  if (window.IntersectionObserver && newFades.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    newFades.forEach((el) => obs.observe(el));
  }
})();

/* ── 7. ACTIVE NAV LINK HIGHLIGHT on scroll ─────────────────── */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function highlightNav() {
  const scrollPos = window.scrollY + 80;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navAnchors.forEach((a) => {
        a.style.color = "";
        if (a.getAttribute("href") === `#${sec.id}`) {
          a.style.color = "var(--text)";
        }
      });
    }
  });
}
window.addEventListener("scroll", highlightNav, { passive: true });
