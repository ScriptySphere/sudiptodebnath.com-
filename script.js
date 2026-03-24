/* ═══════════════════════════════════════════════════════════
   SUDIPTO DEBNATH — Premium Personal Website
   script.js — Cinematic Animations & Interactions
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Register GSAP Plugins ─────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ─── Helpers ───────────────────────────────────────────────── */
const qs  = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

/* ══════════════════════════════════════════════════════════════
   1. PRELOADER
   ══════════════════════════════════════════════════════════════ */
function initPreloader() {
  const loader = qs('#preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          loader.style.display = 'none';
          initHeroAnimations();
        }
      });
    }, 2000);
  });
}

/* ══════════════════════════════════════════════════════════════
   2. CUSTOM CURSOR
   ══════════════════════════════════════════════════════════════ */
function initCursor() {
  const cursor   = qs('#cursor');
  const follower = qs('#cursorFollower');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects
  const hoverEls = qsa('a, button, [data-tilt], .work-card, .award-card, .contact-link');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor-follower--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor-follower--hover');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   3. MOUSE GLOW
   ══════════════════════════════════════════════════════════════ */
function initMouseGlow() {
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ══════════════════════════════════════════════════════════════
   4. SCROLL PROGRESS
   ══════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = qs('#scrollProgress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = Math.min((scrolled / max) * 100, 100) + '%';
  });
}

/* ══════════════════════════════════════════════════════════════
   5. NAVBAR
   ══════════════════════════════════════════════════════════════ */
function initNav() {
  const nav = qs('#nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // Smooth anchor scrolling
  qsa('.nav-links a, .hero-cta, .scroll-indicator').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = qs(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   6. HERO CANVAS — Particle Field
   ══════════════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = qs('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r  = Math.random() * 1.5 + 0.5;
      this.a  = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,142,255,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Connection lines
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79,142,255,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ══════════════════════════════════════════════════════════════
   7. HERO ANIMATIONS (runs after preloader)
   ══════════════════════════════════════════════════════════════ */
function initHeroAnimations() {
  const tl = gsap.timeline();

  // Badge
  tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.2);

  // Name reveal — clip-path
  tl.to('.name-line', {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    stagger: 0.2,
    ease: 'power4.out'
  }, 0.5);

  // CTA & stats & scroll
  tl.to('.hero-cta',       { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.4);
  tl.to('.hero-stats',     { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.6);
  tl.to('.scroll-indicator',{ opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.8);

  // Typed text starts
  tl.call(initTypedText, [], 1.0);

  // Counter numbers
  tl.call(initCounters, [], 2.0);
}

/* ══════════════════════════════════════════════════════════════
   8. TYPED TEXT
   ══════════════════════════════════════════════════════════════ */
function initTypedText() {
  const el = qs('#typedText');
  if (!el) return;
  const phrases = [
    'Youth Leader',
    'Child Rights Activist',
    'Investigative Journalist',
    'Community Organiser',
    'NASA Hackathon Leader',
    'Peace Prize Nominee'
  ];
  let i = 0, j = 0, isDeleting = false;

  function type() {
    const current = phrases[i];
    if (isDeleting) {
      el.textContent = current.substring(0, j--);
    } else {
      el.textContent = current.substring(0, j++);
    }

    let speed = isDeleting ? 50 : 80;
    if (!isDeleting && j > current.length) {
      speed = 2000; isDeleting = true;
    } else if (isDeleting && j < 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
      speed = 500;
    }
    setTimeout(type, speed);
  }
  type();
}

/* ══════════════════════════════════════════════════════════════
   9. STAT COUNTERS
   ══════════════════════════════════════════════════════════════ */
function initCounters() {
  qsa('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + (target > 10 ? '+' : '+');
      if (count >= target) clearInterval(interval);
    }, 40);
  });
}

/* ══════════════════════════════════════════════════════════════
   10. SCROLL-TRIGGERED REVEALS
   ══════════════════════════════════════════════════════════════ */
function initScrollReveals() {

  // Generic reveal-text elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay * 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  qsa('.reveal-text, .section-label').forEach((el, i) => {
    observer.observe(el);
  });

  // Timeline items
  const timelineObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  qsa('.timeline-item').forEach(el => timelineObs.observe(el));

  // Work cards with stagger
  const workObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = qsa('.work-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 100);
        });
        workObs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  const workSection = qs('#work');
  if (workSection) workObs.observe(workSection);

  // Award cards
  const awardObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        qsa('.award-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 100);
        });
        awardObs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  const recSection = qs('#recognition');
  if (recSection) awardObs.observe(recSection);
}

