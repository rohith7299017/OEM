/* ==========================================================================
   ExamPulse — Minimal Landing Page JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll shadow ─────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ── Mobile menu ──────────────────────────────────────────────────────── */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ── Login button toast ───────────────────────────────────────────────── */
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      showToast('Login portal coming soon — stay tuned!');
    });
  }

  /* ── Animated counters on scroll ──────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  function runCounters() {
    counters.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const duration = 1800;
      const step = 25;
      const totalSteps = duration / step;
      const inc = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }

        if (target >= 1_000_000)       el.textContent = (current / 1_000_000).toFixed(1) + 'M+';
        else if (target >= 10_000)     el.textContent = Math.floor(current).toLocaleString() + '+';
        else if (Number.isInteger(target) && target >= 100)
                                       el.textContent = Math.floor(current).toLocaleString() + '+';
        else if (target % 1 !== 0)     el.textContent = current.toFixed(1) + '%';
        else                           el.textContent = Math.floor(current).toLocaleString();
      }, step);
    });
  }

  const statsEl = document.querySelector('.stats');
  if (statsEl) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) { counted = true; runCounters(); }
    }, { threshold: 0.4 }).observe(statsEl);
  }

  /* ── Toast helper ─────────────────────────────────────────────────────── */
  function showToast(msg) {
    const wrap = document.getElementById('toastWrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
      t.style.transition = 'all .25s ease';
      setTimeout(() => t.remove(), 250);
    }, 3000);
  }

});
