const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false'); }));

const newMenuToggle = document.querySelector('.n-menu');
const newNav = document.querySelector('.n-links');
newMenuToggle?.addEventListener('click', () => newNav.classList.toggle('open'));
document.querySelectorAll('.n-links a').forEach(link => link.addEventListener('click', () => newNav?.classList.remove('open')));

const phone = '551121815700';
document.querySelectorAll('[data-whatsapp]').forEach(link => link.addEventListener('click', () => { link.href = `https://wa.me/${phone}?text=${encodeURIComponent(link.dataset.whatsapp)}`; }));

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => { const group = field.closest('label'); const ok = field.value.trim() && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)); group.classList.toggle('invalid', !ok); if (!ok) valid = false; });
  const status = form.querySelector('.form-status');
  if (!valid) { status.style.display = 'none'; form.querySelector('.invalid input, .invalid textarea')?.focus(); return; }
  const data = new FormData(form); const text = `Olá, vim pelo site e gostaria de falar com o escritório.%0A%0ANome: ${data.get('name')}%0AE-mail: ${data.get('email')}%0ATelefone: ${data.get('phone')}%0AAssunto: ${data.get('subject')}%0AMensagem: ${data.get('message')}`;
  status.textContent = 'Tudo certo. Você será direcionado ao WhatsApp para concluir o contato.'; status.style.display = 'block';
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener');
});
document.querySelectorAll('input,textarea').forEach(field => field.addEventListener('input', () => field.closest('label')?.classList.remove('invalid')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const cookie = document.querySelector('#cookie-banner');
if (localStorage.getItem('toro-cookie-ok')) cookie.hidden = true;
document.querySelector('#cookie-ok')?.addEventListener('click', () => { localStorage.setItem('toro-cookie-ok','1'); cookie.hidden = true; });
