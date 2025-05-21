const pool = require('../db');

exports.addPart = async (req, res) => {
  const { name, device_id } = req.body;
  try {
    await pool.query('INSERT INTO parts (name, device_id) VALUES ($1, $2)', [name, device_id]);
    res.status(201).json({ message: 'Part added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add part' });
  }
};

exports.getPartsByDevice = async (req, res) => {
  const { device_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM parts WHERE device_id = $1', [device_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get parts' });
  }
};

exports.getAllParts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parts');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении всех деталей:', err);
    res.status(500).json({ error: 'Failed to get parts' });
  }
};

exports.deletePart = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM parts WHERE id = $1', [id]);
    res.json({ message: 'Part deleted' });
  } catch (err) {
    console.error('Ошибка при удалении детали:', err);
    res.status(500).json({ error: 'Failed to delete part' });
  }
};
