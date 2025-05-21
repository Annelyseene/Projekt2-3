const pool = require('../db');

exports.createDevice = async (req, res) => {
  const { brand, model, serial_number, warranty_end_date } = req.body;
  try {
    await pool.query(
      'INSERT INTO devices (brand, model, serial_number, warranty_end_date) VALUES ($1, $2, $3, $4)',
      [brand, model, serial_number, warranty_end_date]
    );
    res.status(201).json({ message: 'Device added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add device' });
  }
};

exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  const { brand, model, serial_number, warranty_end_date } = req.body;
  try {
    await pool.query(
      'UPDATE devices SET brand = $1, model = $2, serial_number = $3, warranty_end_date = $4 WHERE id = $5',
      [brand, model, serial_number, warranty_end_date, id]
    );
    res.json({ message: 'Device updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update device' });
  }
};

exports.deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM devices WHERE id = $1', [id]);
    res.json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete device' });
  }
};

exports.getAllDevices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get devices' });
  }
};

exports.getDeviceById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM devices WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch device' });
  }
};
