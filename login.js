/* ==========================================================================
   ExamPulse — Login Page JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Role tab switching ─────────────────────────────────────────────── */
  const roleTabs = document.querySelectorAll('.role-tab');
  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ── Password visibility toggle ─────────────────────────────────────── */
  const togglePw = document.getElementById('togglePw');
  const passwordInput = document.getElementById('password');

  if (togglePw && passwordInput) {
    togglePw.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePw.querySelector('i').className = isPassword
        ? 'fa-solid fa-eye-slash'
        : 'fa-solid fa-eye';
    });
  }

  /* ── Form validation & submission ───────────────────────────────────── */
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const loginSubmit = document.getElementById('loginSubmit');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    emailError.textContent = '';
    passwordError.textContent = '';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let valid = true;
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email) {
        emailInput.classList.add('error');
        emailError.textContent = 'Email is required.';
        valid = false;
      } else if (!validateEmail(email)) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }

      if (!password) {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Password is required.';
        valid = false;
      } else if (password.length < 6) {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
      }

      if (!valid) return;

      // Simulate login — show loading state
      const btnText = loginSubmit.querySelector('.btn-text');
      const btnLoader = loginSubmit.querySelector('.btn-loader');
      btnText.classList.add('hide');
      btnLoader.classList.remove('hide');
      loginSubmit.disabled = true;

      // Get selected role
      const activeRole = document.querySelector('.role-tab.active');
      const role = activeRole ? activeRole.dataset.role : 'student';

      setTimeout(() => {
        btnText.classList.remove('hide');
        btnLoader.classList.add('hide');
        loginSubmit.disabled = false;

        showToast(`Logged in as ${role} — ${email}`);
        loginForm.reset();
      }, 1500);
    });
  }

  // Clear field errors on input
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('error');
      emailError.textContent = '';
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      passwordInput.classList.remove('error');
      passwordError.textContent = '';
    });
  }

  /* ── Toast helper ───────────────────────────────────────────────────── */
  function showToast(msg) {
    const wrap = document.getElementById('toastWrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--mint-d)"></i> <span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
      t.style.transition = 'all .25s ease';
      setTimeout(() => t.remove(), 250);
    }, 3500);
  }

});
