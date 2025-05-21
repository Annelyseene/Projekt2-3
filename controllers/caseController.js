const pool = require('../db');

exports.createCase = async (req, res) => {
  const { full_name, email, phone, description, status, device_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO cases (full_name, email, phone, description, status, device_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [full_name, email, phone, description, status, device_id]
    );
    res.status(201).json({ message: 'Case created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create case' });
  }
};



exports.deleteCase = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cases WHERE id = $1', [id]);
    res.json({ message: 'Case deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete case' });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE cases SET status = $1 WHERE id = $2', [status, id]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cases ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cases' });
  }
};

exports.getCaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cases WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при получении кейса:', err);
    res.status(500).json({ error: 'Failed to get case' });
  }
};
