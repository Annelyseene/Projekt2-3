document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const full_name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password, full_name, email })
  });

  const data = await res.json();
  const messageElem = document.getElementById('message');

  if (res.ok) {
    messageElem.textContent = 'Регистрация успешна!';
    messageElem.classList.remove('text-danger');
    messageElem.classList.add('text-success');
    setTimeout(() => window.location.href = '/public/login.html', 2000);
  } else {
    messageElem.textContent = data.error || 'Ошибка регистрации';
    messageElem.classList.remove('text-success');
    messageElem.classList.add('text-danger');
  }
});
