document.addEventListener('DOMContentLoaded', async () => {
  const deviceSelect = document.getElementById('deviceSelect');

  try {
    const res = await fetch('http://localhost:3000/api/devices');
    const devices = await res.json();

    devices.forEach(device => {
      const opt = document.createElement('option');
      opt.value = device.id;
      opt.textContent = `${device.brand} ${device.model} (${device.serial_number})`;
      deviceSelect.appendChild(opt);
    });
  } catch (err) {
    console.error('Ошибка загрузки устройств:', err);
    const msg = document.getElementById('message');
    msg.textContent = 'Не удалось загрузить список устройств';
  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.href = '/public/login.html';
  });
});

document.getElementById('caseForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const full_name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const device_id = document.getElementById('deviceSelect').value;
  const description = document.getElementById('description').value.trim();

  const res = await fetch('http://localhost:3000/api/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name,
      email,
      phone,
      description,
      status: 'accepted',
      device_id
    })
  });

  const msgElem = document.getElementById('message');

  if (res.ok) {
    msgElem.textContent = 'Кейс успешно создан!';
    msgElem.classList.remove('text-danger');
    msgElem.classList.add('text-success');
    setTimeout(() => window.location.href = '/public/dashboard.html', 1500);
  } else {
    const data = await res.json();
    msgElem.textContent = data.error || 'Ошибка создания кейса';
    msgElem.classList.remove('text-success');
    msgElem.classList.add('text-danger');
  }
});
