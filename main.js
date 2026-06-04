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

// consult form → Formsubmit AJAX
const consultForm = document.getElementById('consultForm');

if (consultForm) {
  consultForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!consultForm.checkValidity()) {
      consultForm.reportValidity();
      return;
    }

    const submitBtn = consultForm.querySelector('button[type="submit"]');
    const status = document.getElementById('formStatus');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = new FormData(consultForm);

    const payload = {
      _subject: 'Free Consult Request — Brown Noir Agency',
      _template: 'table',
      Name:                  data.get('name')     || '',
      'Business Name':       data.get('business') || '',
      Email:                 data.get('email')    || '',
      'Website / Instagram': data.get('website')  || 'Not provided',
      'Help needed':         data.get('help')     || '',
      'Package interest':    data.get('package')  || '',
      'Preferred day':       data.get('day')      || '',
      'Preferred time':      data.get('time')     || '',
      Timeline:              data.get('timeline') || '',
      Message:               data.get('message')  || 'No message added.',
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/brownnoircollective@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success === 'true') {
        consultForm.reset();
        submitBtn.textContent = 'Request sent ✓';
        submitBtn.style.background = 'var(--sage)';
        if (status) {
          status.textContent = 'Your consult request has been sent. We\'ll be in touch with a confirmed time shortly.';
          status.classList.add('form-status--success');
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a free consult';
      if (status) {
        status.textContent = 'Something went wrong. Please email us directly at brownnoircollective@gmail.com';
        status.classList.add('form-status--error');
      }
    }
  });
}
