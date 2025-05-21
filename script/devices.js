const deviceTable = document.getElementById('deviceTable');
const form = document.getElementById('deviceForm');
const modal = new bootstrap.Modal(document.getElementById('addDeviceModal'));

const idField = document.getElementById('deviceId');
const brandField = document.getElementById('brand');
const modelField = document.getElementById('model');
const serialField = document.getElementById('serial_number');
const warrantyField = document.getElementById('warranty_end_date');

async function loadDevices() {
  const res = await fetch('http://localhost:3000/api/devices');
  const devices = await res.json();

  deviceTable.innerHTML = '';
  devices.forEach(d => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${d.brand}</td>
      <td>${d.model}</td>
      <td>${d.serial_number}</td>
      <td>${d.warranty_end_date}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editDevice(${JSON.stringify(d).replace(/"/g, '&quot;')})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="deleteDevice(${d.id})">🗑️</button>
      </td>
    `;
    deviceTable.appendChild(row);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    brand: brandField.value,
    model: modelField.value,
    serial_number: serialField.value,
    warranty_end_date: warrantyField.value,
  };

  const id = idField.value;
  const url = id
    ? `http://localhost:3000/api/devices/${id}`
    : `http://localhost:3000/api/devices`;

  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  modal.hide();
  form.reset();
  await loadDevices();
});

function editDevice(device) {
  idField.value = device.id;
  brandField.value = device.brand;
  modelField.value = device.model;
  serialField.value = device.serial_number;
  warrantyField.value = device.warranty_end_date;
  modal.show();
}

async function deleteDevice(id) {
  if (confirm('Удалить устройство?')) {
    await fetch(`http://localhost:3000/api/devices/${id}`, { method: 'DELETE' });
    await loadDevices();
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '/public/login.html';
});

loadDevices();
