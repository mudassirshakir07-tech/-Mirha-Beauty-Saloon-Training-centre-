document.addEventListener('DOMContentLoaded', () => {

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- INTRO SEQUENCE ---------- */
  const intro = document.getElementById('intro');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const openCurtains = () => {
    intro.classList.add('curtains-open');
    setTimeout(() => {
      intro.classList.add('hide');
      document.body.style.overflow = 'auto';
      setTimeout(() => intro.remove(), 700);
    }, 1000);
  };

  document.body.style.overflow = 'hidden';

  if (reduceMotion) {
    // Skip the long sequence, just fade out quickly
    setTimeout(openCurtains, 300);
  } else {
    // total intro animation runs ~3.1s before curtains open
    setTimeout(openCurtains, 3100);
  }

  /* ---------- PETALS ---------- */
  const petalContainer = document.getElementById('petals');
  const PETAL_COUNT = 22;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 6 + Math.random() * 10;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
    p.style.animationDuration = `${9 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 12}s`;
    petalContainer.appendChild(p);
  }

  /* ---------- NAV SCROLL STATE ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.fx-rise');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
});
