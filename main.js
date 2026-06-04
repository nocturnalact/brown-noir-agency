// scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// metrics demo — cycling numbers to simulate a live dashboard
const metrics = [
  { label: 'Organic Sessions', base: 12480, suffix: '', growth: '+34%' },
  { label: 'Conversion Rate', base: 4.2, suffix: '%', growth: '+1.8pp' },
  { label: 'Revenue Attributed', base: 86400, suffix: '', growth: '+61%' },
  { label: 'Cost Per Lead', base: 18, suffix: '', growth: '−42%' },
];

function formatVal(n, suffix) {
  if (suffix === '%') return n.toFixed(1) + '%';
  if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'k';
  return '$' + n;
}

let tick = 0;
function updateMetrics() {
  const rows = document.querySelectorAll('.metric-row');
  rows.forEach((row, i) => {
    const m = metrics[i];
    if (!m) return;
    const jitter = 1 + (Math.random() - 0.48) * 0.04;
    const val = m.suffix === '%' ? m.base * jitter : Math.round(m.base * jitter);
    row.querySelector('.val').textContent = formatVal(val, m.suffix);
  });
  tick++;
}

setInterval(updateMetrics, 3200);

// contact form CTA
const ctaBtn = document.getElementById('ctaBtn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    ctaBtn.textContent = 'Message sent — we\'ll be in touch.';
    ctaBtn.style.background = '#2e7d5a';
    ctaBtn.style.pointerEvents = 'none';
  });
}
