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

// consult form → mailto
const consultForm = document.getElementById('consultForm');

if (consultForm) {
  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!consultForm.checkValidity()) {
      consultForm.reportValidity();
      return;
    }

    const data = new FormData(consultForm);

    const body = `Hi Brown Noir Agency,

I'd like to request a free consult.

Name:
${data.get('name') || ''}

Business name:
${data.get('business') || ''}

Email:
${data.get('email') || ''}

Website or Instagram:
${data.get('website') || 'Not provided'}

What I need help with:
${data.get('help') || ''}

Package interest:
${data.get('package') || ''}

Preferred consult day:
${data.get('day') || ''}

Preferred consult time:
${data.get('time') || ''}

Timeline:
${data.get('timeline') || ''}

Message:
${data.get('message') || 'No message added.'}

Thanks!`;

    const subject = 'Free Consult Request — Brown Noir Agency';
    const mailto = `mailto:hello@brownnoir.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    const status = document.getElementById('formStatus');
    if (status) {
      status.textContent = 'Your email app should open with your consult request. Please send the email to complete your request.';
    }
  });
}
