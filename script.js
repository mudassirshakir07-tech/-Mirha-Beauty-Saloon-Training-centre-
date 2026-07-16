/* =========================================================
   THE BRIGHT SOULS SCHOOL — Script
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky navbar shrink ---------- */
  const navbar = document.getElementById('navbar');
  const toTopBtn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    toTopBtn.classList.toggle('show', window.scrollY > 500);
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------- Back to top ---------- */
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal via IntersectionObserver ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el, i) => {
    el.style.setProperty('--i', i % 8);
    io.observe(el);
  });

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  /* ---------- Generate twinkling starfield (hero) ---------- */
  const starfield = document.getElementById('starfield');
  if (starfield) {
    const STAR_COUNT = 70;
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.top = Math.random() * 70 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.animationDuration = (Math.random() * 3 + 2) + 's';
      star.style.animationDelay = (Math.random() * 4) + 's';
      starfield.appendChild(star);
    }

    /* ---------- Generate drifting "bright souls" (glowing dots) ---------- */
    const SOUL_COUNT = 14;
    for (let i = 0; i < SOUL_COUNT; i++) {
      const soul = document.createElement('div');
      soul.className = 'soul';
      const size = Math.random() * 5 + 3;
      soul.style.width = size + 'px';
      soul.style.height = size + 'px';
      soul.style.left = Math.random() * 100 + '%';
      soul.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
      soul.style.animationDuration = (Math.random() * 8 + 10) + 's';
      soul.style.animationDelay = (Math.random() * 10) + 's';
      starfield.appendChild(soul);
    }
  }

  /* ---------- Generate floating campus icons loop ---------- */
  const campusVisual = document.getElementById('campusVisual');
  if (campusVisual) {
    const icons = [
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8l9-5 9 5-9 5-9-5z"/><path d="M3 8v6l9 5 9-5V8"/></svg>', // cap
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19.5V6a2 2 0 012-2h11a2 2 0 012 2v14"/><path d="M6 4h11v15H6a2 2 0 010-4h13"/></svg>', // book
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/></svg>', // check star-ish
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l1.8 5.6H20l-4.6 3.4L17 17l-5-3.6L7 17l1.6-6L4 7.6h6.2z"/></svg>' // star
    ];
    const ICON_COUNT = 10;
    for (let i = 0; i < ICON_COUNT; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'float-icon';
      const size = Math.random() * 22 + 16;
      wrap.style.width = size + 'px';
      wrap.style.height = size + 'px';
      wrap.style.left = Math.random() * 92 + '%';
      wrap.style.animationDuration = (Math.random() * 10 + 10) + 's';
      wrap.style.animationDelay = (Math.random() * 12) + 's';
      wrap.style.opacity = (Math.random() * 0.4 + 0.4).toFixed(2);
      wrap.innerHTML = icons[i % icons.length];
      campusVisual.appendChild(wrap);
    }
  }

  /* ---------- Testimonial auto-carousel loop ---------- */
  const slides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.testi-dots button');
  let current = 0;
  let autoTimer;

  function showSlide(idx) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startAuto() {
    autoTimer = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  if (slides.length) {
    showSlide(0);
    startAuto();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        stopAuto();
        startAuto();
      });
    });
    const shell = document.querySelector('.testi-shell');
    shell.addEventListener('mouseenter', stopAuto);
    shell.addEventListener('mouseleave', startAuto);
  }

  /* ---------- Fake contact form submit ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.classList.add('show');
      form.reset();
      setTimeout(() => formNote.classList.remove('show'), 5000);
    });
  }

});
