document.addEventListener('DOMContentLoaded', async () => {
  const caseId = new URLSearchParams(window.location.search).get('id');
  const detailsBlock = document.getElementById('caseDetails');
  const warrantySection = document.getElementById('warrantySection');
  const statusActions = document.getElementById('statusActions');
  const msg = document.getElementById('message');

  try {
    // Получаем кейс
    const caseRes = await fetch(`http://localhost:3000/api/cases/${caseId}`);
    const caseData = await caseRes.json();

    // Получаем устройство
    const deviceRes = await fetch(`http://localhost:3000/api/devices/${caseData.device_id}`);
    let device;
    if (deviceRes.ok) {
      device = await deviceRes.json();
    }

    detailsBlock.innerHTML = `
      <p><strong>Клиент:</strong> ${caseData.full_name}</p>
      <p><strong>Email:</strong> ${caseData.email}</p>
      <p><strong>Телефон:</strong> ${caseData.phone}</p>
      <p><strong>Устройство:</strong> ${device ? `${device.brand} ${device.model} (${device.serial_number})` : '—'}</p>
      <p><strong>Описание:</strong> ${caseData.description}</p>
      <p><strong>Статус:</strong> ${translateStatus(caseData.status)}</p>
    `;

    // Проверка устройства
    if (!device) {
      warrantySection.innerHTML = `<div class="alert alert-danger">Устройство не найдено в базе</div>`;
      return;
    }

    // Проверка гарантии
    const warrantyActive = new Date(device.warranty_end_date) >= new Date();
    warrantySection.innerHTML = warrantyActive
      ? `<div class="alert alert-success">Гарантия активна до ${device.warranty_end_date}</div>`
      : `<div class="alert alert-danger">Гарантия истекла ${device.warranty_end_date}</div>`;

    if (!warrantyActive) {
      msg.textContent = 'Нельзя продолжать работу: гарантия неактивна.';
      return;
    }

    // Проверка на заказ детали (если в part_orders появится поле case_id)
    const orderRes = await fetch('http://localhost:3000/api/part-orders');
    const orders = await orderRes.json();
    const orderExists = orders.some(o => o.part_id && o.case_id === parseInt(caseId)); // если поле есть

    if (!orderExists && caseData.status === 'accepted') {
      const partsRes = await fetch(`http://localhost:3000/api/parts/device/${device.id}`);
      const parts = await partsRes.json();

      const select = document.createElement('select');
      select.className = 'form-select mb-2';
      parts.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        select.appendChild(opt);
      });

      const orderBtn = document.createElement('button');
      orderBtn.className = 'btn btn-primary';
      orderBtn.textContent = 'Заказать деталь';
      orderBtn.onclick = async () => {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        await fetch('http://localhost:3000/api/part-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            part_id: select.value,
            delivery_date: deliveryDate.toISOString().split('T')[0]
          })
        });
        msg.className = 'text-success text-center mt-3';
        msg.textContent = 'Деталь заказана.';
        setTimeout(() => location.reload(), 1500);
      };

      warrantySection.appendChild(select);
      warrantySection.appendChild(orderBtn);
    }

    // Кнопки изменения статуса
    if (caseData.status === 'accepted') {
      showStatusButton('in_progress', 'Перевести в работу');
    } else if (caseData.status === 'in_progress') {
      showStatusButton('completed', 'Завершить кейс');
    }

    function showStatusButton(newStatus, label) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-success';
      btn.textContent = label;
      btn.onclick = async () => {
        await fetch(`http://localhost:3000/api/cases/${caseId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        msg.className = 'text-success text-center mt-3';
        msg.textContent = 'Статус обновлён.';
        setTimeout(() => location.reload(), 1500);
      };
      statusActions.appendChild(btn);
    }

  } catch (err) {
    console.error('Ошибка:', err);
    msg.textContent = 'Ошибка загрузки кейса';
  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.href = '/public/login.html';
  });
});

function translateStatus(status) {
  const map = {
    accepted: 'Принят',
    in_progress: 'В процессе',
    completed: 'Завершён',
    cancelled: 'Отменён'
  };
  return map[status] || status;
}
