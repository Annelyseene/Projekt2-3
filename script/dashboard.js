document.addEventListener('DOMContentLoaded', async () => {
  const casesContainer = document.getElementById('casesContainer');

  try {
    // Получаем список кейсов и устройств
    const [casesRes, devicesRes] = await Promise.all([
      fetch('http://localhost:3000/api/cases'),
      fetch('http://localhost:3000/api/devices')
    ]);

    if (!casesRes.ok || !devicesRes.ok) {
      throw new Error('Ошибка загрузки данных');
    }

    const cases = await casesRes.json();
    const devices = await devicesRes.json();
    const deviceMap = {};
    devices.forEach(d => deviceMap[d.id] = `${d.brand} ${d.model}`);

    if (cases.length === 0) {
      casesContainer.innerHTML = '<p class="text-muted">Кейсы отсутствуют.</p>';
      return;
    }

    cases.forEach(c => {
      const card = document.createElement('div');
      card.className = 'col-md-6 col-lg-4';
      const deviceInfo = deviceMap[c.device_id] || 'Неизвестное устройство';

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${c.full_name}</h5>
            <p class="card-text mb-1"><strong>Телефон:</strong> ${c.phone}</p>
            <p class="card-text mb-1"><strong>Устройство:</strong> ${deviceInfo}</p>
            <p class="card-text"><strong>Статус:</strong> ${translateStatus(c.status)}</p>
            <button class="btn btn-sm btn-primary mt-2" onclick="viewCase(${c.id})">Подробнее</button>
          </div>
        </div>
      `;
      casesContainer.appendChild(card);
    });

  } catch (err) {
    casesContainer.innerHTML = `<p class="text-danger">Ошибка загрузки данных</p>`;
    console.error(err);
  }
});

function viewCase(id) {
  window.location.href = `/public/case.html?id=${id}`;
}

function translateStatus(status) {
  const map = {
    accepted: 'Принят',
    in_progress: 'В процессе',
    completed: 'Завершён',
    cancelled: 'Отменён'
  };
  return map[status] || status;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('userId');
  window.location.href = '/public/login.html';
});
