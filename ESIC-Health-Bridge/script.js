if (window.lucide) lucide.createIcons();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile nav
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
const setNav = (open) => {
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', open);
  navLinks.classList.toggle('open', open);
};
navToggle.addEventListener('click', () => setNav(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));
document.addEventListener('click', (e) => { if (!nav.contains(e.target)) setNav(false); });

// Hero language chip
const chip = document.getElementById('languageChip');
const flipLanguage = () => { chip.textContent = chip.textContent === 'EN' ? 'हिं' : 'EN'; };
chip.addEventListener('click', flipLanguage);
if (!reducedMotion) setInterval(flipLanguage, 2500);

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
  { threshold: 0.12 },
);
document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el));

// Count-up numbers
const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    const target = Number(node.dataset.count);
    const suffix = node.dataset.suffix || '';
    observer.unobserve(node);
    if (reducedMotion) { node.textContent = target + suffix; return; }
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.35 });
document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

// Six-step flow
const flowContainer = document.querySelector('.flow-container');
const flowSteps = document.querySelectorAll('.flow-step');
let flowProgress = 0;
const advanceFlow = (step) => {
  flowProgress = Math.max(flowProgress, step);
  flowContainer.style.setProperty('--flow-progress', `${Math.max(0, (flowProgress - 1) / 5 * 100)}%`);
};
flowSteps.forEach((btn) => btn.addEventListener('click', () => {
  flowSteps.forEach((b) => {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-expanded', b === btn);
  });
  advanceFlow(Number(btn.dataset.step));
}));
const flowObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && advanceFlow(Number(entry.target.dataset.step))),
  { threshold: 0.65 },
);
flowSteps.forEach((el) => flowObserver.observe(el));

// Demo modal
const modal = document.getElementById('demoModal');
const form = document.getElementById('demoForm');
const formWrap = document.getElementById('demoFormWrap');
const success = document.getElementById('demoSuccess');
const submitBtn = form.querySelector('[type="submit"]');
const submitLabel = submitBtn.innerHTML;

const openDemo = () => {
  modal.hidden = false;
  document.body.classList.add('modal-open');
  form.elements.company.focus();
};
const closeDemo = () => {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  form.reset();
  Object.keys(validators).forEach((name) => setError(name, ''));
  formWrap.hidden = false;
  success.hidden = true;
  submitBtn.disabled = false;
  submitBtn.innerHTML = submitLabel;
};
document.querySelectorAll('[data-open-demo]').forEach((b) => b.addEventListener('click', openDemo));
modal.querySelectorAll('[data-close-demo]').forEach((b) => b.addEventListener('click', closeDemo));
modal.addEventListener('mousedown', (e) => { if (e.target === modal) closeDemo(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeDemo(); });

const isPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\s/g, ''));
const validators = {
  company: (v) => (v.trim() ? '' : 'Please enter your company name.'),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Please enter a valid email address.'),
  phone: (v) => (isPhone(v) ? '' : 'Enter a valid 10-digit mobile number.'),
};
function setError(name, message) {
  const input = form.elements[name];
  const error = input.parentElement.querySelector('.field-error');
  input.setAttribute('aria-invalid', !!message);
  error.textContent = message;
  error.hidden = !message;
}
form.elements.phone.addEventListener('blur', (e) => {
  if (e.target.value && !isPhone(e.target.value)) setError('phone', validators.phone(e.target.value));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  for (const [name, check] of Object.entries(validators)) {
    const message = check(form.elements[name].value);
    setError(name, message);
    if (message) valid = false;
  }
  if (!valid) return;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  // ponytail: simulated submit, no backend — wire to a CRM/email endpoint here
  setTimeout(() => {
    if (modal.hidden) return; // closed while sending
    console.log('ESIC Health Bridge demo request', Object.fromEntries(new FormData(form)));
    formWrap.hidden = true;
    success.hidden = false;
  }, 900);
});