/* ══════════════════════════════════════════════════════════════
   11. SKILL BARS
   ══════════════════════════════════════════════════════════════ */
function initSkillBars() {
  const skillsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        qsa('.skill-fill').forEach(bar => {
          const w = bar.dataset.width;
          bar.style.width = w + '%';
        });
        skillsObs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = qs('#skills');
  if (skillsSection) skillsObs.observe(skillsSection);
}

/* ══════════════════════════════════════════════════════════════
   12. CARD TILT EFFECT
   ══════════════════════════════════════════════════════════════ */
function initTiltEffect() {
  qsa('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = (y - cy) / cy * 8;
      const ry = (cx - x) / cx * 8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   13. PARALLAX SECTIONS
   ══════════════════════════════════════════════════════════════ */
function initParallax() {
  // Vision bg text parallax
  window.addEventListener('scroll', () => {
    const visionBg = qs('.vision-bg-text');
    const outroBg  = qs('.outro-bg-text');
    if (visionBg) {
      const section = qs('.vision');
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      visionBg.style.transform = `translateY(${progress * 40}px)`;
    }
    if (outroBg) {
      const section = qs('.outro');
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      outroBg.style.transform = `translateY(${progress * 40}px)`;
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   14. THEME TOGGLE
   ══════════════════════════════════════════════════════════════ */
function initThemeToggle() {
  const btn  = qs('#themeToggle');
  const icon = qs('#themeIcon');
  if (!btn) return;

  let isDark = true;
  btn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? '' : 'light');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });
}

/* ══════════════════════════════════════════════════════════════
   15. CONTACT FORM
   ══════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form    = qs('#contactForm');
  const success = qs('#formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.7';

    // Simulate send (replace with real API call)
    setTimeout(() => {
      btn.style.display = 'none';
      success.classList.add('show');
      form.reset();
    }, 1500);
  });
}

/* ══════════════════════════════════════════════════════════════
   16. OUTRO HEADLINE
   ══════════════════════════════════════════════════════════════ */
function initOutro() {
  const headline = qs('.outro-headline');
  if (!headline) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headline.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  obs.observe(headline);
}

/* ══════════════════════════════════════════════════════════════
   17. GSAP SCROLL ANIMATIONS (enhanced)
   ══════════════════════════════════════════════════════════════ */
function initGSAPScrollAnimations() {
  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // About image
  gsap.fromTo('.about-image-frame',
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1, scale: 1, duration: 1.2,
      scrollTrigger: { trigger: '.about', start: 'top 70%', toggleActions: 'play none none none' }
    }
  );

  // Vision quote
  gsap.fromTo('.vision-quote',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1,
      scrollTrigger: { trigger: '.vision', start: 'top 60%', toggleActions: 'play none none none' }
    }
  );

  // Contact form
  gsap.fromTo('.contact-form',
    { opacity: 0, x: 40 },
    {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.contact-form', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );
}

/* ══════════════════════════════════════════════════════════════
   18. HERO PARALLAX ON SCROLL
   ══════════════════════════════════════════════════════════════ */
function initHeroParallax() {
  const heroContent = qs('.hero-content');
  const heroStats   = qs('.hero-stats');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.3}px)`;
    if (heroStats)   heroStats.style.transform   = `translateX(-50%) translateY(${y * 0.15}px)`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   19. SMOOTH FADE-IN for About Badge Cards
   ══════════════════════════════════════════════════════════════ */
function initBadgeCards() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        qsa('.about-badge-card').forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, delay: i * 0.2, ease: 'back.out(1.4)' }
          );
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = qs('#about');
  if (aboutSection) obs.observe(aboutSection);
}

/* ══════════════════════════════════════════════════════════════
   20. HIGHLIGHT GLOW on Timeline Gold Card
   ══════════════════════════════════════════════════════════════ */
function initGoldCardGlow() {
  const goldCard = qs('.gold-card');
  if (!goldCard) return;
  gsap.to(goldCard, {
    boxShadow: '0 0 40px rgba(232,201,106,0.2), 0 0 80px rgba(232,201,106,0.05)',
    repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut'
  });
}

/* ══════════════════════════════════════════════════════════════
   INIT — Run everything
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initMouseGlow();
  initScrollProgress();
  initNav();
  initHeroCanvas();
  initScrollReveals();
  initSkillBars();
  initTiltEffect();
  initParallax();
  initThemeToggle();
  initContactForm();
  initOutro();
  initGSAPScrollAnimations();
  initHeroParallax();
  initBadgeCards();
  initGoldCardGlow();
});
