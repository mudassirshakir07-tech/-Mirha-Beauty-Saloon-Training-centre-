/**
 * Mirha Beauty Saloon & Training Centre
 * Cinematic intro + scroll animations
 */

(function () {
  'use strict';

  const INTRO_DURATION = 4800;
  const intro = document.getElementById('intro');
  const mainSite = document.getElementById('mainSite');
  const introProgress = document.getElementById('introProgress');
  const makeupBrush = document.getElementById('makeupBrush');
  const blushOverlay = document.getElementById('blushOverlay');
  const blushParticles = document.getElementById('blushParticles');
  const introText = document.querySelector('.intro-text');

  function runIntro() {
    document.body.style.overflow = 'hidden';

    const blushLeft = blushOverlay.querySelector('.blush-left');
    const blushRight = blushOverlay.querySelector('.blush-right');

    setTimeout(() => {
      makeupBrush.classList.add('animate');
      blushLeft.classList.add('animate');
      spawnParticles(blushLeft, 12, { top: '52%', left: '18%' });
    }, 600);

    setTimeout(() => {
      blushRight.classList.add('animate');
      spawnParticles(blushRight, 8, { top: '50%', right: '22%' });
    }, 2400);

    setTimeout(() => {
      introText.classList.add('show');
    }, 3200);

    let start = null;
    function updateProgress(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / INTRO_DURATION) * 100, 100);
      introProgress.style.width = pct + '%';

      if (elapsed < INTRO_DURATION) {
        requestAnimationFrame(updateProgress);
      } else {
        endIntro();
      }
    }
    requestAnimationFrame(updateProgress);
  }

  function spawnParticles(target, count, position) {
    const container = blushParticles;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 30;
        if (position.left) {
          p.style.left = `calc(${position.left} + ${offsetX}px)`;
        } else {
          p.style.right = `calc(${position.right} + ${offsetX}px)`;
        }
        p.style.top = `calc(${position.top} + ${offsetY}px)`;
        p.style.animationDelay = (Math.random() * 0.3) + 's';
        p.style.width = (2 + Math.random() * 4) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
        setTimeout(() => p.remove(), 1500);
      }, i * 80);
    }
  }

  function endIntro() {
    intro.classList.add('fade-out');
    mainSite.classList.remove('hidden');
    mainSite.classList.add('visible');

    setTimeout(() => {
      intro.style.display = 'none';
      document.body.style.overflow = '';
      initMainSite();
    }, 1200);
  }

  function initMainSite() {
    initNavbar();
    initScrollReveal();
    initCounters();
    initPetals();
    initContactForm();
    initParallax();
  }

  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  }

  function initCounters() {
    const stats = document.querySelectorAll('.stat strong[data-count]');
    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            stats.forEach(stat => animateCounter(stat));
          }
        });
      },
      { threshold: 0.5 }
    );
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + '+';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initPetals() {
    const container = document.getElementById('petalsContainer');
    for (let i = 0; i < 18; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (12 + Math.random() * 18) + 's';
      petal.style.animationDelay = (Math.random() * 15) + 's';
      petal.style.width = (8 + Math.random() * 8) + 'px';
      petal.style.height = petal.style.width;
      petal.style.opacity = 0.08 + Math.random() * 0.12;
      container.appendChild(petal);
    }
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;
      const text = `Hello Mirha Beauty!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message || 'N/A')}`;
      window.open(`https://wa.me/923254016157?text=${text}`, '_blank');
      form.reset();
    });
  }

  function initParallax() {
    const heroFrame = document.querySelector('.hero-frame');
    const orbs = document.querySelectorAll('.hero-orb');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (heroFrame && scrollY < window.innerHeight) {
        heroFrame.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
      orbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${scrollY * (0.03 + i * 0.02)}px)`;
      });
    }, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntro);
  } else {
    runIntro();
  }
})();
