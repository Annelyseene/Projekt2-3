document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password })
  });

  const data = await res.json();
  const messageElem = document.getElementById('message');

  if (res.ok && data.userId) {
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
    messageElem.textContent = 'Вход выполнен!';
    messageElem.classList.remove('text-danger');
    messageElem.classList.add('text-success');
    setTimeout(() => window.location.href = '/public/dashboard.html', 1000);
  } else {
    messageElem.textContent = data.error || 'Ошибка входа';
    messageElem.classList.remove('text-success');
    messageElem.classList.add('text-danger');
  }
});
