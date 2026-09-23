// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
}

function toggleNav() {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', toggleNav);
  navLinks.querySelectorAll('[data-nav-link]').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeNav();
  });
}

// Six-step journey: click to reveal detail (animated via CSS grid-rows, see .step-detail)
const flowContainer = document.querySelector('.flow-container');
const flowSteps = document.querySelectorAll('.flow-step');
let flowProgress = 0;

function updateFlowProgress(stepNum) {
  if (stepNum > flowProgress) {
    flowProgress = stepNum;
    if (flowContainer) {
      flowContainer.style.setProperty('--flow-progress', String(flowProgress / flowSteps.length));
    }
  }
}

// `hidden` only guards the no-JS state; once JS runs, CSS grid-rows on
// .step-detail (see styles.css) handles the collapsed/expanded look.
flowSteps.forEach(function (step) {
  const detail = step.querySelector('.step-detail');
  if (detail) detail.hidden = false;

  step.addEventListener('click', function () {
    const isActive = step.classList.contains('active');

    document.querySelectorAll('.flow-step.active').forEach(function (other) {
      if (other !== step) other.classList.remove('active');
    });

    step.classList.toggle('active', !isActive);
    if (!isActive) updateFlowProgress(Number(step.dataset.step));
  });
});

// Demo Modal Functions
function openDemo() {
  document.getElementById('demoModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
  resetDemo();
}

function closeDemo() {
  document.getElementById('demoModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function resetDemo() {
  const form = document.getElementById('demoForm');
  const success = document.getElementById('demoSuccess');
  const formError = document.getElementById('formError');
  const phoneError = document.getElementById('phoneError');
  const submitBtn = document.getElementById('demoSubmitBtn');

  form.hidden = false;
  success.hidden = true;
  success.classList.remove('checkmark-draw');
  formError.hidden = true;
  phoneError.textContent = '';
  document.getElementById('phone').classList.remove('invalid');
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send Demo Request';
}

function contactTeam() {
  window.location.href = 'mailto:chetan@doctorbrainai.com?subject=ESIC%20Health%20Bridge%20Inquiry';
}

// Phone field: validate 10-digit Indian mobile number on blur
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('blur', function () {
    const value = phoneInput.value.trim();
    const valid = value === '' || /^[6-9]\d{9}$/.test(value);
    const error = document.getElementById('phoneError');
    phoneInput.classList.toggle('invalid', !valid);
    error.textContent = valid ? '' : 'Enter a valid 10-digit mobile number';
  });
}

// Handle form submission with loading/success/error states
function handleSubmit(event) {
  event.preventDefault();

  const phone = document.getElementById('phone').value.trim();
  const formError = document.getElementById('formError');
  const submitBtn = document.getElementById('demoSubmitBtn');

  if (!/^[6-9]\d{9}$/.test(phone)) {
    document.getElementById('phone').classList.add('invalid');
    document.getElementById('phoneError').textContent = 'Enter a valid 10-digit mobile number';
    formError.hidden = false;
    formError.textContent = 'Please fix the highlighted field before submitting.';
    return;
  }

  formError.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const formData = {
    company: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: phone,
    employees: document.getElementById('employees').value
  };

  // Simulated network round-trip (no backend wired up yet)
  setTimeout(function () {
    console.log('Demo Request Submitted:', formData);
    document.getElementById('demoForm').hidden = true;
    const success = document.getElementById('demoSuccess');
    success.hidden = false;
    success.classList.add('checkmark-draw');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Demo Request';
  }, 900);
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
  const modal = document.getElementById('demoModal');
  if (event.target === modal) {
    closeDemo();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeDemo();
  }
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // Journey connecting line fills cumulatively as steps scroll into view too.
      if (entry.target.classList.contains('flow-step')) {
        updateFlowProgress(Number(entry.target.dataset.step));
      }
    }
  });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.service-card, .flow-step, .benefit-item, .trust-card');
  cards.forEach(function (card) {
    observer.observe(card);
  });
});

// Stat count-up (separate observer: needs a JS rAF loop, not just a class toggle)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCountUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target)) return;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (prefersReducedMotion) {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    } else {
      animateCountUp(el);
    }
    countObserver.unobserve(el);
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-count]').forEach(function (el) {
    countObserver.observe(el);
  });
});

// Language chip micro-swap (hero product preview): cycle EN / हिं, crossfading one at a time
const langChip = document.querySelector('.pp-lang-chip');
if (langChip && !prefersReducedMotion) {
  const langs = ['EN', 'हिं'];
  let langIndex = 0;
  langChip.textContent = langs[langIndex];

  setInterval(function () {
    langChip.classList.add('pp-lang-fade');
    setTimeout(function () {
      langIndex = (langIndex + 1) % langs.length;
      langChip.textContent = langs[langIndex];
      langChip.classList.remove('pp-lang-fade');
    }, 300);
  }, 2500);
}
