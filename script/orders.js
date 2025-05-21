const ordersTable = document.getElementById('ordersTable');

async function loadOrders() {
  try {
    const [ordersRes, partsRes] = await Promise.all([
      fetch('http://localhost:3000/api/part-orders'),
      fetch('http://localhost:3000/api/parts')
    ]);

    const orders = await ordersRes.json();
    const parts = await partsRes.json();

    const partMap = {};
    parts.forEach(p => partMap[p.id] = p.name);

    ordersTable.innerHTML = '';
    orders.forEach((order, index) => {
      const deliveryDate = new Date(order.delivery_date);
      const today = new Date();
      const status = deliveryDate <= today ? 'получено' : 'ожидается';
      const statusBadge = status === 'получено'
        ? '<span class="badge bg-success">Получено</span>'
        : '<span class="badge bg-warning text-dark">Ожидается</span>';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${partMap[order.part_id] || '—'}</td>
        <td>${deliveryDate.toLocaleDateString()}</td>
        <td>${statusBadge}</td>
      `;
      ordersTable.appendChild(row);
    });
  } catch (err) {
    console.error('Ошибка загрузки заказов:', err);
    ordersTable.innerHTML = '<tr><td colspan="4" class="text-danger">Ошибка загрузки данных</td></tr>';
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '/public/login.html';
});

loadOrders();
