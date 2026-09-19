document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Waitlist (client-side only for now; see README) ---------- */
const form = document.getElementById('waitlistForm');
const note = document.getElementById('formNote');
const emailInput = document.getElementById('email');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = 'That email doesn’t look right — try again?';
    note.className = 'note err';
    emailInput.focus();
    return;
  }
  try {
    const list = JSON.parse(localStorage.getItem('circadia_waitlist') || '[]');
    if (!list.includes(email)) list.push(email);
    localStorage.setItem('circadia_waitlist', JSON.stringify(list));
  } catch (_) { /* storage unavailable — fine */ }

  note.textContent = 'You’re on the list. We’ll write when the moon is right.';
  note.className = 'note ok';
  form.reset();
});

/* ---------- Reveal on load / scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ---------- Starfield ---------- */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  canvas.width = window.innerWidth * DPR;
  canvas.height = window.innerHeight * DPR;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  const count = Math.floor((window.innerWidth * window.innerHeight) / 7000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: (Math.random() * 1.1 + 0.2) * DPR,
    a: Math.random() * 0.5 + 0.15,
    s: Math.random() * 0.0015 + 0.0004,
    p: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 0.02 * DPR
  }));
}

function draw(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    const tw = 0.6 + 0.4 * Math.sin(t * s.s + s.p);
    ctx.globalAlpha = s.a * tw;
    ctx.fillStyle = '#e9e2ff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y -= s.drift; // very slow upward drift
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize, { passive: true });
resize();
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  requestAnimationFrame(draw);
} else {
  draw(0);
}
