const partTable = document.getElementById('partTable');
const deviceFilter = document.getElementById('deviceFilter');
const deviceSelect = document.getElementById('deviceSelect');
const partForm = document.getElementById('partForm');
const partName = document.getElementById('partName');

let allDevices = [];

async function loadDevices() {
  const res = await fetch('http://localhost:3000/api/devices');
  allDevices = await res.json();

  // фильтр
  deviceFilter.innerHTML = `<option value="all">Все устройства</option>`;
  allDevices.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = `${d.brand} ${d.model}`;
    deviceFilter.appendChild(opt);
  });

  // селектор для модалки
  deviceSelect.innerHTML = '';
  allDevices.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = `${d.brand} ${d.model}`;
    deviceSelect.appendChild(opt);
  });
}

async function loadParts(deviceId = null) {
  let parts = [];

  if (deviceId && deviceId !== 'all') {
    const res = await fetch(`http://localhost:3000/api/parts/device/${deviceId}`);
    parts = await res.json();
  } else {
    const resAll = await fetch('http://localhost:3000/api/devices');
    const devices = await resAll.json();

    for (const d of devices) {
      const res = await fetch(`http://localhost:3000/api/parts/device/${d.id}`);
      const devParts = await res.json();
      devParts.forEach(p => p.device = `${d.brand} ${d.model}`);
      parts = parts.concat(devParts);
    }
  }

  renderParts(parts);
}

function renderParts(parts) {
  partTable.innerHTML = '';
  parts.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.device || ''}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deletePart(${p.id})">🗑️</button>
      </td>
    `;
    partTable.appendChild(row);
  });
}

partForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = partName.value;
  const device_id = deviceSelect.value;

  await fetch('http://localhost:3000/api/parts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, device_id })
  });

  partForm.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById('addPartModal'));
  modal.hide();

  await loadParts(deviceFilter.value);
});

async function deletePart(id) {
  if (confirm('Удалить деталь?')) {
    await fetch(`http://localhost:3000/api/parts/${id}`, { method: 'DELETE' });
    await loadParts(deviceFilter.value);
  }
}

deviceFilter.addEventListener('change', () => {
  loadParts(deviceFilter.value);
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = '/public/login.html';
});

(async () => {
  await loadDevices();
  await loadParts();
})();
